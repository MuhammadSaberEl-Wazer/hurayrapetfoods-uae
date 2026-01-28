# 🗄️ المرحلة 6: Supabase Integration

**الحالة:** ☐ لم تبدأ  
**الوقت المتوقع:** 8-10 ساعات  
**الأولوية:** ⭐⭐⭐⭐

---

## 🎯 الأهداف

- [ ] إعداد Supabase Project
- [ ] إنشاء Database Schema
- [ ] نقل بيانات المنتجات
- [ ] إنشاء Orders System
- [ ] ربط Frontend بـ Backend

---

## 📋 المهام التفصيلية

### 1️⃣ Supabase Project Setup (1 ساعة)

#### الخطوات:
1. إنشاء حساب على Supabase
2. إنشاء Project جديد
3. حفظ الـ API Keys
4. تثبيت Supabase client

#### المطلوب:
```bash
pnpm add @supabase/supabase-js
```

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

#### Checklist:
- [ ] Supabase account created
- [ ] Project created
- [ ] `src/lib/supabase.ts` created
- [ ] `.env` file with keys
- [ ] Connection tested

---

### 2️⃣ Database Schema (2 ساعات)

#### Tables المطلوبة:

**1. products**
```sql
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  name_ar text,
  slug text unique not null,
  type text not null check (type in ('chicken', 'tuna')),
  description text,
  description_ar text,
  price decimal(10,2) not null,
  compare_at_price decimal(10,2),
  features jsonb,
  nutritional_info jsonb,
  ingredients jsonb,
  images jsonb,
  in_stock boolean default true,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

**2. product_sizes**
```sql
create table product_sizes (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade,
  size text not null,
  price decimal(10,2) not null,
  sku text unique not null,
  in_stock boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

**3. customers**
```sql
create table customers (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text unique not null,
  phone text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

**4. orders**
```sql
create table orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  customer_id uuid references customers(id),
  customer_first_name text not null,
  customer_last_name text not null,
  customer_email text not null,
  customer_phone text not null,
  delivery_address text not null,
  delivery_city text not null,
  delivery_emirate text not null,
  notes text,
  subtotal decimal(10,2) not null,
  shipping decimal(10,2) default 0,
  total decimal(10,2) not null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method text default 'cod',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

**5. order_items**
```sql
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  size text not null,
  sku text not null,
  quantity integer not null,
  price decimal(10,2) not null,
  subtotal decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

**6. contact_messages**
```sql
create table contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

#### Indexes:
```sql
create index idx_products_type on products(type);
create index idx_products_slug on products(slug);
create index idx_orders_customer_email on orders(customer_email);
create index idx_orders_status on orders(status);
create index idx_orders_created_at on orders(created_at desc);
```

#### المطلوب:
- [ ] جميع الـ tables created
- [ ] Indexes added
- [ ] Relationships configured
- [ ] RLS policies (اختياري في البداية)

---

### 3️⃣ نقل بيانات المنتجات (1.5 ساعة)

#### Insert Products:
```sql
-- Chicken Product
insert into products (
  name, name_ar, slug, type, description, price, compare_at_price,
  features, nutritional_info, ingredients, images, featured
) values (
  'Halal Chicken Cat Food',
  'طعام قطط دجاج حلال',
  'halal-chicken-cat-food',
  'chicken',
  'Premium halal chicken formula for cats...',
  25.00,
  30.00,
  '["100% Halal Certified", "High Protein", "Grain-Free"]'::jsonb,
  '{"protein": "35%", "fat": "15%", "fiber": "3%", "moisture": "10%"}'::jsonb,
  '["Chicken Meat", "Chicken Liver", "Fish Oil", "Vitamins"]'::jsonb,
  '["/products/chicken-main.jpg", "/products/chicken-2.jpg"]'::jsonb,
  true
);

-- Tuna Product
-- ... similar structure
```

#### Product Sizes:
```sql
insert into product_sizes (product_id, size, price, sku) values
  ((select id from products where slug = 'halal-chicken-cat-food'), '400g', 25.00, 'CHK-400'),
  ((select id from products where slug = 'halal-chicken-cat-food'), '2kg', 95.00, 'CHK-2K'),
  ((select id from products where slug = 'halal-chicken-cat-food'), '5kg', 220.00, 'CHK-5K');
```

#### المطلوب:
- [ ] Products inserted
- [ ] Product sizes inserted
- [ ] Images uploaded to Storage
- [ ] Data verified

---

### 4️⃣ API Hooks (2 ساعات)

#### Products Hook:
```typescript
// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_sizes (*)
        `)
        .eq('in_stock', true)
        .order('featured', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_sizes (*)
        `)
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      return data
    }
  })
}
```

#### Orders Hook:
```typescript
// src/hooks/useOrders.ts
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData: any) => {
      // 1. Create customer (or get existing)
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .upsert({
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          email: orderData.email,
          phone: orderData.phone
        })
        .select()
        .single()
      
      if (customerError) throw customerError
      
      // 2. Generate order number
      const orderNumber = `ORD-${Date.now()}`
      
      // 3. Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_id: customer.id,
          customer_first_name: orderData.firstName,
          customer_last_name: orderData.lastName,
          customer_email: orderData.email,
          customer_phone: orderData.phone,
          delivery_address: orderData.address,
          delivery_city: orderData.city,
          delivery_emirate: orderData.emirate,
          notes: orderData.notes,
          subtotal: orderData.subtotal,
          shipping: 0,
          total: orderData.total,
          payment_method: 'cod'
        })
        .select()
        .single()
      
      if (orderError) throw orderError
      
      // 4. Create order items
      const orderItems = orderData.items.map((item: any) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        size: item.size,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      }))
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)
      
      if (itemsError) throw itemsError
      
      return { order, orderNumber }
    }
  })
}
```

#### Contact Hook:
```typescript
// src/hooks/useContact.ts
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (contactData: any) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  })
}
```

#### المطلوب:
- [ ] إنشاء `src/hooks/useProducts.ts`
- [ ] إنشاء `src/hooks/useOrders.ts`
- [ ] إنشاء `src/hooks/useContact.ts`
- [ ] Test all hooks

---

### 5️⃣ تحديث Components (2 ساعات)

#### Products Page:
```typescript
// Update src/pages/Products.tsx
import { useProducts } from '@/hooks/useProducts'

export default function Products() {
  const { data: products, isLoading } = useProducts()
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    // ... use products from API
  )
}
```

#### Product Detail:
```typescript
// Update src/pages/ProductDetail.tsx
import { useProduct } from '@/hooks/useProducts'

export default function ProductDetail() {
  const { slug } = useParams()
  const { data: product, isLoading } = useProduct(slug!)
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    // ... use product from API
  )
}
```

#### Checkout:
```typescript
// Update src/pages/Checkout.tsx
import { useCreateOrder } from '@/hooks/useOrders'

export default function Checkout() {
  const createOrder = useCreateOrder()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const result = await createOrder.mutateAsync({
        ...formData,
        items: cartItems,
        subtotal: getTotalPrice(),
        total: getTotalPrice()
      })
      
      alert(`Order placed! Order number: ${result.orderNumber}`)
      clearCart()
      navigate('/order-success')
    } catch (error) {
      alert('Error placing order')
    }
  }
  
  return (
    // ... form
  )
}
```

#### المطلوب:
- [ ] Update Products page
- [ ] Update ProductDetail page
- [ ] Update Checkout page
- [ ] Update Contact page
- [ ] Remove static data imports

---

### 6️⃣ Testing & Verification (1.5 ساعة)

#### Test Cases:
- [ ] Products load from Supabase
- [ ] Product detail loads correctly
- [ ] Orders are created successfully
- [ ] Order items are saved
- [ ] Contact form saves to database
- [ ] Error handling works
- [ ] Loading states work

#### المطلوب:
- [ ] Test all CRUD operations
- [ ] Verify data in Supabase Dashboard
- [ ] Check error handling
- [ ] Performance testing

---

## ✅ Checklist النهائية

### Supabase Setup:
- [ ] Account created
- [ ] Project created
- [ ] API keys configured
- [ ] Client initialized

### Database:
- [ ] All tables created
- [ ] Indexes added
- [ ] Sample data inserted
- [ ] RLS policies (optional)

### Code:
- [ ] `src/lib/supabase.ts`
- [ ] `src/hooks/useProducts.ts`
- [ ] `src/hooks/useOrders.ts`
- [ ] `src/hooks/useContact.ts`
- [ ] All pages updated
- [ ] Static data removed

### Testing:
- [ ] Products API works
- [ ] Orders API works
- [ ] Contact API works
- [ ] No errors in console
- [ ] Data persists correctly

---

## 📊 معايير الإنجاز

✅ **المرحلة مكتملة عندما:**
1. Supabase fully integrated
2. جميع البيانات من API
3. Orders تُحفظ بنجاح
4. No static data في الكود
5. Error handling implemented
6. All features tested

---

## 🎉 المشروع مكتمل!

بعد إكمال هذه المرحلة:
- ✅ جميع المراحل الستة مكتملة
- ✅ الموقع جاهز للإطلاق
- ✅ Backend متصل بالكامل

راجع `CHECKLIST.md` للتأكد من إكمال كل شيء!

---

**نسبة التقدم:** [░░░░░░░░░░] 0%
