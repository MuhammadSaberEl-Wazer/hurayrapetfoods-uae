import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/admin/login')
    }
  }, [navigate])

  // Check authentication before rendering
  const isAuthenticated = localStorage.getItem('admin_authenticated')
  
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
