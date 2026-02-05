import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { cn } from '@/lib/utils'

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
      <main
        className={cn(
          'flex-1 min-h-screen overflow-auto transition-[margin] duration-300',
          sidebarCollapsed ? 'ml-20 rtl:ml-0 rtl:mr-20' : 'ml-64 rtl:ml-0 rtl:mr-64'
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
