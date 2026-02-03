import { useState, useMemo } from 'react'
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, Download, FileSpreadsheet, Calendar } from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useOrdersStore } from '@/store/ordersStore'
import {
  computeSalesStats,
  getDateRangeLabel,
  type PeriodType,
} from '@/lib/salesStats'
import { exportSalesToCsv, exportSalesToExcel } from '@/lib/exportSales'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const PERIOD_OPTIONS: { value: PeriodType; label: string }[] = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
]

export default function AdminDashboard() {
  const orders = useOrdersStore((s) => s.orders)
  const [period, setPeriod] = useState<PeriodType>('month')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  const stats = useMemo(() => {
    return computeSalesStats(
      orders,
      period,
      period === 'custom' ? customFrom || undefined : undefined,
      period === 'custom' ? customTo || undefined : undefined
    )
  }, [orders, period, customFrom, customTo])

  const dateRangeLabel = useMemo(
    () => getDateRangeLabel(period, customFrom || undefined, customTo || undefined),
    [period, customFrom, customTo]
  )

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [orders])

  const handleExportCsv = () => {
    exportSalesToCsv(stats, dateRangeLabel)
  }

  const handleExportExcel = () => {
    exportSalesToExcel(stats, dateRangeLabel)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Sales Stats — Period filter & Export */}
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Sales Stats
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{dateRangeLabel}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={period} onValueChange={(v) => setPeriod(v as PeriodType)}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  {PERIOD_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {period === 'custom' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="from-date" className="text-xs whitespace-nowrap">From</Label>
                    <Input
                      id="from-date"
                      type="date"
                      value={customFrom}
                      onChange={(e) => setCustomFrom(e.target.value)}
                      className="w-[140px]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Label htmlFor="to-date" className="text-xs whitespace-nowrap">To</Label>
                    <Input
                      id="to-date"
                      type="date"
                      value={customTo}
                      onChange={(e) => setCustomTo(e.target.value)}
                      className="w-[140px]"
                    />
                  </div>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={handleExportCsv} className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel} className="gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Sales (period)"
              value={`AED ${stats.totalSales.toLocaleString()}`}
              icon={DollarSign}
              color="success"
            />
            <StatsCard
              title="Orders (period)"
              value={stats.totalOrders}
              icon={ShoppingCart}
              color="primary"
            />
            <StatsCard
              title="Products sold"
              value={stats.byProduct.length}
              icon={Package}
              color="accent"
            />
            <StatsCard
              title="Customers"
              value={stats.byCustomer.length}
              icon={Users}
              color="secondary"
            />
          </div>

          {/* Tables: Sales per product, per customer, by period */}
          <Tabs defaultValue="product" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="product">Sales per Product</TabsTrigger>
              <TabsTrigger value="customer">Sales per Customer</TabsTrigger>
              <TabsTrigger value="period">Sales by Period</TabsTrigger>
            </TabsList>
            <TabsContent value="product" className="mt-4">
              <ScrollArea className="w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Revenue (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.byProduct.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No sales in this period
                        </TableCell>
                      </TableRow>
                    ) : (
                      stats.byProduct.map((p) => (
                        <TableRow key={`${p.productId}-${p.sku}`}>
                          <TableCell className="font-medium">{p.productName}</TableCell>
                          <TableCell>{p.size}</TableCell>
                          <TableCell>{p.sku}</TableCell>
                          <TableCell className="text-right">{p.quantity}</TableCell>
                          <TableCell className="text-right">{p.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="customer" className="mt-4">
              <ScrollArea className="w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Revenue (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.byCustomer.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No customers in this period
                        </TableCell>
                      </TableRow>
                    ) : (
                      stats.byCustomer.map((c) => (
                        <TableRow key={c.customerEmail}>
                          <TableCell className="font-medium">{c.customerName}</TableCell>
                          <TableCell>{c.customerEmail}</TableCell>
                          <TableCell className="text-right">{c.orderCount}</TableCell>
                          <TableCell className="text-right">{c.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="period" className="mt-4">
              <ScrollArea className="w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Revenue (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.byPeriod.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No period data
                        </TableCell>
                      </TableRow>
                    ) : (
                      stats.byPeriod.map((b, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{b.label}</TableCell>
                          <TableCell>{b.periodStart}</TableCell>
                          <TableCell>{b.periodEnd}</TableCell>
                          <TableCell className="text-right">{b.orderCount}</TableCell>
                          <TableCell className="text-right">{b.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Recent Orders</h2>
            <p className="text-sm text-gray-600">Latest customer orders</p>
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No orders yet
                </TableCell>
              </TableRow>
            ) : (
              recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </TableCell>
                  <TableCell>AED {order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status] ?? 'bg-gray-100 text-gray-800'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
