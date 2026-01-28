# 📝 المرحلة 2: استخراج المحتوى

**الحالة:** ☐ لم تبدأ  
**الوقت المتوقع:** 4-6 ساعات  
**الأولوية:** ⭐⭐⭐⭐⭐

---

## 🎯 الأهداف

- [ ] استخراج جميع النصوص من HTML
- [ ] تنظيم المحتوى في ملفات JSON
- [ ] إنشاء content structure
- [ ] تجهيز البيانات الثابتة

---

## 📋 المهام التفصيلية

### 1️⃣ Hero Section Content (45 دقيقة)

#### النصوص المطلوبة:
```json
{
  "hero": {
    "mainHeadline": "For the Lives that Make Ours Whole",
    "subHeadline": "Premium Halal Cat Food",
    "description": "100% Halal cat food made with trusted ingredients to support your cat's health, nutrition, and Islamic values.",
    "trustBadge": "Trusted by 10,000+ cat parents",
    "cta": {
      "primary": "Shop Now",
      "secondary": "Learn More"
    },
    "badges": ["100% Natural", "Vet Approved", "Halal Certified"]
  }
}
```

#### المطلوب:
- [ ] إنشاء `src/data/hero.json`
- [ ] استخراج النصوص من HTML
- [ ] ترجمة للعربية (اختياري الآن)

---

### 2️⃣ Features Section (1 ساعة)

#### Features المطلوبة:
```json
{
  "features": [
    {
      "icon": "Heart",
      "title": "Made with Love",
      "description": "Every recipe crafted with care for your feline's happiness"
    },
    {
      "icon": "Leaf",
      "title": "100% Natural",
      "description": "No artificial preservatives, colors, or flavors"
    },
    {
      "icon": "Shield",
      "title": "Halal Certified",
      "description": "Certified halal ingredients according to Islamic standards"
    },
    {
      "icon": "Award",
      "title": "Premium Quality",
      "description": "Only the finest ingredients sourced globally"
    },
    {
      "icon": "Truck",
      "title": "Fast Delivery",
      "description": "Quick and reliable shipping across UAE"
    },
    {
      "icon": "CheckCircle",
      "title": "Satisfaction Guaranteed",
      "description": "30-day money-back guarantee"
    }
  ]
}
```

#### المطلوب:
- [ ] إنشاء `src/data/features.json`
- [ ] استخراج جميع الميزات
- [ ] مطابقة الأيقونات المناسبة

---

### 3️⃣ FAQs Content (45 دقيقة)

#### الأسئلة الشائعة:
```json
{
  "faqs": [
    {
      "question": "Is your cat food really 100% halal?",
      "answer": "Yes, all our products are certified halal..."
    },
    {
      "question": "What makes your cat food different?",
      "answer": "Our cat food is specially formulated..."
    },
    // ... المزيد
  ]
}
```

#### المطلوب:
- [ ] إنشاء `src/data/faqs.json`
- [ ] استخراج من HTML القديم
- [ ] إضافة 8-10 أسئلة شائعة

---

### 4️⃣ Testimonials (30 دقيقة)

#### شهادات العملاء:
```json
{
  "testimonials": [
    {
      "name": "Ahmed Al Mansouri",
      "location": "Dubai, UAE",
      "rating": 5,
      "comment": "My cat absolutely loves this food!",
      "image": "/testimonials/customer1.jpg"
    }
    // ... المزيد
  ]
}
```

#### المطلوب:
- [ ] إنشاء `src/data/testimonials.json`
- [ ] إضافة 5-6 شهادات
- [ ] تجهيز صور (أو placeholders)

---

### 5️⃣ About Us Content (1 ساعة)

#### محتوى About:
```json
{
  "about": {
    "mission": "To provide the highest quality halal cat food...",
    "vision": "To be the leading halal pet food provider...",
    "values": [
      "Quality First",
      "Islamic Values",
      "Customer Satisfaction"
    ],
    "story": "Hurayra Pet Foods was founded in..."
  }
}
```

#### المطلوب:
- [ ] إنشاء `src/data/about.json`
- [ ] استخراج من HTML
- [ ] كتابة نص متماسك

---

### 6️⃣ Contact Information (30 دقيقة)

#### معلومات الاتصال:
```json
{
  "contact": {
    "email": "info@hurayrapetfoods.ae",
    "phone": "+971 XX XXX XXXX",
    "whatsapp": "+971 XX XXX XXXX",
    "address": "Dubai, United Arab Emirates",
    "workingHours": "Sun-Thu: 9AM-6PM",
    "social": {
      "facebook": "https://facebook.com/...",
      "instagram": "https://instagram.com/...",
      "twitter": "https://twitter.com/..."
    }
  }
}
```

#### المطلوب:
- [ ] إنشاء `src/data/contact.json`
- [ ] تحديث المعلومات للإمارات
- [ ] إضافة روابط السوشيال ميديا

---

### 7️⃣ Footer Content (30 دقيقة)

#### بيانات Footer:
```json
{
  "footer": {
    "columns": [
      {
        "title": "Quick Links",
        "links": [
          { "text": "Home", "url": "/" },
          { "text": "Products", "url": "/products" },
          { "text": "About Us", "url": "/about" }
        ]
      },
      {
        "title": "Products",
        "links": [
          { "text": "Chicken Formula", "url": "/products/chicken" },
          { "text": "Tuna Formula", "url": "/products/tuna" }
        ]
      },
      {
        "title": "Support",
        "links": [
          { "text": "FAQ", "url": "/faq" },
          { "text": "Contact", "url": "/contact" },
          { "text": "Shipping", "url": "/shipping" }
        ]
      }
    ],
    "copyright": "© 2026 Hurayra Pet Foods UAE. All rights reserved.",
    "paymentMethods": ["visa", "mastercard", "cash"]
  }
}
```

#### المطلوب:
- [ ] إنشاء `src/data/footer.json`
- [ ] تنظيم الروابط
- [ ] إضافة طرق الدفع

---

### 8️⃣ Nutrition Information (45 دقيقة)

#### معلومات غذائية:
```json
{
  "nutrition": {
    "benefits": [
      "High in Protein",
      "Rich in Omega-3",
      "Essential Vitamins",
      "Natural Ingredients"
    ],
    "analysis": {
      "protein": "35%",
      "fat": "15%",
      "fiber": "3%",
      "moisture": "10%"
    }
  }
}
```

#### المطلوب:
- [ ] إنشاء `src/data/nutrition.json`
- [ ] استخراج البيانات الغذائية
- [ ] التأكد من الدقة

---

## 📁 هيكل الملفات المطلوبة

```
src/data/
├── hero.json
├── features.json
├── faqs.json
├── testimonials.json
├── about.json
├── contact.json
├── footer.json
└── nutrition.json
```

---

## ✅ Checklist النهائية

### Content Files Created:
- [x] `hero.json` - Hero section content
- [x] `features.json` - Features list
- [x] `faqs.json` - FAQ items
- [x] `testimonials.json` - Customer reviews
- [x] `about.json` - About us content
- [x] `contact.json` - Contact information
- [x] `footer.json` - Footer structure
- [x] `nutrition.json` - Nutritional info

### Content Quality:
- [ ] جميع النصوص واضحة ومفهومة
- [ ] لا توجد أخطاء إملائية
- [ ] المحتوى مناسب للسوق الإماراتي
- [ ] JSON valid (لا أخطاء syntax)

### Testing:
- [ ] يمكن استيراد جميع الملفات
- [ ] البيانات منظمة بشكل صحيح
- [ ] لا توجد معلومات مفقودة

---

## 📊 معايير الإنجاز

✅ **المرحلة مكتملة عندما:**
1. جميع ملفات JSON موجودة
2. المحتوى مستخرج بالكامل من HTML
3. البيانات منظمة ومتناسقة
4. لا توجد أخطاء في JSON
5. المحتوى جاهز للاستخدام في Components

---

## 🚀 الخطوة التالية

بعد إكمال هذه المرحلة، انتقل إلى:
```
PHASE_3_PRODUCTS.md
```

---

**نسبة التقدم:** [██████████] 100% ✅ **مكتملة!**
