import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users,
  BookOpen,
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Users
  },
  {
    title: 'Blog',
    href: '/admin/blog',
    icon: BookOpen
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    // Remove authentication
    localStorage.removeItem('admin_authenticated')
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 2000
    })
    
    // Redirect to login
    navigate('/admin/login')
  }

  return (
    <aside className={cn(
      "bg-gray-900 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐱</span>
            </div>
            <div>
              <h2 className="font-causten font-bold text-sm">Hurayra Admin</h2>
              <p className="text-xs text-gray-400">Control Panel</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full text-gray-400 hover:text-white hover:bg-gray-800",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
