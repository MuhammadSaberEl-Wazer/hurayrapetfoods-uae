# 🖥️ Node.js Backend — خطة التطوير والمواصفات

**الغرض:** بناء سيرفر Node.js للتحكم الكامل في محتوى الموقع، الطلبات، والعملاء.  
**آخر تحديث:** فبراير 2026

---

## 📋 نظرة عامة

بناءً على تحليل شامل للتطبيق الحالي (Hurayra Pet Foods UAE)، هذا الملف يحدد ما يجب بناؤه في Node.js مع التوصيات التقنية.

### الوضع الحالي
- Frontend: React + Vite + TypeScript
- البيانات: JSON ثابتة وملفات TS
- الطلبات: Zustand + localStorage (لا persistence حقيقي)
- Auth: localStorage فقط (admin)
- النماذج: Contact، Newsletter، Checkout — كلها mock

### الهدف
- سيرفر Node.js يوفر REST API كامل
- إدارة محتوى الموقع بالكامل من الـ Admin
- تخزين الطلبات والعملاء في قاعدة بيانات
- Auth حقيقي للإدمن
- **دعم كامل للتخزين والإرجاع بالعربية والإنجليزية** (الموقع مترجم)

---

## 🌐 دعم اللغات (Bilingual AR/EN)

الموقع مترجم بالكامل. الـ API يجب أن يدعم إرجاع المحتوى باللغة المطلوبة.

### تحديد اللغة في الطلبات
- **Query parameter**: `?lang=ar` أو `?lang=en`
- **Header**: `Accept-Language: ar` أو `Accept-Language: en`
- **الأولوية**: `lang` query أولاً، ثم `Accept-Language`، ثم fallback إلى `en`

### الـ Endpoints المتأثرة
| Endpoint | السلوك |
|----------|--------|
| `GET /api/products` | يرجع name, description, features, ... حسب اللغة |
| `GET /api/products/:slug` | نفس الشيء |
| `GET /api/blogs` | يرجع title, excerpt حسب اللغة |
| `GET /api/blogs/:slug` | يرجع title, excerpt, content حسب اللغة |
| `GET /api/content/:key` | يرجع المحتوى الكامل للصفحة حسب اللغة |
| `POST /api/orders` | يقبل `lang` في الـ body؛ يُخزَّن product_name و product_name_ar في order_items |

### Admin API
- عند **الحفظ** (POST/PUT): يقبل الحقول باللغتين معاً، مثلاً:
  ```json
  { "name": "Premium Chicken", "name_ar": "دجاج متميز", "description": "...", "description_ar": "..." }
  ```
- عند **القراءة** (GET): يرجع كل الحقول (en + ar) للإدمن لتحريرها

### ملاحظة للـ Frontend
- Frontend يرسل `lang` من i18n الحالي (`i18n.language`)
- مثال: `fetch('/api/products?lang=' + i18n.language)`

---

## 🏗️ البنية المقترحة

```
hurayrapetfoods-backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── auth.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── products.controller.js
│   │   ├── orders.controller.js
│   │   ├── content.controller.js
│   │   ├── blog.controller.js
│   │   ├── contact.controller.js
│   │   ├── newsletter.controller.js
│   │   ├── auth.controller.js
│   │   └── settings.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── upload.middleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── (schema references)
│   ├── routes/
│   │   ├── api.routes.js
│   │   └── admin.routes.js
│   ├── services/
│   │   ├── order.service.js
│   │   └── notification.service.js
│   └── app.js
├── uploads/
├── .env
├── package.json
└── README.md
```

---

## 🔌 الـ API Endpoints المطلوبة

### 1. Public API (بدون Auth)

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/products` | قائمة المنتجات (مع فلترة type, featured, inStock) |
| GET | `/api/products/:slug` | تفاصيل منتج واحد |
| GET | `/api/blogs` | قائمة المقالات (pagination, category) |
| GET | `/api/blogs/:slug` | مقال واحد |
| GET | `/api/content/:key` | محتوى صفحة (hero, about, footer, features, faqs, testimonials, nutrition, why-halal, contact) |
| POST | `/api/contact` | إرسال رسالة تواصل |
| POST | `/api/newsletter` | تسجيل بريد في النشرة |
| POST | `/api/orders` | إنشاء طلب (Checkout) |

### 2. Admin API (يتطلب Auth)

#### المنتجات
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/admin/products` | قائمة المنتجات (إدارة) |
| POST | `/admin/products` | إضافة منتج |
| PUT | `/admin/products/:id` | تحديث منتج |
| DELETE | `/admin/products/:id` | حذف منتج |
| POST | `/admin/products/:id/images` | رفع صور منتج |

#### الطلبات
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/admin/orders` | قائمة الطلبات (فلترة، بحث، pagination) |
| GET | `/admin/orders/:id` | تفاصيل طلب |
| PATCH | `/admin/orders/:id/status` | تحديث حالة الطلب |

#### المدونة
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/admin/blogs` | قائمة المقالات |
| POST | `/admin/blogs` | إضافة مقال |
| PUT | `/admin/blogs/:id` | تحديث مقال |
| DELETE | `/admin/blogs/:id` | حذف مقال |

#### المحتوى (CMS)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/admin/content` | كل محتويات الموقع |
| GET | `/admin/content/:key` | محتوى صفحة محددة |
| PUT | `/admin/content/:key` | تحديث محتوى صفحة |

#### الإعدادات
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/admin/settings` | إعدادات الموقع |
| PUT | `/admin/settings` | تحديث الإعدادات |

#### الرسائل والعملاء
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/admin/contact-messages` | رسائل التواصل |
| PATCH | `/admin/contact-messages/:id/status` | تحديث حالة الرسالة |
| GET | `/admin/newsletter` | قائمة المشتركين |
| GET | `/admin/customers` | قائمة العملاء (مشتقة من الطلبات) |

#### Auth
| Method | Endpoint | الوصف |
|--------|----------|-------|
| POST | `/admin/auth/login` | تسجيل دخول |
| POST | `/admin/auth/logout` | تسجيل خروج |
| GET | `/admin/auth/me` | بيانات المستخدم الحالي |
| POST | `/admin/auth/refresh` | تجديد التوكن |

---

## 📦 المكتبات والتقنيات المقترحة

| الغرض | المكتبة | السبب |
|-------|---------|-------|
| Framework | **Express.js** | شائع، مرن، مجتمع كبير |
| ORM/DB | **Prisma** أو **Sequelize** | يعمل مع PostgreSQL/MySQL، TypeScript support |
| Auth | **JWT** (jsonwebtoken) + **bcrypt** | Stateless، مناسب لـ SPA |
| Validation | **Zod** أو **Joi** | تحقق من الـ request body |
| File Upload | **Multer** | رفع الملفات |
| Storage | **本地 uploads/** أو **AWS S3** | تخزين الصور |
| CORS | **cors** | السماح للـ Frontend |
| Env | **dotenv** | متغيرات البيئة |
| Logging | **Pino** أو **Winston** | سجلات واضحة |
| Security | **helmet** | رؤوس أمان |
| Rate Limit | **express-rate-limit** | حماية من الهجمات |

### بديل: NestJS
- إذا أردت بنية أكثر تنظيماً وتوسعاً
- دعم DI، Decorators، بنية أقرب لـ Angular

---

## 🔐 المصادقة (Auth)

### التدفق المقترح
1. Admin يدخل email/password → `/admin/auth/login`
2. السيرفر يتحقق، يعيد `accessToken` (JWT) + `refreshToken` (اختياري)
3. الـ Frontend يحفظ التوكن في `httpOnly` cookie أو `localStorage`
4. كل طلب Admin يتضمن: `Authorization: Bearer <accessToken>`
5. Middleware يتحقق من التوكن ويضيف المستخدم للـ request

### توصيات
- استخدم `httpOnly` cookie للـ refresh token (أكثر أماناً)
- صلاحية access token قصيرة (15–30 دقيقة)
- استخدم bcrypt لتجزئة كلمات المرور
- احفظ sessions أو قائمة blacklist للـ tokens الملغاة (اختياري)

---

## 📤 رفع الملفات (File Upload)

### المنتجات
- صور المنتجات: رفع متعدد، حفظ paths في DB
- مقاسات الصور: thumbnail (400x400)، medium (800x800)، large (1200x1200) — اختياري

### المدونة
- صورة المقال: صورة واحدة رئيسية
- صورة الكاتب: avatar URL أو رفع

### التوصية
- استخدم مجلد `uploads/` محلي في البداية
- عند التوسع: تكامل مع **Cloudinary** أو **AWS S3**
- التحقق من نوع الملف (jpg, png, webp فقط)
- حد أقصى لحجم الملف: 5MB للصورة الواحدة

---

## 🔔 الإشعارات والتكاملات (اختياري لاحقاً)

| التكامل | الغرض |
|---------|-------|
| **Email (Nodemailer)** | إرسال تأكيد الطلب للعميل، إشعار طلب جديد للإدمن |
| **WhatsApp Business API** | إشعار الطلبات (كما يظهر في Checkout: "We'll contact you via WhatsApp") |
| **Webhook** | ربط مع أنظمة خارجية |

---

## 📐 معايير الـ API

### Request/Response Format
```json
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 10 }  // للـ pagination
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [ { "field": "email", "message": "Invalid email" } ]
  }
}
```

### Pagination
- Query: `?page=1&limit=20`
- Default limit: 20
- Max limit: 100

### Sorting
- Query: `?sort=createdAt&order=desc`
- للطلبات: `?sort=createdAt&order=desc` (الأحدث أولاً)

### Filtering
- المنتجات: `?type=chicken&featured=true&inStock=true`
- الطلبات: `?status=pending`
- المقالات: `?category=nutrition`

### Language (Bilingual)
- Query: `?lang=ar` أو `?lang=en`
- Header: `Accept-Language: ar` أو `Accept-Language: en`
- Default: `en` إذا لم يُحدد

---

## 🛡️ الأمان

1. **CORS**: السماح فقط لـ domain الـ Frontend (مثلاً `https://hurayrapetfood.ae`)
2. **Rate Limiting**: 100 طلب/15 دقيقة للـ Public، 200 للـ Admin
3. **Validation**: التحقق من كل الـ input باستخدام Zod/Joi
4. **SQL Injection**: استخدام ORM (Prisma/Sequelize) يقلل المخاطر
5. **XSS**: عدم تخزين HTML غير موثوق، استخدام Content-Security-Policy
6. **Helmet**: تفعيل رؤوس الأمان

---

## 🚀 خطة التنفيذ المقترحة

### المرحلة 1: الأساسيات (أسبوع 1)
- [ ] إعداد مشروع Node.js + Express
- [ ] ربط قاعدة البيانات (PostgreSQL)
- [ ] إنشاء جداول الـ DB (انظر `DATABASE.md`)
- [ ] Auth: تسجيل دخول/خروج Admin
- [ ] Middleware: التحقق من التوكن

### المرحلة 2: المنتجات والطلبات (أسبوع 2)
- [ ] CRUD المنتجات
- [ ] رفع صور المنتجات
- [ ] إنشاء الطلبات (Public API)
- [ ] إدارة الطلبات (Admin)

### المرحلة 3: المحتوى والمدونة (أسبوع 3)
- [ ] API محتوى الموقع (hero, about, footer, …)
- [ ] CRUD المدونة
- [ ] Contact form
- [ ] Newsletter subscription

### المرحلة 4: الإعدادات والإشعارات (أسبوع 4)
- [ ] إعدادات الموقع
- [ ] إشعارات الطلبات (Email/WhatsApp إن أمكن)
- [ ] تصدير الطلبات والتقارير (CSV/Excel)
- [ ] تحسينات وتنظيف الكود

---

## 📁 هيكل مشروع الـ Backend

```
code/
├── FE/                 # الـ Frontend الحالي
└── BE/                 # الـ Backend الجديد
    ├── src/
    ├── uploads/
    ├── .env.example
    ├── package.json
    └── README.md
```

---

## 🔗 ربط الـ Frontend بالـ Backend

### تغييرات في الـ Frontend
1. إضافة `VITE_API_URL` في `.env` (مثل `http://localhost:3001/api`)
2. استبدال البيانات الثابتة بـ `fetch` أو `axios` للـ API
3. إرسال `Authorization: Bearer <token>` في طلبات Admin
4. تحديث Zustand stores لاستخدام الـ API بدلاً من localStorage
5. **إرسال `lang`** مع كل طلب محتوى: `?lang=${i18n.language}` أو في headers

### CORS
- السماح لـ `http://localhost:5173` (Vite dev) و `https://hurayrapetfood.ae` (production)

---

## ✅ التوصيات النهائية

1. **دعم ثنائي اللغة من اليوم الأول**: تأكد أن كل endpoint للمحتوى يقبل `lang` ويرجع النص المناسب. لا تؤجل ذلك.
2. **ابدأ بـ REST**، تجنب GraphQL في المرحلة الأولى لتبسيط التطوير.
3. **استخدم Prisma** إذا كان الفريق مرتاحاً لـ TypeScript في الـ Backend.
4. **قسّم الـ API** إلى public و admin بوضوح.
5. **اكتب توثيق الـ API** (مثلاً Swagger/OpenAPI) مبكراً.
6. **اختبارات**: على الأقل اختبارات تكامل للـ endpoints الحرجة (orders، auth).
7. **Docker**: ضع السيرفر وقاعدة البيانات في `docker-compose` لتسهيل النشر والتطوير.

---

**ملاحظة:** هذا الملف مكمل لـ `DATABASE.md` — راجع الـ schema والجداول هناك قبل البدء بالتطوير.
