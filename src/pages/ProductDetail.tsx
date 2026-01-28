import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductBySlug } from '@/data/products'
import { ProductGallery } from '@/components/ProductGallery'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart, Star, CheckCircle, Truck, Shield, ArrowLeft, Minus, Plus } from 'lucide-react'
import type { ProductSize } from '@/lib/types'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/hooks/use-toast'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = getProductBySlug(slug!)
  const addToCart = useCartStore((state) => state.addToCart)
  const { toast } = useToast()

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Set default size if not selected
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0])
  }

  const currentPrice = selectedSize?.price || product.price
  const totalPrice = currentPrice * quantity

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart",
        variant: "destructive"
      })
      return
    }
    
    addToCart(product, selectedSize, quantity)
    
    toast({
      title: "Added to cart!",
      description: `${product.name} - ${selectedSize.size} x ${quantity} (AED ${totalPrice.toFixed(2)})`,
      duration: 3000
    })
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-600 hover:text-primary">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/products')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Info */}
          <div>
            {/* Type Badge */}
            <Badge 
              variant="outline" 
              className={`mb-4 ${product.type === 'chicken' ? 'border-primary text-primary' : 'border-secondary text-secondary'}`}
            >
              {product.type === 'chicken' ? '🍗 Chicken Formula' : '🐟 Tuna Formula'}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl font-causten font-bold mb-3">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.nameAr}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-gray-600">(4.9) • 2,847 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-primary font-causten">
                AED {currentPrice}
              </span>
              {product.compareAtPrice && product.compareAtPrice > currentPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    AED {product.compareAtPrice}
                  </span>
                  <Badge className="bg-secondary text-white">
                    SAVE {Math.round(((product.compareAtPrice - currentPrice) / product.compareAtPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description.substring(0, 200)}...
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">Select Size:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size.sku}
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.inStock}
                    className={`
                      relative p-4 border-2 rounded-lg transition-all text-center
                      ${!size.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      ${selectedSize?.sku === size.sku 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-gray-300 hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="font-bold text-lg">{size.size}</div>
                    <div className="text-sm text-primary font-semibold">AED {size.price}</div>
                    {!size.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                        <span className="text-xs font-semibold text-red-600">Out of Stock</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">Quantity:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 py-3 font-bold text-xl border-x-2 border-gray-300 min-w-[80px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-gray-600">
                  Total: <span className="text-2xl font-bold text-primary">AED {totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize?.inStock}
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-bold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - AED {totalPrice}
              </Button>
              <Button variant="outline" className="w-full py-6 text-lg">
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold">100% Halal</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold">Free Delivery</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold">30-Day Guarantee</p>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-causten font-bold mb-4">Product Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
            <p className="text-gray-600 leading-relaxed italic">{product.descriptionAr}</p>
          </TabsContent>

          <TabsContent value="nutrition" className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-causten font-bold mb-6">Nutritional Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-4">Guaranteed Analysis</h3>
                <table className="w-full">
                  <tbody className="divide-y">
                    <tr className="py-2">
                      <td className="py-2 font-semibold">Crude Protein (min)</td>
                      <td className="text-right text-primary font-bold">{product.nutritionalInfo.protein}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Crude Fat (min)</td>
                      <td className="text-right text-primary font-bold">{product.nutritionalInfo.fat}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Crude Fiber (max)</td>
                      <td className="text-right text-primary font-bold">{product.nutritionalInfo.fiber}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Moisture (max)</td>
                      <td className="text-right text-primary font-bold">{product.nutritionalInfo.moisture}</td>
                    </tr>
                    {product.nutritionalInfo.calories && (
                      <tr>
                        <td className="py-2 font-semibold">Caloric Content</td>
                        <td className="text-right text-primary font-bold">{product.nutritionalInfo.calories}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Feeding Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Recommended daily feeding amounts based on your cat's weight. Always provide fresh water.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>2-3 kg</span>
                    <span className="font-semibold">30-45g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3-4 kg</span>
                    <span className="font-semibold">45-60g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4-5 kg</span>
                    <span className="font-semibold">60-75g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-6 kg</span>
                    <span className="font-semibold">75-90g</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-causten font-bold mb-6">Ingredients</h2>
            <p className="text-gray-600 mb-6">
              Our products are made with carefully selected, high-quality ingredients:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {product.ingredients.map((ingredient, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{ingredient}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500 italic">
              * All ingredients are halal-certified and free from artificial preservatives, colors, and flavors.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
