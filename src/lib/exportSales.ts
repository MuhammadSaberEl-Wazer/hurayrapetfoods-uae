import * as XLSX from 'xlsx'
import type { SalesStats } from './salesStats'

function sanitizeFilename(label: string): string {
  return label.replace(/\s+/g, '-').replace(/[^\w\-.]/g, '') || 'report'
}

function escapeCsvCell(value: string | number): string {
  const s = String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function toCsvRow(values: (string | number)[]): string {
  return values.map(escapeCsvCell).join(',')
}

export function exportSalesToCsv(stats: SalesStats, dateLabel: string, filename?: string): void {
  const rows: string[] = []
  rows.push('Sales Report')
  rows.push(`Period,${escapeCsvCell(dateLabel)}`)
  rows.push('')
  rows.push(toCsvRow(['Metric', 'Value']))
  rows.push(toCsvRow(['Total Sales (AED)', stats.totalSales]))
  rows.push(toCsvRow(['Total Orders', stats.totalOrders]))
  rows.push('')

  rows.push('Sales per Product')
  rows.push(toCsvRow(['Product Name', 'Size', 'SKU', 'Quantity', 'Revenue (AED)']))
  for (const p of stats.byProduct) {
    rows.push(toCsvRow([p.productName, p.size, p.sku, p.quantity, p.revenue]))
  }
  rows.push('')

  rows.push('Sales per Customer')
  rows.push(toCsvRow(['Customer Name', 'Email', 'Order Count', 'Revenue (AED)']))
  for (const c of stats.byCustomer) {
    rows.push(toCsvRow([c.customerName, c.customerEmail, c.orderCount, c.revenue]))
  }
  rows.push('')

  rows.push('Sales by Period')
  rows.push(toCsvRow(['Period', 'From', 'To', 'Order Count', 'Revenue (AED)']))
  for (const b of stats.byPeriod) {
    rows.push(toCsvRow([b.label, b.periodStart, b.periodEnd, b.orderCount, b.revenue]))
  }

  const csv = rows.join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename ?? `sales-report-${sanitizeFilename(dateLabel)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportSalesToExcel(stats: SalesStats, dateLabel: string, filename?: string): void {
  const wb = XLSX.utils.book_new()

  // Summary sheet — same structure as CSV: title, period, blank, then metrics
  const summaryData = [
    ['Sales Report'],
    ['Period', dateLabel],
    [],
    ['Metric', 'Value'],
    ['Total Sales (AED)', stats.totalSales],
    ['Total Orders', stats.totalOrders],
    ['Products Sold', stats.byProduct.length],
    ['Customers', stats.byCustomer.length],
  ]
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

  // Sales per Product — section title + period then table (matches CSV richness)
  const productData = [
    ['Sales per Product'],
    ['Period', dateLabel],
    [],
    ['Product Name', 'Size', 'SKU', 'Quantity', 'Revenue (AED)'],
    ...stats.byProduct.map((p) => [p.productName, p.size, p.sku, p.quantity, p.revenue]),
  ]
  const wsProduct = XLSX.utils.aoa_to_sheet(productData)
  XLSX.utils.book_append_sheet(wb, wsProduct, 'Sales per Product')

  // Sales per Customer — section title + period then table
  const customerData = [
    ['Sales per Customer'],
    ['Period', dateLabel],
    [],
    ['Customer Name', 'Email', 'Order Count', 'Revenue (AED)'],
    ...stats.byCustomer.map((c) => [c.customerName, c.customerEmail, c.orderCount, c.revenue]),
  ]
  const wsCustomer = XLSX.utils.aoa_to_sheet(customerData)
  XLSX.utils.book_append_sheet(wb, wsCustomer, 'Sales per Customer')

  // Sales by Period — section title + period then table
  const periodData = [
    ['Sales by Period'],
    ['Report Period', dateLabel],
    [],
    ['Period', 'From', 'To', 'Order Count', 'Revenue (AED)'],
    ...stats.byPeriod.map((b) => [b.label, b.periodStart, b.periodEnd, b.orderCount, b.revenue]),
  ]
  const wsPeriod = XLSX.utils.aoa_to_sheet(periodData)
  XLSX.utils.book_append_sheet(wb, wsPeriod, 'Sales by Period')

  const name = filename ?? `sales-report-${sanitizeFilename(dateLabel)}.xlsx`
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}
