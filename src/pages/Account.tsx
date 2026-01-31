import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useOrdersStore } from '@/store/ordersStore'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  User,
  ShoppingBag,
  Package,
  LogOut,
  ChevronRight,
  ShoppingCart
} from 'lucide-react'
import type { OrderStatus } from '@/lib/types'

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
}

export default function Account() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const getOrdersByEmail = useOrdersStore((s) => s.getOrdersByEmail)
  const { items, getTotalItems, getTotalPrice } = useCartStore()

  if (!user) {
    navigate('/login', { replace: true })
    return null
  }

  const orders = getOrdersByEmail(user.email)
  const cartCount = getTotalItems()
  const cartTotal = getTotalPrice()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">My account</h1>
        <p className="text-gray-600 mb-8">Manage your profile, orders, and cart</p>

        {/* Profile */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-900">{user.name}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              {user.provider && (
                <span className="inline-block mt-1 text-xs text-gray-500">
                  Signed in with {user.provider === 'google' ? 'Google' : 'email'}
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Quick links */}
        <div className="space-y-3 mb-8">
          {/* Cart */}
          <Link to="/cart">
            <Card className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Shopping cart</p>
                  <p className="text-sm text-gray-600">
                    {cartCount === 0
                      ? 'Your cart is empty'
                      : `${cartCount} item${cartCount !== 1 ? 's' : ''} · AED ${cartTotal.toFixed(2)}`}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Card>
          </Link>

          {/* Orders */}
          <div>
            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order history</p>
                  <p className="text-sm text-gray-600">
                    {orders.length === 0
                      ? 'No orders yet'
                      : `${orders.length} order${orders.length !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              {orders.length === 0 ? (
                <p className="text-sm text-gray-500 pl-16">Place an order to see it here.</p>
              ) : (
                <ul className="space-y-3 pl-16">
                  {orders.slice(0, 5).map((order) => (
                    <li key={order.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{order.orderNumber}</span>
                      <span className="text-gray-500">{statusLabel[order.status]}</span>
                      <span className="text-primary font-semibold">AED {order.total.toFixed(2)}</span>
                    </li>
                  ))}
                  {orders.length > 5 && (
                    <li className="text-gray-500 text-sm">+ {orders.length - 5} more</li>
                  )}
                </ul>
              )}
            </Card>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-gray-700 border-gray-300"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>

        <div className="mt-8 flex gap-3 justify-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/products">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
