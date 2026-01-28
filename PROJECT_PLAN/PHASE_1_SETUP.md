# 🔧 المرحلة 1: الإعداد والتجهيز

**الحالة:** ☐ لم تبدأ  
**الوقت المتوقع:** 2-3 ساعات  
**الأولوية:** ⭐⭐⭐⭐⭐

---

## 🎯 الأهداف

- [ ] استخراج الألوان من الموقع القديم
- [ ] إعداد الخطوط المخصصة
- [ ] تثبيت المكتبات المطلوبة
- [ ] إنشاء ملفات الـ constants
- [ ] تحديث Tailwind config

---

## 📋 المهام التفصيلية

### 1️⃣ الألوان (30 دقيقة)

#### الألوان المستخرجة من HTML:
```css
--primary: #008080        /* Teal - اللون الرئيسي */
--secondary: #722F37      /* Burgundy - اللون الثانوي */
--accent: #C8A029         /* Gold - لون التمييز */
--pink: #D46681           /* Pink */
--teal-light: #60BABF     /* Light Teal */
--teal-dark: #035F5D      /* Dark Teal */
--white: #FFFFFF
--gray: #EFEFEF
--gray-light: #F0F5FA
--gray-dark: #334155
--black: #000002
```

#### المطلوب:
- [ ] إنشاء ملف `src/lib/colors.ts`
- [ ] تحديث `tailwind.config.ts`
- [ ] تحديث `src/index.css` مع CSS variables

---

### 2️⃣ الخطوط (30 دقيقة)

#### الخطوط المطلوبة:
1. **Causten Round** - Primary font
2. **Montserrat** - Secondary font

#### المطلوب:
- [ ] تحميل Causten Round fonts
- [ ] إضافة Montserrat من Google Fonts
- [ ] تحديث `src/index.css`
- [ ] إنشاء ملف `src/styles/fonts.css`

---

### 3️⃣ المكتبات (20 دقيقة)

#### المكتبات المطلوبة:
```bash
# State Management
pnpm add zustand

# Routing (إذا لم تكن موجودة)
pnpm add react-router-dom

# Forms
pnpm add react-hook-form zod @hookform/resolvers

# Icons (إضافية)
pnpm add lucide-react

# Utilities
pnpm add clsx tailwind-merge
```

#### المطلوب:
- [ ] تثبيت جميع المكتبات
- [ ] التحقق من package.json
- [ ] اختبار التشغيل (`pnpm dev`)

---

### 4️⃣ Constants Files (40 دقيقة)

#### الملفات المطلوب إنشاؤها:

**`src/lib/colors.ts`**
```typescript
export const colors = {
  primary: '#008080',
  secondary: '#722F37',
  accent: '#C8A029',
  // ... إلخ
}
```

**`src/lib/constants.ts`**
```typescript
export const SITE_NAME = 'Hurayra Pet Foods UAE'
export const CONTACT_EMAIL = 'info@hurayrapetfoods.ae'
// ... إلخ
```

**`src/lib/types.ts`**
```typescript
export interface Product {
  id: string
  name: string
  type: 'chicken' | 'tuna'
  // ... إلخ
}
```

#### المطلوب:
- [ ] إنشاء `src/lib/colors.ts`
- [ ] إنشاء `src/lib/constants.ts`
- [ ] إنشاء `src/lib/types.ts`

---

### 5️⃣ Tailwind Config (30 دقيقة)

#### المطلوب تحديثه:
```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#008080',
        secondary: '#722F37',
        // ... من ملف colors.ts
      },
      fontFamily: {
        'causten': ['Causten Round', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    }
  }
}
```

#### المطلوب:
- [ ] تحديث `tailwind.config.ts`
- [ ] إضافة الألوان الجديدة
- [ ] إضافة الخطوط
- [ ] اختبار التغييرات

---

## ✅ Checklist النهائية

### Files to Create:
- [x] `src/lib/colors.ts`
- [x] `src/lib/constants.ts`
- [x] `src/lib/types.ts`
- [x] `src/styles/fonts.css`

### Files to Update:
- [x] `tailwind.config.ts`
- [x] `src/index.css`
- [x] `package.json` (dependencies)

### Testing:
- [x] `pnpm dev` يعمل بدون أخطاء
- [x] الألوان الجديدة تظهر بشكل صحيح
- [x] الخطوط تُحمّل بشكل صحيح

---

## 📊 معايير الإنجاز

✅ **المرحلة مكتملة عندما:**
1. جميع الألوان متوفرة في Tailwind
2. الخطوط تعمل بشكل صحيح
3. جميع المكتبات مثبتة
4. لا توجد أخطاء في Console
5. المشروع يعمل بسلاسة

---

## 🚀 الخطوة التالية

بعد إكمال هذه المرحلة، انتقل إلى:
```
PHASE_2_CONTENT.md
```

---

**نسبة التقدم:** [██████████] 100% ✅ **مكتملة!**
