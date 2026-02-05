import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eye, Search, Filter, Download, FileSpreadsheet } from 'lucide-react'
import { useOrdersStore } from '@/store/ordersStore'
import { exportOrdersToCsv, exportOrdersToExcel } from '@/lib/exportOrders'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function AdminOrders() {
  const { t } = useTranslation('admin-orders')
  const orders = useOrdersStore((s) => s.orders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = `${order.customerInfo.firstName} ${order.customerInfo.lastName}`.trim()
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, statusFilter])

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // TODO: connect to Supabase / API
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  const handleExportCsv = () => {
    exportOrdersToCsv(filteredOrders)
  }

  const handleExportExcel = () => {
    exportOrdersToExcel(filteredOrders)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Search & Filters (Manage customer) + Export */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t('filterStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatus')}</SelectItem>
              <SelectItem value="pending">{t('pending')}</SelectItem>
              <SelectItem value="processing">{t('processing')}</SelectItem>
              <SelectItem value="shipped">{t('shipped')}</SelectItem>
              <SelectItem value="delivered">{t('delivered')}</SelectItem>
              <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Export Orders — below filters, full width, larger and accessible on mobile */}
        <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="default" onClick={handleExportCsv} className="flex-1 min-h-11 gap-2">
            <Download className="w-4 h-4 shrink-0" />
            {t('exportCsv')}
          </Button>
          <Button variant="outline" size="default" onClick={handleExportExcel} className="flex-1 min-h-11 gap-2">
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            {t('exportExcel')}
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('tableOrderNumber')}</TableHead>
              <TableHead>{t('tableCustomer')}</TableHead>
              <TableHead>{t('tableContact')}</TableHead>
              <TableHead>{t('tableItems')}</TableHead>
              <TableHead>{t('tableTotal')}</TableHead>
              <TableHead>{t('tableStatus')}</TableHead>
              <TableHead>{t('tableDate')}</TableHead>
              <TableHead className="text-right">{t('tableActions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const customerName = `${order.customerInfo.firstName} ${order.customerInfo.lastName}`.trim()
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{customerName || order.customerInfo.email}</p>
                      <p className="text-sm text-gray-500">{order.deliveryAddress.emirate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="text-gray-600">{order.customerInfo.email}</p>
                      <p className="text-gray-500">{order.customerInfo.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{t('itemsCount', { count: order.items.length })}</span>
                  </TableCell>
                  <TableCell className="font-medium">
                    AED {order.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>
                          <Badge className={statusColors[order.status] ?? 'bg-gray-100 text-gray-800'}>
                            {t(order.status)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{t('pending')}</SelectItem>
                        <SelectItem value="processing">{t('processing')}</SelectItem>
                        <SelectItem value="shipped">{t('shipped')}</SelectItem>
                        <SelectItem value="delivered">{t('delivered')}</SelectItem>
                        <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('noOrders')}</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">{t('summaryTotalOrders')}</p>
            <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t('summaryTotalRevenue')}</p>
            <p className="text-2xl font-bold text-gray-900">
              AED {filteredOrders.reduce((sum, order) => sum + order.total, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t('summaryPending')}</p>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredOrders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t('summaryDelivered')}</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredOrders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
