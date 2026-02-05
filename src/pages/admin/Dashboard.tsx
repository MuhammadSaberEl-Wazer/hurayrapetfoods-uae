import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, Download, FileSpreadsheet, Calendar } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
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

const PERIOD_OPTIONS: { value: PeriodType; labelKey: string }[] = [
  { value: 'day', labelKey: 'periodToday' },
  { value: 'week', labelKey: 'periodWeek' },
  { value: 'month', labelKey: 'periodMonth' },
  { value: 'year', labelKey: 'periodYear' },
  { value: 'custom', labelKey: 'periodCustom' },
]

export default function AdminDashboard() {
  const { t, i18n } = useTranslation('admin-dashboard')
  const isRtl = i18n.language === 'ar'
  const locale = isRtl ? 'ar-AE' : 'en'
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

  const CHART_COLORS = ['#008080', '#0F766E', '#C8A029', '#60BABF', '#035F5D']

  // Chart data from current filter (with percent for legend)
  const pieData = useMemo(() => {
    const total = stats.byProduct.reduce((s, p) => s + p.revenue, 0)
    return stats.byProduct.map((p, i) => ({
      name: p.productName + (p.size ? ` (${p.size})` : ''),
      value: p.revenue,
      fill: CHART_COLORS[i % CHART_COLORS.length],
      percent: total > 0 ? (p.revenue / total) * 100 : 0,
    }))
  }, [stats.byProduct])

  const trendData = useMemo(() => {
    return stats.byPeriod.map((b) => ({
      period: b.label,
      revenue: b.revenue,
      orders: b.orderCount,
    }))
  }, [stats.byPeriod])

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
        <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('welcome')}</p>
      </div>

      {/* Sales Stats — Period filter & Export */}
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t('salesStats')}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{dateRangeLabel}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={period} onValueChange={(v) => setPeriod(v as PeriodType)}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('period')} />
                </SelectTrigger>
                <SelectContent>
                  {PERIOD_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {period === 'custom' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="from-date" className="text-xs whitespace-nowrap">{t('from')}</Label>
                    <Input
                      id="from-date"
                      type="date"
                      value={customFrom}
                      onChange={(e) => setCustomFrom(e.target.value)}
                      className="w-[140px]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Label htmlFor="to-date" className="text-xs whitespace-nowrap">{t('to')}</Label>
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
                {t('exportCsv')}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel} className="gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                {t('exportExcel')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title={t('totalSales')}
              value={`AED ${stats.totalSales.toLocaleString()}`}
              icon={DollarSign}
              color="success"
            />
            <StatsCard
              title={t('ordersPeriod')}
              value={stats.totalOrders}
              icon={ShoppingCart}
              color="primary"
            />
            <StatsCard
              title={t('productsSold')}
              value={stats.byProduct.length}
              icon={Package}
              color="accent"
            />
            <StatsCard
              title={t('customers')}
              value={stats.byCustomer.length}
              icon={Users}
              color="secondary"
            />
          </div>

          {/* Charts — dynamic to filter, RTL-aware and locale-aware labels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" dir={isRtl ? 'rtl' : 'ltr'} lang={i18n.language}>
            <Card className="text-start rtl:text-right">
              <CardHeader>
                <CardTitle className="text-base">{t('tabProduct')} — {t('tableRevenue')}</CardTitle>
              </CardHeader>
              <CardContent>
                {pieData.length === 0 ? (
                  <div className="flex aspect-square items-center justify-center text-muted-foreground text-sm">
                    {t('noSales')}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Donut only — no labels on the circle to avoid overlap */}
                    <div className="aspect-square max-h-[220px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                          >
                            {pieData.map((_, i) => (
                              <Cell key={i} fill={pieData[i].fill} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}
                            formatter={(v: number) => [`AED ${Number(v).toLocaleString(locale)}`, t('tableRevenue')]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Legend below: one line per product, no overlap */}
                    <ul className="list-none p-0 m-0 space-y-2 text-sm text-foreground" dir={isRtl ? 'rtl' : 'ltr'}>
                      {pieData.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 flex-wrap">
                          <span
                            className="shrink-0 w-3 h-3 rounded-sm"
                            style={{ backgroundColor: item.fill }}
                            aria-hidden
                          />
                          <span className="min-w-0 break-words">{item.name}</span>
                          <span className="shrink-0 font-medium tabular-nums">
                            {item.percent.toFixed(0)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="text-start rtl:text-right">
              <CardHeader>
                <CardTitle className="text-base">{t('tabPeriod')} — {t('tableRevenue')}</CardTitle>
              </CardHeader>
              <CardContent>
                {trendData.length === 0 ? (
                  <div className="flex aspect-video items-center justify-center text-muted-foreground text-sm">
                    {t('noPeriodData')}
                  </div>
                ) : (
                  <div className="max-h-[280px] w-full">
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart
                        data={trendData}
                        margin={isRtl ? { top: 8, right: 48, bottom: 8, left: 8 } : { top: 8, right: 8, bottom: 8, left: 48 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                          dataKey="period"
                          tick={{ fontSize: 11, textAnchor: isRtl ? 'end' : 'start' }}
                          reversed={isRtl}
                        />
                        <YAxis
                          yAxisId={0}
                          tick={{ fontSize: 11 }}
                          orientation={isRtl ? 'right' : 'left'}
                          width={40}
                          tickFormatter={(v) => `AED ${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                        />
                        <Tooltip
                          contentStyle={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}
                          formatter={(v: number) => [`AED ${Number(v).toLocaleString(locale)}`, t('tableRevenue')]}
                          labelFormatter={(label) => label}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#008080" fill="#008080" fillOpacity={0.3} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tables: Sales per product, per customer, by period */}
          <Tabs defaultValue="product" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="product">{t('tabProduct')}</TabsTrigger>
              <TabsTrigger value="customer">{t('tabCustomer')}</TabsTrigger>
              <TabsTrigger value="period">{t('tabPeriod')}</TabsTrigger>
            </TabsList>
            <TabsContent value="product" className="mt-4">
              <ScrollArea className="w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('tableProduct')}</TableHead>
                      <TableHead>{t('tableSize')}</TableHead>
                      <TableHead>{t('tableSku')}</TableHead>
                      <TableHead className="text-right">{t('tableQuantity')}</TableHead>
                      <TableHead className="text-right">{t('tableRevenue')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.byProduct.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          {t('noSales')}
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
                      <TableHead>{t('tableCustomer')}</TableHead>
                      <TableHead>{t('tableEmail')}</TableHead>
                      <TableHead className="text-right">{t('tableOrders')}</TableHead>
                      <TableHead className="text-right">{t('tableRevenue')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.byCustomer.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          {t('noCustomers')}
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
                      <TableHead>{t('tablePeriod')}</TableHead>
                      <TableHead>{t('tableFrom')}</TableHead>
                      <TableHead>{t('tableTo')}</TableHead>
                      <TableHead className="text-right">{t('tableOrders')}</TableHead>
                      <TableHead className="text-right">{t('tableRevenue')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.byPeriod.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          {t('noPeriodData')}
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
            <h2 className="text-xl font-bold text-gray-900 mb-1">{t('recentOrders')}</h2>
            <p className="text-sm text-gray-600">{t('recentOrdersDesc')}</p>
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>

        <Table>
<TableHeader>
          <TableRow>
            <TableHead>{t('orderId')}</TableHead>
            <TableHead>{t('tableCustomer')}</TableHead>
            <TableHead>{t('total')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('date')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                {t('noOrders')}
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
                    {t(order.status)}
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
