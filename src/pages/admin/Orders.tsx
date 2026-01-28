import { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
import { 
  Eye, 
  Search,
  Filter,
  Download
} from 'lucide-react'

// Mock Orders Data
const mockOrders = [
  {
    id: 'ORD-001',
    orderNumber: 'ORD-1706442320',
    customer: 'Ahmed Al Mansouri',
    email: 'ahmed@example.com',
    phone: '+971501234567',
    items: 2,
    total: 220,
    status: 'delivered',
    paymentMethod: 'cod',
    date: '2026-01-28',
    emirate: 'Dubai'
  },
  {
    id: 'ORD-002',
    orderNumber: 'ORD-1706442321',
    customer: 'Fatima Hassan',
    email: 'fatima@example.com',
    phone: '+971507654321',
    items: 1,
    total: 105,
    status: 'processing',
    paymentMethod: 'cod',
    date: '2026-01-28',
    emirate: 'Abu Dhabi'
  },
  {
    id: 'ORD-003',
    orderNumber: 'ORD-1706442322',
    customer: 'Mohammed Abdullah',
    email: 'mohammed@example.com',
    phone: '+971509876543',
    items: 3,
    total: 165,
    status: 'shipped',
    paymentMethod: 'cod',
    date: '2026-01-27',
    emirate: 'Sharjah'
  },
  {
    id: 'ORD-004',
    orderNumber: 'ORD-1706442323',
    customer: 'Aisha Salem',
    email: 'aisha@example.com',
    phone: '+971501112233',
    items: 1,
    total: 95,
    status: 'pending',
    paymentMethod: 'cod',
    date: '2026-01-27',
    emirate: 'Ajman'
  },
  {
    id: 'ORD-005',
    orderNumber: 'ORD-1706442324',
    customer: 'Khalid Al Zaabi',
    email: 'khalid@example.com',
    phone: '+971504445566',
    items: 4,
    total: 245,
    status: 'delivered',
    paymentMethod: 'cod',
    date: '2026-01-26',
    emirate: 'Ras Al Khaimah'
  },
  {
    id: 'ORD-006',
    orderNumber: 'ORD-1706442325',
    customer: 'Mariam Ibrahim',
    email: 'mariam@example.com',
    phone: '+971507778899',
    items: 2,
    total: 115,
    status: 'cancelled',
    paymentMethod: 'cod',
    date: '2026-01-25',
    emirate: 'Dubai'
  }
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Mock function - will be connected to Supabase later
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600">Manage customer orders</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by order number, customer, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.emirate}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="text-gray-600">{order.email}</p>
                    <p className="text-gray-500">{order.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{order.items} items</span>
                </TableCell>
                <TableCell className="font-medium">
                  AED {order.total}
                </TableCell>
                <TableCell>
                  <Select 
                    value={order.status} 
                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue>
                        <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                          {order.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-gray-600">{order.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No orders found</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              AED {filteredOrders.reduce((sum, order) => sum + order.total, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredOrders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredOrders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
