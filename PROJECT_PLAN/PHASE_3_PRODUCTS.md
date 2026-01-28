# 🛍️ المرحلة 3: نظام المنتجات

**الحالة:** ✅ مكتملة  
**الوقت المتوقع:** 8-10 ساعات  
**تاريخ الاكتمال:** 2026-01-28  
**الأولوية:** ⭐⭐⭐⭐⭐

---

## 🎯 الأهداف

- [x] إنشاء بيانات المنتجات (Chicken & Tuna)
- [x] بناء ProductCard component
- [x] بناء صفحة Products
- [x] بناء صفحة Product Detail
- [x] إضافة Product Gallery

---

## 📋 المهام التفصيلية

### 1️⃣ Product Data Structure (1.5 ساعة)

#### بنية البيانات:
```typescript
// src/data/products.ts
export interface Product {
  id: string
  name: string
  nameAr: string
  slug: string
  type: 'chicken' | 'tuna'
  description: string
  descriptionAr: string
  price: number
  compareAtPrice?: number
  sizes: Size[]
  features: string[]
  nutritionalInfo: NutritionalInfo
  ingredients: string[]
  images: string[]
  inStock: boolean
  featured: boolean
}

export interface Size {
  size: string
  price: number
  inStock: boolean
  sku: string
}

export interface NutritionalInfo {
  protein: string
  fat: string
  fiber: string
  moisture: string
  calories: string
}
```

#### المنتجات المطلوبة:

**Chicken Products:**
```typescript
{
  id: 'chicken-400g',
  name: 'Halal Chicken Cat Food - 400g',
  nameAr: 'طعام قطط دجاج حلال - 400 جرام',
  slug: 'halal-chicken-cat-food-400g',
  type: 'chicken',
  description: 'Premium halal chicken formula...',
  price: 25,
  compareAtPrice: 30,
  sizes: [
    { size: '400g', price: 25, inStock: true, sku: 'CHK-400' },
    { size: '2kg', price: 95, inStock: true, sku: 'CHK-2K' },
    { size: '5kg', price: 220, inStock: true, sku: 'CHK-5K' }
  ],
  features: [
    '100% Halal Certified',
    'High Protein Content',
    'No Artificial Preservatives',
    'Grain-Free Formula'
  ],
  nutritionalInfo: {
    protein: '35%',
    fat: '15%',
    fiber: '3%',
    moisture: '10%',
    calories: '380 kcal/cup'
  },
  ingredients: [
    'Chicken Meat',
    'Chicken Liver',
    'Fish Oil',
    'Vitamins & Minerals'
  ],
  images: [
    '/products/chicken-main.jpg',
    '/products/chicken-2.jpg',
    '/products/chicken-3.jpg'
  ],
  inStock: true,
  featured: true
}
```

**Tuna Products:**
```typescript
{
  id: 'tuna-400g',
  name: 'Halal Tuna Cat Food - 400g',
  nameAr: 'طعام قطط تونا حلال - 400 جرام',
  slug: 'halal-tuna-cat-food-400g',
  type: 'tuna',
  // ... نفس البنية
}
```

#### المطلوب:
- [ ] إنشاء `src/lib/types.ts` (Product types)
- [ ] إنشاء `src/data/products.ts`
- [ ] إضافة 2 منتجات (Chicken & Tuna)
- [ ] إضافة جميع الأحجام والأسعار

---

### 2️⃣ ProductCard Component (2 ساعة)

#### الميزات المطلوبة:
- صورة المنتج
- اسم المنتج
- السعر (مع السعر القديم إن وجد)
- Badge (New, Sale, Featured)
- زر "Add to Cart"
- تأثيرات Hover

#### Component Structure:
```tsx
// src/components/ProductCard.tsx
interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Badge */}
      {product.featured && (
        <span className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
          Featured
        </span>
      )}
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-causten font-bold text-lg mb-2">{product.name}</h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">AED {product.price}</span>
          {product.compareAtPrice && (
            <span className="text-gray-400 line-through">AED {product.compareAtPrice}</span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-teal-dark transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/components/ProductCard.tsx`
- [ ] إضافة Hover effects
- [ ] إضافة Badge system
- [ ] تطبيق الستايل من HTML القديم

---

### 3️⃣ Products Page (2 ساعة)

#### الميزات المطلوبة:
- عرض جميع المنتجات
- فلترة (All / Chicken / Tuna)
- Sorting (Price, Name, Featured)
- Grid responsive

#### Page Structure:
```tsx
// src/pages/Products.tsx
export default function Products() {
  const [filter, setFilter] = useState<'all' | 'chicken' | 'tuna'>('all')
  const [products, setProducts] = useState<Product[]>(allProducts)
  
  const filteredProducts = products.filter(p => 
    filter === 'all' ? true : p.type === filter
  )
  
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Hero */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl font-causten font-bold text-center mb-4">
          Our Products
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Premium halal cat food made with love and care
        </p>
      </div>
      
      {/* Filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex gap-4 justify-center">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('chicken')}>Chicken</button>
          <button onClick={() => setFilter('tuna')}>Tuna</button>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/pages/Products.tsx`
- [ ] إضافة Filter buttons
- [ ] إضافة Products grid
- [ ] Responsive design
- [ ] إضافة Route في App.tsx

---

### 4️⃣ Product Detail Page (3 ساعة)

#### الميزات المطلوبة:
- Product Gallery (multiple images)
- Product Information
- Size Selector
- Quantity Selector
- Add to Cart
- Nutritional Info
- Ingredients List
- Related Products

#### Page Structure:
```tsx
// src/pages/ProductDetail.tsx
export default function ProductDetail() {
  const { slug } = useParams()
  const [selectedSize, setSelectedSize] = useState<Size>()
  const [quantity, setQuantity] = useState(1)
  
  const product = products.find(p => p.slug === slug)
  
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Gallery */}
          <ProductGallery images={product.images} />
          
          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            {/* Price */}
            <div className="text-3xl font-bold text-primary mb-6">
              AED {selectedSize?.price || product.price}
            </div>
            
            {/* Size Selector */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Size:</label>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize?.size === size.size 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Quantity:</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="text-xl font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <button className="w-full bg-primary text-white py-4 rounded-lg text-lg font-bold hover:bg-teal-dark">
              Add to Cart - AED {(selectedSize?.price || product.price) * quantity}
            </button>
            
            {/* Features */}
            <div className="mt-8">
              <h3 className="font-bold mb-4">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Tabs: Description, Nutrition, Ingredients */}
        <ProductTabs product={product} />
      </div>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/pages/ProductDetail.tsx`
- [ ] إنشاء `src/components/ProductGallery.tsx`
- [ ] إنشاء `src/components/ProductTabs.tsx`
- [ ] Size selector
- [ ] Quantity selector
- [ ] إضافة Route مع parameter

---

### 5️⃣ Product Gallery Component (1.5 ساعة)

#### الميزات:
- صورة رئيسية كبيرة
- Thumbnails صغيرة
- Image zoom (optional)
- Swipe للموبايل

#### المطلوب:
- [ ] إنشاء `src/components/ProductGallery.tsx`
- [ ] Image switching
- [ ] Responsive design
- [ ] Smooth transitions

---

## ✅ Checklist النهائية

### Components Created:
- [ ] `src/components/ProductCard.tsx`
- [ ] `src/components/ProductGallery.tsx`
- [ ] `src/components/ProductTabs.tsx`
- [ ] `src/components/SizeSelector.tsx` (optional)
- [ ] `src/components/QuantitySelector.tsx` (optional)

### Pages Created:
- [ ] `src/pages/Products.tsx`
- [ ] `src/pages/ProductDetail.tsx`

### Data Files:
- [ ] `src/data/products.ts`
- [ ] Product images added to `/public/products/`

### Routes Added:
- [ ] `/products` route
- [ ] `/products/:slug` route

### Features Working:
- [ ] Products grid display
- [ ] Filter by type (Chicken/Tuna)
- [ ] Product card links to detail
- [ ] Size selection works
- [ ] Quantity selection works
- [ ] Product images display correctly

---

## 📊 معايير الإنجاز

✅ **المرحلة مكتملة عندما:**
1. جميع المنتجات تظهر بشكل صحيح
2. Product Detail page يعمل
3. Size & Quantity selection يعملان
4. Responsive على جميع الشاشات
5. Product images loaded
6. No console errors

---

## 🚀 الخطوة التالية

بعد إكمال هذه المرحلة، انتقل إلى:
```
PHASE_4_CART.md
```

---

**نسبة التقدم:** [░░░░░░░░░░] 0%
