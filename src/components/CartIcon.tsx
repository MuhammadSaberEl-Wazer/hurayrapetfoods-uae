import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Badge } from '@/components/ui/badge'

type CartIconProps = {
  variant?: 'default' | 'light'
}

export const CartIcon = ({ variant = 'default' }: CartIconProps) => {
  const totalItems = useCartStore((state) => state.getTotalItems())

  const isLight = variant === 'light'
  const linkClass = isLight
    ? 'relative inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors group text-white'
    : 'relative inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors group'
  const iconClass = isLight
    ? 'w-6 h-6 text-white group-hover:text-white/90 transition-colors'
    : 'w-6 h-6 text-gray-700 group-hover:text-primary transition-colors'
  const labelClass = isLight
    ? 'hidden md:inline-block font-medium text-white group-hover:text-white/90 transition-colors'
    : 'hidden md:inline-block font-medium text-gray-700 group-hover:text-primary transition-colors'

  return (
    <Link to="/cart" className={linkClass}>
      <div className="relative">
        <ShoppingCart className={iconClass} />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 px-1.5 bg-accent text-accent-foreground text-xs font-bold shadow-md ring-2 ring-white/50">
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </div>
      <span className={labelClass}>
        Cart
      </span>
    </Link>
  )
}
