# 🛒 المرحلة 4: سلة التسوق

**الحالة:** ✅ مكتملة  
**الوقت المتوقع:** 6-8 ساعات  
**تاريخ الاكتمال:** 2026-01-28  
**الأولوية:** ⭐⭐⭐⭐⭐

---

## 🎯 الأهداف

- [ ] إنشاء Cart Store (Zustand)
- [ ] بناء Cart Page
- [ ] إضافة Cart Icon في Header
- [ ] بناء Checkout Page
- [ ] Local Storage persistence

---

## 📋 المهام التفصيلية

### 1️⃣ Cart Store Setup (2 ساعة)

#### Zustand Store Structure:
```typescript
// src/store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  name: string
  size: string
  price: number
  quantity: number
  image: string
  sku: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          i => i.productId === item.productId && i.size === item.size
        )
        
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.productId === item.productId && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          }
        }
        
        return { items: [...state.items, item] }
      }),
      
      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter(
          i => !(i.productId === productId && i.size === size)
        )
      })),
      
      updateQuantity: (productId, size, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.productId === productId && i.size === size
            ? { ...i, quantity }
            : i
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
```

#### المطلوب:
- [ ] إنشاء `src/store/cartStore.ts`
- [ ] تطبيق Zustand with persist
- [ ] إضافة جميع الـ actions
- [ ] اختبار الـ store

---

### 2️⃣ Cart Icon in Header (1 ساعة)

#### Component:
```tsx
// src/components/CartIcon.tsx
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Link } from 'react-router-dom'

export const CartIcon = () => {
  const totalItems = useCartStore(state => state.getTotalItems())
  
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/components/CartIcon.tsx`
- [ ] إضافة في Header.tsx
- [ ] Badge للعدد
- [ ] Animation عند الإضافة

---

### 3️⃣ Cart Page (2.5 ساعة)

#### Page Structure:
```tsx
// src/pages/Cart.tsx
export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingCart className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <Link to="/products" className="text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-causten font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <CartItem
                key={`${item.productId}-${item.size}`}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>AED {getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>AED {getTotalPrice()}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full bg-primary text-white py-3 rounded-lg text-center block hover:bg-teal-dark transition-colors mb-2"
              >
                Proceed to Checkout
              </Link>
              
              <button
                onClick={clearCart}
                className="w-full text-red-500 py-2 text-sm hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/pages/Cart.tsx`
- [ ] Cart items list
- [ ] Order summary sidebar
- [ ] Empty cart state
- [ ] Clear cart button

---

### 4️⃣ CartItem Component (1.5 ساعة)

#### Component:
```tsx
// src/components/CartItem.tsx
interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void
  onRemove: (productId: string, size: string) => void
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      
      {/* Details */}
      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm">Size: {item.size}</p>
        <p className="text-primary font-bold mt-2">AED {item.price}</p>
      </div>
      
      {/* Quantity */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))}
          className="w-8 h-8 border rounded flex items-center justify-center"
        >
          -
        </button>
        <span className="font-bold w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
          className="w-8 h-8 border rounded flex items-center justify-center"
        >
          +
        </button>
      </div>
      
      {/* Subtotal */}
      <div className="text-right">
        <p className="font-bold text-lg">AED {item.price * item.quantity}</p>
        <button
          onClick={() => onRemove(item.productId, item.size)}
          className="text-red-500 text-sm hover:underline mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/components/CartItem.tsx`
- [ ] Quantity controls
- [ ] Remove button
- [ ] Price calculation

---

### 5️⃣ Checkout Page (2-3 ساعات)

#### Page Structure:
```tsx
// src/pages/Checkout.tsx
export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    emirate: '',
    notes: ''
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const order = {
      items,
      customer: formData,
      total: getTotalPrice(),
      date: new Date().toISOString()
    }
    
    // TODO: Send to Supabase later
    console.log('Order:', order)
    
    // For now, just clear cart and show success
    clearCart()
    alert('Order placed successfully!')
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-causten font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Customer Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  className="border rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  className="border rounded px-4 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="border rounded px-4 py-2"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="border rounded px-4 py-2"
                />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 mt-8">Delivery Address</h2>
              
              <textarea
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
                className="border rounded px-4 py-2 w-full mb-4"
                rows={3}
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                  className="border rounded px-4 py-2"
                />
                <select
                  value={formData.emirate}
                  onChange={(e) => setFormData({...formData, emirate: e.target.value})}
                  required
                  className="border rounded px-4 py-2"
                >
                  <option value="">Select Emirate</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="RAK">Ras Al Khaimah</option>
                  <option value="UAQ">Umm Al Quwain</option>
                  <option value="Fujairah">Fujairah</option>
                </select>
              </div>
              
              <textarea
                placeholder="Order Notes (optional)"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="border rounded px-4 py-2 w-full mt-4"
                rows={3}
              />
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg text-lg font-bold hover:bg-teal-dark mt-6"
              >
                Place Order
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                    <span>{item.name} ({item.size}) x{item.quantity}</span>
                    <span>AED {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>AED {getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>AED {getTotalPrice()}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
                <p className="font-semibold mb-1">Payment Method:</p>
                <p className="text-gray-600">Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/pages/Checkout.tsx`
- [ ] Customer information form
- [ ] Delivery address form
- [ ] Order summary
- [ ] Form validation
- [ ] Success message

---

## ✅ Checklist النهائية

### Store:
- [ ] `src/store/cartStore.ts` created
- [ ] All actions working
- [ ] LocalStorage persistence
- [ ] No bugs in store logic

### Components:
- [ ] `src/components/CartIcon.tsx`
- [ ] `src/components/CartItem.tsx`
- [ ] Cart icon in Header

### Pages:
- [ ] `src/pages/Cart.tsx`
- [ ] `src/pages/Checkout.tsx`
- [ ] Routes added

### Features:
- [ ] Add to cart works
- [ ] Remove from cart works
- [ ] Update quantity works
- [ ] Clear cart works
- [ ] Cart persists on refresh
- [ ] Checkout form validates
- [ ] Order can be submitted

---

## 📊 معايير الإنجاز

✅ **المرحلة مكتملة عندما:**
1. Cart store يعمل بشكل صحيح
2. يمكن إضافة منتجات للسلة
3. Cart page يعرض المنتجات
4. Checkout form يعمل
5. LocalStorage يحفظ البيانات
6. No console errors

---

## 🚀 الخطوة التالية

بعد إكمال هذه المرحلة، انتقل إلى:
```
PHASE_5_PAGES.md
```

---

**نسبة التقدم:** [░░░░░░░░░░] 0%
