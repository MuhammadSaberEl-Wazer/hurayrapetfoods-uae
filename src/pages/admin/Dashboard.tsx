import { DollarSign, Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Mock data
const stats = {
  totalRevenue: 15420,
  totalOrders: 245,
  totalProducts: 2,
  totalCustomers: 189
}

const recentOrders = [
  { id: 'ORD-001', customer: 'Ahmed Al Mansouri', total: 220, status: 'delivered', date: '2026-01-28' },
  { id: 'ORD-002', customer: 'Fatima Hassan', total: 105, status: 'processing', date: '2026-01-28' },
  { id: 'ORD-003', customer: 'Mohammed Abdullah', total: 165, status: 'shipped', date: '2026-01-27' },
  { id: 'ORD-004', customer: 'Aisha Salem', total: 95, status: 'pending', date: '2026-01-27' },
  { id: 'ORD-005', customer: 'Khalid Al Zaabi', total: 245, status: 'delivered', date: '2026-01-26' }
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`AED ${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="success"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          trend={{ value: 8.2, isPositive: true }}
          color="primary"
        />
        <StatsCard
          title="Products"
          value={stats.totalProducts}
          icon={Package}
          color="accent"
        />
        <StatsCard
          title="Customers"
          value={stats.totalCustomers}
          icon={Users}
          trend={{ value: 15.3, isPositive: true }}
          color="secondary"
        />
      </div>

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
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>AED {order.total}</TableCell>
                <TableCell>
                  <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
