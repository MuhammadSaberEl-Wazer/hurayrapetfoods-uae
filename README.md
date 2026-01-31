# Hurayra Pet Foods UAE

موقع Hurayra Pet Foods - طعام قطط حلال فاخر في الإمارات.

## التقنيات

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router** + **Zustand**
- جاهز لربط **Supabase** لاحقاً

## التشغيل محلياً

```bash
pnpm install
pnpm dev
```

التطبيق يعمل على: http://localhost:8080

## البناء والنشر

```bash
pnpm build
pnpm preview   # معاينة الـ build
```

النشر على Vercel أو أي استضافة ستاتيك يدعم SPA (مع إعداد rewrites لـ `/index.html`).

## هيكل المشروع

- `src/pages` — الصفحات (الرئيسية، المنتجات، السلة، الحساب، إلخ)
- `src/components` — المكونات المشتركة
- `src/store` — حالة التطبيق (سلة، مصادقة، طلبات)
- `src/data` — بيانات ثابتة ومنتجات
- `PROJECT_PLAN` — خطة التطوير والـ checklist

## الروابط المهمة

- [خطة المشروع](PROJECT_PLAN/README.md)
- [قائمة المهام](PROJECT_PLAN/CHECKLIST.md)
