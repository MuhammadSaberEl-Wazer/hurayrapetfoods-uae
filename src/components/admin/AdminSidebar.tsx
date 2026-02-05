import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BookOpen,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Database
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

const menuKeys = [
  { key: 'dashboard', href: '/admin', icon: LayoutDashboard },
  { key: 'products', href: '/admin/products', icon: Package },
  { key: 'orders', href: '/admin/orders', icon: ShoppingCart },
  { key: 'customers', href: '/admin/customers', icon: Users },
  { key: 'blog', href: '/admin/blog', icon: BookOpen },
  { key: 'settings', href: '/admin/settings', icon: Settings },
  { key: 'dev', href: '/admin/dev', icon: Database }
] as const

type AdminSidebarProps = {
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export default function AdminSidebar({ collapsed = false, onCollapsedChange }: AdminSidebarProps) {
  const { t } = useTranslation('admin-common')
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const setCollapsed = (value: boolean) => {
    onCollapsedChange?.(value)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    toast({
      title: t('toast.loggedOutTitle'),
      description: t('toast.loggedOutDesc'),
      duration: 2000
    })
    navigate('/admin/login')
  }

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 rtl:left-auto rtl:right-0 z-30 h-screen max-h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col overflow-hidden",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-800 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐱</span>
            </div>
            <div>
              <h2 className="font-causten font-bold text-sm">{t('brand')}</h2>
              <p className="text-xs text-gray-400">{t('controlPanel')}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5 rtl:rotate-180" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2">
        {menuKeys.map((item) => {
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
              {!collapsed && <span className="font-medium">{t(`sidebar.${item.key}`)}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer: Language + Logout */}
      <div className="p-4 border-t border-gray-800 space-y-2 shrink-0">
        {!collapsed && (
          <div className="px-2">
            <LanguageSwitcher variant="light" className="w-full [&>button]:w-full [&>button]:justify-start " />
          </div>
        )}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full text-gray-400 hover:text-white hover:bg-gray-800",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3 rtl:mr-3 rtl:ml-0">{t('sidebar.logout')}</span>}
        </Button>
      </div>
    </aside>
  )
}
