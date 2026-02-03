import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/hooks/use-toast'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const { toast } = useToast()
  
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  const handleAddToCart = () => {
    if (!product.inStock || !product.sizes[0]) return
    
    addToCart(product, product.sizes[0], 1)
    
    toast({
      title: "Added to cart!",
      description: `${product.name} (${product.sizes[0].size}) has been added to your cart.`,
      duration: 3000
    })
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.featured && (
          <Badge className="bg-accent text-white shadow-lg">
            Featured
          </Badge>
        )}
        {hasDiscount && (
          <Badge className="bg-secondary text-white shadow-lg">
            -{discountPercentage}%
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="destructive" className="shadow-lg">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Image */}
      <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = 'https://placehold.co/400x400/008080/FFFFFF?text=Hurayra+Cat+Food'
          }}
        />
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-causten font-bold text-lg">
            View Details
          </span>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5">
        {/* Type Badge */}
        <div className="mb-2">
          <Badge 
            variant="outline" 
            className={
              product.type === 'chicken' ? 'border-primary text-primary' :
              product.type === 'tuna' ? 'border-secondary text-secondary' :
              'border-amber-600 text-amber-600'
            }
          >
            {product.type === 'chicken' ? '🍗 Chicken' : product.type === 'tuna' ? '🐟 Tuna' : '📦 Combo'}
          </Badge>
        </div>

        {/* Title */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-causten font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
          <span className="text-sm text-gray-600 ml-1">(4.9)</span>
        </div>

        {/* Features - show 2 main ones */}
        <div className="mb-4 space-y-1">
          {product.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary font-causten">
            AED {product.price}
          </span>
          {hasDiscount && (
            <span className="text-lg text-gray-400 line-through">
              AED {product.compareAtPrice}
            </span>
          )}
        </div>
        
        {/* Size info */}
        <p className="text-sm text-gray-500 mb-4">
          From {product.sizes[0].size} • {product.sizes.length} sizes available
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link to={`/products/${product.slug}`}>
              View
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
