import type { Order } from '@/lib/types'
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isWithinInterval,
  parseISO,
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  differenceInDays,
} from 'date-fns'

export type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom'

export interface SalesByProduct {
  productId: string
  productName: string
  size: string
  sku: string
  quantity: number
  revenue: number
}

export interface SalesByCustomer {
  customerEmail: string
  customerName: string
  orderCount: number
  revenue: number
}

export interface SalesByPeriodBucket {
  label: string
  periodStart: string
  periodEnd: string
  orderCount: number
  revenue: number
}

export interface SalesStats {
  totalSales: number
  totalOrders: number
  byProduct: SalesByProduct[]
  byCustomer: SalesByCustomer[]
  byPeriod: SalesByPeriodBucket[]
}

function parseOrderDate(dateStr: string): Date {
  return parseISO(dateStr)
}

function getDateRange(period: PeriodType, from?: string, to?: string): { start: Date; end: Date } {
  const now = new Date()
  switch (period) {
    case 'day':
      return { start: startOfDay(now), end: endOfDay(now) }
    case 'week':
      return { start: startOfWeek(now, { weekStartsOn: 0 }), end: endOfWeek(now, { weekStartsOn: 0 }) }
    case 'month':
      return { start: startOfMonth(now), end: endOfMonth(now) }
    case 'year':
      return { start: startOfYear(now), end: endOfYear(now) }
    case 'custom':
      if (!from || !to) return { start: startOfMonth(now), end: endOfMonth(now) }
      return {
        start: startOfDay(parseISO(from)),
        end: endOfDay(parseISO(to)),
      }
    default:
      return { start: startOfMonth(now), end: endOfMonth(now) }
  }
}

export function filterOrdersByDateRange(
  orders: Order[],
  start: Date,
  end: Date
): Order[] {
  return orders.filter((order) => {
    const d = parseOrderDate(order.createdAt)
    return isWithinInterval(d, { start, end })
  })
}

export function computeSalesStats(
  orders: Order[],
  period: PeriodType,
  from?: string,
  to?: string
): SalesStats {
  const { start, end } = getDateRange(period, from, to)
  const filtered = filterOrdersByDateRange(orders, start, end)

  const totalSales = filtered.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = filtered.length

  // By product: aggregate from order items
  const productMap = new Map<string, SalesByProduct>()
  for (const order of filtered) {
    for (const item of order.items) {
      const key = `${item.productId}-${item.sku}`
      const existing = productMap.get(key)
      if (existing) {
        existing.quantity += item.quantity
        existing.revenue += item.subtotal
      } else {
        productMap.set(key, {
          productId: item.productId,
          productName: item.productName,
          size: item.size,
          sku: item.sku,
          quantity: item.quantity,
          revenue: item.subtotal,
        })
      }
    }
  }
  const byProduct = Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue)

  // By customer
  const customerMap = new Map<string, SalesByCustomer>()
  for (const order of filtered) {
    const email = order.customerInfo.email.toLowerCase()
    const name = `${order.customerInfo.firstName} ${order.customerInfo.lastName}`.trim()
    const existing = customerMap.get(email)
    if (existing) {
      existing.orderCount += 1
      existing.revenue += order.total
    } else {
      customerMap.set(email, {
        customerEmail: order.customerInfo.email,
        customerName: name || order.customerInfo.email,
        orderCount: 1,
        revenue: order.total,
      })
    }
  }
  const byCustomer = Array.from(customerMap.values()).sort((a, b) => b.revenue - a.revenue)

  // By period (buckets): depends on range length
  const days = differenceInDays(end, start) + 1
  let byPeriod: SalesByPeriodBucket[] = []

  if (days <= 31) {
    const dayRanges = eachDayOfInterval({ start, end })
    for (const d of dayRanges) {
      const dayStart = startOfDay(d)
      const dayEnd = endOfDay(d)
      const dayOrders = filterOrdersByDateRange(filtered, dayStart, dayEnd)
      byPeriod.push({
        label: format(d, 'dd MMM yyyy'),
        periodStart: format(dayStart, 'yyyy-MM-dd'),
        periodEnd: format(dayEnd, 'yyyy-MM-dd'),
        orderCount: dayOrders.length,
        revenue: dayOrders.reduce((s, o) => s + o.total, 0),
      })
    }
  } else if (days <= 93) {
    const weekRanges = eachWeekOfInterval({ start, end }, { weekStartsOn: 0 })
    for (const w of weekRanges) {
      const weekStart = startOfWeek(w, { weekStartsOn: 0 })
      const weekEnd = endOfWeek(w, { weekStartsOn: 0 })
      const weekOrders = filterOrdersByDateRange(filtered, weekStart, weekEnd)
      byPeriod.push({
        label: `Week of ${format(weekStart, 'dd MMM yyyy')}`,
        periodStart: format(weekStart, 'yyyy-MM-dd'),
        periodEnd: format(weekEnd, 'yyyy-MM-dd'),
        orderCount: weekOrders.length,
        revenue: weekOrders.reduce((s, o) => s + o.total, 0),
      })
    }
  } else if (days <= 366) {
    const monthRanges = eachMonthOfInterval({ start, end })
    for (const m of monthRanges) {
      const monthStart = startOfMonth(m)
      const monthEnd = endOfMonth(m)
      const monthOrders = filterOrdersByDateRange(filtered, monthStart, monthEnd)
      byPeriod.push({
        label: format(m, 'MMMM yyyy'),
        periodStart: format(monthStart, 'yyyy-MM-dd'),
        periodEnd: format(monthEnd, 'yyyy-MM-dd'),
        orderCount: monthOrders.length,
        revenue: monthOrders.reduce((s, o) => s + o.total, 0),
      })
    }
  } else {
    const yearRanges = eachYearOfInterval({ start, end })
    for (const y of yearRanges) {
      const yearStart = startOfYear(y)
      const yearEnd = endOfYear(y)
      const yearOrders = filterOrdersByDateRange(filtered, yearStart, yearEnd)
      byPeriod.push({
        label: format(y, 'yyyy'),
        periodStart: format(yearStart, 'yyyy-MM-dd'),
        periodEnd: format(yearEnd, 'yyyy-MM-dd'),
        orderCount: yearOrders.length,
        revenue: yearOrders.reduce((s, o) => s + o.total, 0),
      })
    }
  }

  return {
    totalSales,
    totalOrders,
    byProduct,
    byCustomer,
    byPeriod,
  }
}

export function getDateRangeLabel(period: PeriodType, from?: string, to?: string): string {
  const { start, end } = getDateRange(period, from, to)
  if (period === 'custom' && from && to) {
    return `${format(parseISO(from), 'dd MMM yyyy')} – ${format(parseISO(to), 'dd MMM yyyy')}`
  }
  return `${format(start, 'dd MMM yyyy')} – ${format(end, 'dd MMM yyyy')}`
}
