import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductBySlug } from '@/data/products'
import { ProductGallery } from '@/components/ProductGallery'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart, Star, CheckCircle, Truck, Shield, ArrowLeft, Minus, Plus, Droplets, Calendar, Package } from 'lucide-react'
import type { ProductSize } from '@/lib/types'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/hooks/use-toast'

const PREVIEW_HEIGHT = 120

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = getProductBySlug(slug!)
  const addToCart = useCartStore((state) => state.addToCart)
  const { toast } = useToast()

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0])
    }
  }, [product?.id])

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

      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => navigate('/products')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        {/* Two columns: Gallery | Info — like original */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 mb-16">
          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product info */}
          <div>
            {/* Pack / size line (like "Pack of 2" / "2 X 900g Bags") */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                From {product.sizes[0]?.size}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''} available
              </span>
            </div>

            {/* Type Badge */}
            <Badge
              variant="outline"
              className={`mb-4 ${
                product.type === 'chicken' ? 'border-primary text-primary' :
                product.type === 'tuna' ? 'border-secondary text-secondary' :
                'border-amber-600 text-amber-600'
              }`}
            >
              {product.type === 'chicken' ? '🍗 Chicken Formula' : product.type === 'tuna' ? '🐟 Tuna Formula' : '📦 Combo Formula'}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-causten font-bold mb-2">{product.name}</h1>
            {product.nameAr && (
              <p className="text-lg text-gray-600 mb-4">{product.nameAr}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-gray-600 text-sm">5.0</span>
            </div>

            {/* Long description with Read More — like original */}
            <div className="mb-6">
              <div
                id="long_content"
                className="text-gray-700 leading-relaxed transition-[max-height] duration-300 ease-in-out overflow-hidden"
                style={{ maxHeight: descriptionExpanded ? 'none' : PREVIEW_HEIGHT }}
              >
                <p className="mb-4">{product.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                className="text-primary font-causten font-semibold text-sm hover:underline"
              >
                {descriptionExpanded ? 'Show Less' : 'Read More'}
              </button>
            </div>

            {/* Key bullets (like 35% Protein, Vitamins, Omega-3, 100% Halal) */}
            <ul className="space-y-2 mb-6">
              {product.features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary font-causten">
                AED {currentPrice}
              </span>
              {product.compareAtPrice && product.compareAtPrice > currentPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">AED {product.compareAtPrice}</span>
                  <Badge className="bg-secondary text-white">
                    SAVE {Math.round(((product.compareAtPrice - currentPrice) / product.compareAtPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Select Size</label>
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
                        : 'border-gray-300 hover:border-primary/50'}
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

            {/* Availability */}
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">Availability:</span>{' '}
              <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                {product.inStock ? 'In stock' : 'Out of stock'}
              </span>
            </p>

            {/* Quantity + Add to Cart — like original (quantity wrap + button) */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 font-bold text-lg border-x-2 border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize?.inStock}
                className="bg-primary hover:bg-primary/90 text-white py-6 px-8 text-lg font-bold shrink-0"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
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
          </div>
        </div>

        {/* Tabs: Benefits, Ingredients, Feeding Guidelines, Nutritional Info — like original */}
        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="w-full justify-center rounded-none border-b border-gray-200 bg-transparent p-0 h-auto gap-0 mb-0">
            <TabsTrigger
              value="benefits"
              className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-6 py-4 font-causten uppercase tracking-wide"
            >
              Benefits
            </TabsTrigger>
            <TabsTrigger
              value="ingredients"
              className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-6 py-4 font-causten uppercase tracking-wide"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger
              value="feeding"
              className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-6 py-4 font-causten uppercase tracking-wide"
            >
              Feeding Guidelines
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-6 py-4 font-causten uppercase tracking-wide"
            >
              Nutritional Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="mt-0 bg-primary/10 rounded-xl p-8 md:p-12">
            <h3 className="font-causten font-bold text-xl mb-6">Benefits</h3>
            <ul className="space-y-3 text-gray-700">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-0 bg-primary/10 rounded-xl p-8 md:p-12">
            <h3 className="font-causten font-bold text-xl mb-6">Ingredients</h3>
            <p className="text-gray-700 mb-6">
              Our products are made with carefully selected, high-quality ingredients:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
              {product.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-600 italic">
              * All ingredients are halal-certified and free from artificial preservatives, colors, and flavors.
            </p>
          </TabsContent>

          <TabsContent value="feeding" className="mt-0 bg-primary/10 rounded-xl p-8 md:p-12">
            <h3 className="font-causten font-bold text-xl mb-6">Feeding Guidelines</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-800">
                    <th className="py-3 pr-4 font-semibold">Body Weight (kg)</th>
                    <th className="py-3 pr-4 font-semibold">Kitten 4–12 months (g/day)</th>
                    <th className="py-3 font-semibold">Adult 1+ yrs (g/day)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-300"><td className="py-2">1–2</td><td className="py-2">74–117</td><td className="py-2">29–47</td></tr>
                  <tr className="border-b border-gray-300"><td className="py-2">2–3</td><td className="py-2">117–154</td><td className="py-2">47–61</td></tr>
                  <tr className="border-b border-gray-300"><td className="py-2">3–4</td><td className="py-2">154–186</td><td className="py-2">61–74</td></tr>
                  <tr className="border-b border-gray-300"><td className="py-2">5–6</td><td className="py-2">216–244</td><td className="py-2">86–98</td></tr>
                  <tr className="border-b border-gray-300"><td className="py-2">+7</td><td className="py-2">+271</td><td className="py-2">+108</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-4">
              For ages 4+ months. Feeding amounts may vary based on your cat's age, weight and activity level. Transition over 7–10 days for a smooth switch.
            </p>
            <h4 className="font-semibold mb-2">Recommended Daily Feeding</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Serve around 70–118 g per 1–2 kg body weight per day</li>
              <li>Divide into two balanced meals</li>
              <li>Adjust portions based on activity level</li>
            </ul>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-0 bg-primary/10 rounded-xl p-8 md:p-12">
            <h3 className="font-causten font-bold text-xl mb-6">Nutritional Information</h3>
            <table className="w-full max-w-md text-left border-collapse">
              <tbody className="text-gray-700 divide-y divide-gray-300">
                <tr><td className="py-2 font-semibold">Crude Protein (min)</td><td className="py-2 text-right font-bold text-primary">{product.nutritionalInfo.protein}</td></tr>
                <tr><td className="py-2 font-semibold">Crude Fat (min)</td><td className="py-2 text-right font-bold text-primary">{product.nutritionalInfo.fat}</td></tr>
                <tr><td className="py-2 font-semibold">Crude Fiber (max)</td><td className="py-2 text-right font-bold text-primary">{product.nutritionalInfo.fiber}</td></tr>
                <tr><td className="py-2 font-semibold">Moisture (max)</td><td className="py-2 text-right font-bold text-primary">{product.nutritionalInfo.moisture}</td></tr>
                {product.nutritionalInfo.calories && (
                  <tr><td className="py-2 font-semibold">Caloric Content</td><td className="py-2 text-right font-bold text-primary">{product.nutritionalInfo.calories}</td></tr>
                )}
              </tbody>
            </table>
          </TabsContent>
        </Tabs>

        {/* Additional Advice — like original (3 cards) */}
        <section className="mt-16 mb-16">
          <h2 className="font-causten font-bold text-2xl mb-8">Additional Advice</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Droplets className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-causten font-bold text-lg mb-2">Always provide fresh drinking water</h3>
              <p className="text-gray-600 text-sm">Keep clean water available at all times for your cat.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-causten font-bold text-lg mb-2">Introduce new food gradually</h3>
              <p className="text-gray-600 text-sm">Transition over 7 days to avoid digestive discomfort.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Package className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-causten font-bold text-lg mb-2">Pack sizes</h3>
              <p className="text-gray-600 text-sm">Multiple sizes available; choose the one that fits your feeding routine (about two weeks per pack for regular feeding).</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
