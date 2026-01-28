import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCartStore()

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://placehold.co/100x100/008080/FFFFFF?text=Hurayra'
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      {/* Image */}
      <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
          onError={handleImageError}
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${item.product.slug}`}
          className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-gray-600 mt-1">
          Size: <span className="font-medium">{item.selectedSize.size}</span>
        </p>
        <p className="text-sm text-gray-600">
          SKU: <span className="font-medium text-xs">{item.selectedSize.sku}</span>
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Price */}
      <div className="text-right min-w-[100px]">
        <p className="font-bold text-primary text-lg">
          AED {item.total.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500">
          AED {item.price.toFixed(2)} each
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={() => removeFromCart(item.id)}
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  )
}
