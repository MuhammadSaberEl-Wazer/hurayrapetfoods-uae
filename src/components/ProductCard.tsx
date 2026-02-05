import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/hooks/use-toast'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t, i18n } = useTranslation('products')
  const { t: tDetail } = useTranslation('productDetail')
  const isAr = i18n.language === 'ar'
  const priceStr = (amount: number) => isAr ? `${amount} ${t('currency')}` : `${t('currency')} ${amount}`
  const displayName = tDetail(`items.${product.id}.name`, { defaultValue: product.name }) as string
  const rawFeatures = tDetail(`items.${product.id}.features`, { returnObjects: true })
  const displayFeatures: string[] = Array.isArray(rawFeatures) ? rawFeatures : product.features
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
      title: t('toast.added'),
      description: t('toast.addedDesc', { name: displayName, size: product.sizes[0].size }),
      duration: 3000
    })
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 rtl:left-auto rtl:right-4">
        {product.featured && (
          <Badge className="bg-accent text-white shadow-lg">
            {t('featured')}
          </Badge>
        )}
        {hasDiscount && (
          <Badge className="bg-secondary text-white shadow-lg">
            -{discountPercentage}%
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="destructive" className="shadow-lg">
            {t('outOfStock')}
          </Badge>
        )}
      </div>

      {/* Image */}
      <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.images[0]} 
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = 'https://placehold.co/400x400/008080/FFFFFF?text=Hurayra+Cat+Food'
          }}
        />
        
        {/* Quick view overlay — Cairo font when lang=ar via global CSS */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="product-card-overlay-label text-white font-causten font-bold text-lg">
            {t('viewDetails')}
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
            {product.type === 'chicken' ? `🍗 ${t('filters.chicken')}` : product.type === 'tuna' ? `🐟 ${t('filters.tuna')}` : `📦 ${t('filters.combo')}`}
          </Badge>
        </div>

        {/* Title */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-causten font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {displayName}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
          <span className="text-sm text-gray-600 ml-1">(4.9)</span>
        </div>

        {/* Features - show 2 main ones (translated when available) */}
        <div className="mb-4 space-y-1">
          {displayFeatures.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary font-causten">
            {priceStr(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-lg text-gray-400 line-through">
              {priceStr(product.compareAtPrice)}
            </span>
          )}
        </div>
        
        {/* Size info */}
        <p className="text-sm text-gray-500 mb-4">
          {t('from')} {product.sizes[0].size} • {t('sizesAvailable', { count: product.sizes.length })}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t('addToCart')}
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link to={`/products/${product.slug}`}>
              {t('view')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
