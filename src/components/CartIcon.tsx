import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Badge } from '@/components/ui/badge'

export const CartIcon = () => {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <Link
      to="/cart"
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors group"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 bg-secondary text-white text-xs font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </div>
      <span className="hidden md:inline-block font-medium text-gray-700 group-hover:text-primary transition-colors">
        Cart
      </span>
    </Link>
  )
}
