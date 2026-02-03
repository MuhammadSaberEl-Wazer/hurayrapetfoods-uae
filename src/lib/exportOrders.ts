import * as XLSX from 'xlsx'
import type { Order } from '@/lib/types'

function sanitizeFilename(label: string): string {
  return label.replace(/\s+/g, '-').replace(/[^\w\-.]/g, '') || 'orders'
}

function escapeCsvCell(value: string | number): string {
  const s = String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function toCsvRow(values: (string | number)[]): string {
  return values.map(escapeCsvCell).join(',')
}

export function exportOrdersToCsv(orders: Order[], filename?: string): void {
  const headers = [
    'Order Number',
    'Date',
    'Customer Name',
    'Email',
    'Phone',
    'Address',
    'City',
    'Emirate',
    'Items Count',
    'Subtotal (AED)',
    'Shipping (AED)',
    'Total (AED)',
    'Status',
    'Payment Method',
  ]
  const rows: string[] = []
  rows.push(toCsvRow(headers))
  for (const o of orders) {
    const customerName = `${o.customerInfo.firstName} ${o.customerInfo.lastName}`.trim()
    rows.push(
      toCsvRow([
        o.orderNumber,
        o.createdAt,
        customerName,
        o.customerInfo.email,
        o.customerInfo.phone,
        o.deliveryAddress.address,
        o.deliveryAddress.city,
        o.deliveryAddress.emirate,
        o.items.length,
        o.subtotal,
        o.shipping,
        o.total,
        o.status,
        o.paymentMethod,
      ])
    )
  }
  const csv = rows.join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename ?? `orders-export-${sanitizeFilename(new Date().toISOString().slice(0, 10))}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportOrdersToExcel(orders: Order[], filename?: string): void {
  const headers = [
    'Order Number',
    'Date',
    'Customer Name',
    'Email',
    'Phone',
    'Address',
    'City',
    'Emirate',
    'Items Count',
    'Subtotal (AED)',
    'Shipping (AED)',
    'Total (AED)',
    'Status',
    'Payment Method',
  ]
  const rows = orders.map((o) => {
    const customerName = `${o.customerInfo.firstName} ${o.customerInfo.lastName}`.trim()
    return [
      o.orderNumber,
      o.createdAt,
      customerName,
      o.customerInfo.email,
      o.customerInfo.phone,
      o.deliveryAddress.address,
      o.deliveryAddress.city,
      o.deliveryAddress.emirate,
      o.items.length,
      o.subtotal,
      o.shipping,
      o.total,
      o.status,
      o.paymentMethod,
    ]
  })
  const data = [headers, ...rows]
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(data)
  XLSX.utils.book_append_sheet(wb, ws, 'Orders')

  const name = filename ?? `orders-export-${sanitizeFilename(new Date().toISOString().slice(0, 10))}.xlsx`
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
