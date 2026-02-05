# 🗄️ Database — تصميم قاعدة البيانات

**الغرض:** تحديد جداول وقاعدة البيانات لموقع Hurayra Pet Foods UAE.  
**آخر تحديث:** فبراير 2026

---

## 📋 نظرة عامة

بناءً على تحليل شامل للتطبيق الحالي، هذا الملف يحدد:
- جميع الجداول المطلوبة
- العلاقات بينها
- الـ schema (PostgreSQL/SQL)
- التوصيات التقنية

### قواعد البيانات المدعومة
- **PostgreSQL** (مُفضّل): دعم JSONB، أداء عالٍ
- **MySQL**: بديل متوافق

### 🌐 استراتيجية ثنائية اللغة (Bilingual AR/EN)

الموقع مترجم بالكامل (عربي/إنجليزي). تُخزَّن النصوص باللغتين في قاعدة البيانات.

**نمطان للتخزين:**
1. **أعمدة مزدوجة**: `name` + `name_ar` — للمعلومات البسيطة
2. **JSONB ثنائي اللغة**: `{ "en": "...", "ar": "..." }` — للمصفوفات والكائنات المعقدة

**القاعدة العامة:**
- أي نص يظهر للمستخدم يُخزَّن باللغتين
- الـ API يرجع النص حسب `?lang=ar` أو `Accept-Language`

---

## 📊 مخطط العلاقات (ER)

```
┌─────────────┐     ┌───────────────┐     ┌─────────────┐
│ admin_users │     │   products    │     │  blog_posts │
└─────────────┘     └───────┬───────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │product_sizes│
                    └─────────────┘

┌─────────────┐     ┌───────────────┐     ┌─────────────┐
│   orders    │────▶│  order_items  │◀────│  products   │
└──────┬──────┘     └───────────────┘     └─────────────┘
       │
       │ (customer_info inline أو customers table)

┌──────────────────┐  ┌────────────────────┐  ┌─────────────────┐
│ contact_messages │  │ newsletter_subs    │  │  site_content   │
└──────────────────┘  └────────────────────┘  └─────────────────┘

┌─────────────┐
│  settings   │
└─────────────┘
```

---

## 🗃️ الجداول والـ Schema

### 1. admin_users
مستخدمو لوحة التحكم (Admin).

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',  -- admin, super_admin
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
```

---

### 2. products
جدول المنتجات (Chicken, Tuna, Combo, …). **ثنائي اللغة.**

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- EN
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  -- AR
  name_ar VARCHAR(255),
  slug_ar VARCHAR(255),
  description_ar TEXT,
  --
  type VARCHAR(50) NOT NULL CHECK (type IN ('chicken', 'tuna', 'combo')),
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  -- ثنائي اللغة: [{ "en": "100% Halal Certified", "ar": "معتمد حلال 100٪" }, ...]
  features JSONB DEFAULT '[]',
  -- ثنائي اللغة: { "en": { "protein": "35%", ... }, "ar": { "protein": "35٪", ... } }
  nutritional_info JSONB DEFAULT '{}',
  -- ثنائي اللغة: [{ "en": "Chicken Meat", "ar": "لحم دجاج" }, ...]
  ingredients JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_slug_ar ON products(slug_ar) WHERE slug_ar IS NOT NULL;
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_in_stock ON products(in_stock);
```

**أمثلة لهيكل JSONB ثنائي اللغة:**
```json
// features
[{ "en": "100% Halal Certified", "ar": "معتمد حلال 100٪" }, { "en": "High Protein", "ar": "بروتين عالي" }]

// nutritional_info
{ "en": { "protein": "35%", "fat": "15%", "fiber": "3%", "moisture": "10%" }, "ar": { "protein": "35٪", "fat": "15٪", "fiber": "3٪", "moisture": "10٪" } }

// ingredients
[{ "en": "Chicken Meat (Halal Certified)", "ar": "لحم دجاج (معتمد حلال)" }, ...]
```

**ملاحظات:**
- `slug_ar` اختياري — يمكن الاعتماد على slug الإنجليزي للـ URL وتحديد اللغة من الـ Frontend
- `type` قابل للتوسع (lamb, goat, supplements)

---

### 3. product_sizes
مقاسات وأسعار كل منتج.

```sql
CREATE TABLE product_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(50) NOT NULL,             -- "900g", "1kg", "2kg"
  price DECIMAL(10, 2) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_product_sizes_sku ON product_sizes(sku);
```

---

### 4. orders
الطلبات.

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  -- بيانات العميل (inline لسهولة - العميل قد لا يكون مسجلاً)
  customer_first_name VARCHAR(100) NOT NULL,
  customer_last_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  -- عنوان التوصيل
  delivery_address TEXT NOT NULL,
  delivery_city VARCHAR(100) NOT NULL,
  delivery_emirate VARCHAR(100) NOT NULL,
  -- المبالغ
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  -- الحالة والدفع
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method VARCHAR(50) DEFAULT 'cash-on-delivery' CHECK (payment_method IN ('cash-on-delivery', 'card', 'bank-transfer')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON orders(order_number);
```

**ملاحظات:**
- لا يوجد `customer_id` إلزامي — الطلب يمكن أن يكون من ضيف
- يمكن إضافة `customer_id` كـ FK اختياري لربط الطلبات بالمستخدمين المسجلين لاحقاً

---

### 5. order_items
عناصر الطلب. يُحفَظ اسم المنتج باللغتين عند إنشاء الطلب (لإظهاره في الفواتير بلغة العميل).

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_name_ar VARCHAR(255),
  size VARCHAR(50) NOT NULL,
  sku VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

---

### 6. blog_categories
تصنيفات المدونة. **ثنائي اللغة.**

```sql
CREATE TABLE blog_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100),
  sort_order INTEGER DEFAULT 0
);

-- بيانات أولية
INSERT INTO blog_categories (id, name, name_ar, sort_order) VALUES
  ('nutrition', 'Nutrition', 'التغذية', 1),
  ('health', 'Health', 'الصحة', 2),
  ('care', 'Care', 'العناية', 3),
  ('tips', 'Tips', 'نصائح', 4),
  ('news', 'News', 'أخبار', 5);
```

---

### 7. blog_posts
مقالات المدونة. **ثنائي اللغة.**

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  -- EN
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  -- AR
  slug_ar VARCHAR(255),
  title_ar VARCHAR(255),
  excerpt_ar TEXT,
  content_ar TEXT,
  --
  category_id VARCHAR(50) NOT NULL REFERENCES blog_categories(id),
  author_name VARCHAR(255) NOT NULL,
  author_name_ar VARCHAR(255),
  author_role VARCHAR(100),
  author_role_ar VARCHAR(100),
  author_avatar VARCHAR(500),
  image VARCHAR(500) NOT NULL,
  publish_date DATE NOT NULL,
  read_time INTEGER DEFAULT 5,
  -- ثنائي اللغة: [{ "en": "Halal", "ar": "حلال" }, ...]
  tags JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_slug_ar ON blog_posts(slug_ar) WHERE slug_ar IS NOT NULL;
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_publish_date ON blog_posts(publish_date DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
```

---

### 8. contact_messages
رسائل نموذج التواصل.

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

---

### 9. newsletter_subscriptions
المشتركون في النشرة البريدية.

```sql
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
```

---

### 10. site_content
محتوى صفحات الموقع (CMS). **ثنائي اللغة.**

يُخزَّن كل محتوى صفحة كـ JSON مع دعم `en` و `ar`. الـ keys:
`hero`, `about`, `footer`, `contact`, `features`, `faqs`, `testimonials`, `nutrition`, `why-halal`

```sql
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key VARCHAR(100) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- أمثلة للـ keys:
-- hero, about, footer, contact, features, faqs, testimonials, nutrition, why_halal
```

**هيكل ثنائي اللغة — كل content_key يحتوي على:**
```json
{
  "en": {
    "mainHeadline": "For the Lives that Make Ours Whole",
    "subHeadline": "Premium Halal Cat Food",
    "description": "100% Halal cat food..."
  },
  "ar": {
    "mainHeadline": "لحياة تكمل حياتنا",
    "subHeadline": "طعام قطط حلال متميز",
    "description": "طعام قطط حلال 100٪..."
  }
}
```

**هيكل الصفحات (داخل كل من en و ar):**
- `hero`: mainHeadline, subHeadline, description, trustBadge, cta, badges, rating, images
- `about`: hero, story, mission, vision, values, whyChooseUs, certifications
- `footer`: logo, description, columns, newsletter, paymentMethods, trustBadges, copyright, socialMedia
- `contact`: hero, contactInfo, socialMedia, form, faqLink
- `features`: features (كل عنصر: title, description, icon — بلغتين أو ضمن en/ar)
- `faqs`: faqs (كل عنصر: question, answer — بلغتين)
- `testimonials`: testimonials (name, location, comment — بلغتين), stats
- `nutrition`: title, subtitle, benefits, guaranteedAnalysis, feedingGuide
- `why_halal`: hero, whatIsHalal, whyItMatters, meatDerivatives, islamSays, faq, cta, ...

**ملاحظة:** `images` والـ URLs لا تحتاج ترجمة. النصوص القابلة للعرض فقط تُترجم.

---

### 11. settings
إعدادات الموقع (متغير واحد أو عدة مفاتيح).

**خيار أ: جدول key-value**
```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**خيار ب: عمود واحد بـ JSON**
```sql
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- سجل واحد فقط، كل الإعدادات في data
```

**الحقول المتوقعة (من Admin Settings):**
- storeName, storeNameAr, tagline, taglineAr (إن وُجدت نصوص للعرض)
- email, phone, whatsapp, address
- facebook, instagram, twitter, tiktok
- freeShippingThreshold, shippingFee, currency, taxRate
- emailNotifications, orderNotifications, lowStockAlerts, customerMessages
- maintenanceMode, allowRegistration, showPrices

**ملاحظة ثنائية اللغة:** إن كانت أي إعدادات تعرض نصوصاً للمستخدم (مثل tagline)، أضف الحقل المقابل بالعربية.

---

## 📐 علاقات إضافية (اختيارية)

### customers (مشتق من الطلبات)
إذا أردت جدول عملاء منفصل للمحللين والتقارير:

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12, 2) DEFAULT 0,
  first_order_at TIMESTAMPTZ,
  last_order_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- يمكن ملؤه من orders عبر trigger أو job دوري
```

---

## 🔄 Triggers و Functions (اختياري)

### تحديث updated_at تلقائياً
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- نفس الفكرة لـ orders, blog_posts, admin_users, product_sizes
```

### توليد order_number
```sql
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION generate_order_number();
```

---

## 📊 التوصيات التقنية

### 1. قاعدة البيانات
- **PostgreSQL 14+** مُفضّل (JSONB، أداء، مجاني)
- استخدم connection pooling (مثل PgBouncer) في الإنتاج

### 2. التسمية
- أسماء الجداول والأعمدة: `snake_case`
- الـ IDs: `UUID` للجداول الرئيسية (أفضل للتوزيع والأمان)

### 3. التواريخ
- استخدم `TIMESTAMPTZ` (مع timezone) دائماً
- Default: `NOW()` أو `CURRENT_TIMESTAMP`

### 4. JSONB
- للمصفوفات والنصوص المتغيرة: `features`, `ingredients`, `tags`, `content`
- إنشاء GIN index على أعمدة JSONB المستخدمة كثيراً في البحث:
  ```sql
  CREATE INDEX idx_products_features_gin ON products USING GIN (features);
  ```

### 5. النسخ الاحتياطي
- Backup يومي تلقائي
- Retention: أسبوع واحد على الأقل

### 6. الهجرة (Migrations)
- استخدم **Prisma Migrate** أو **Knex.js** أو **node-pg-migrate**
- لا تُنفّذ تغييرات يدوية على الإنتاج دون migration

---

## 📋 خطة الهجرة من البيانات الحالية

### 1. المنتجات
- نقل من `src/data/products.ts` إلى `products` و `product_sizes`
- رفع الصور من `public/imgs/products` إلى مجلد الـ uploads أو CDN
- تحديث مسارات الصور في `images` JSONB

### 2. المقالات
- نقل من `src/data/blogs.ts` إلى `blog_posts` و `blog_categories`

### 3. المحتوى
- نقل من `src/data/*.json` (hero, about, footer, …) إلى `site_content`
- كل ملف = سطر واحد في `site_content` مع `content_key` و `content` JSONB

### 4. الإعدادات
- نقل من `src/lib/constants.ts` و Admin Settings إلى `settings`

### 5. الطلبات
- إذا وُجدت بيانات في Zustand persist (localStorage)، يمكن استيرادها يدوياً أو تجاهلها

### 6. المحتوى ثنائي اللغة
- نقل النصوص الإنجليزية من `src/data/*.json` إلى الحقول `en`
- إضافة الترجمة العربية من `src/locales/ar/` أو من ملفات المحتوى العربي إن وُجدت
- للصفحات التي تستخدم i18n للواجهة فقط: تأكد من فصل "محتوى الصفحة" (من DB) عن "نصوص الواجهة" (من locales)

---

## ✅ Checklist إنشاء قاعدة البيانات

- [ ] إنشاء Database
- [ ] تشغيل migrations للجداول
- [ ] إدراج بيانات أولية (blog_categories، admin user)
- [ ] نقل المنتجات والمحتوى
- [ ] إنشاء Indexes
- [ ] إعداد Backup
- [ ] اختبار الاتصال من الـ Backend

---

**ملاحظة:** هذا الملف مكمل لـ `NODEJS_BACKEND.md` — راجع الـ API والمنطق هناك لضمان توافق الـ schema مع احتياجات الـ Backend.
