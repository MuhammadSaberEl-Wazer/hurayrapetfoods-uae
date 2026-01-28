# 📄 المرحلة 5: الصفحات الإضافية

**الحالة:** ✅ مكتملة  
**الوقت المتوقع:** 6-8 ساعات  
**الأولوية:** ⭐⭐⭐⭐  
**تاريخ البداية:** 2026-01-28  
**تاريخ الانتهاء:** 2026-01-28

---

## 🎯 الأهداف

- [ ] بناء About Page
- [ ] بناء Contact Page
- [ ] تحديث Footer
- [ ] تحديث Navigation
- [ ] إضافة Policy Pages

---

## 📋 المهام التفصيلية

### 1️⃣ About Page (2 ساعة)

#### Sections المطلوبة:
1. Hero Section
2. Our Story
3. Mission & Vision
4. Values
5. Why Choose Us
6. Team (optional)

#### Page Structure:
```tsx
// src/pages/About.tsx
export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-causten font-bold mb-4">About Hurayra Pet Foods</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Providing premium halal cat food with love and care since 2020
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hurayra Pet Foods was founded with a simple mission: to provide Muslim 
              pet owners with high-quality, halal-certified cat food that meets both 
              nutritional excellence and Islamic dietary requirements.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Named after Abu Hurayrah, the beloved companion of Prophet Muhammad (PBUH) 
              known for his love of cats, we honor this legacy by creating products that 
              reflect our commitment to quality, compassion, and faith.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-gray-700">
                To provide the highest quality halal cat food that nourishes pets 
                while respecting Islamic values and supporting Muslim pet owners 
                across the UAE.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold mb-4 text-secondary">Our Vision</h3>
              <p className="text-gray-700">
                To be the leading provider of halal pet food in the Middle East, 
                setting the standard for quality, ethics, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-teal-light/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Hurayra?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {reasons.map((reason, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <CheckCircle className="w-10 h-10 text-primary mb-3" />
                <h4 className="font-bold mb-2">{reason.title}</h4>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/pages/About.tsx`
- [ ] إنشاء `src/data/about.ts` (content)
- [ ] إضافة صور مناسبة
- [ ] Responsive design

---

### 2️⃣ Contact Page (2 ساعة)

#### Sections المطلوبة:
1. Hero
2. Contact Form
3. Contact Information
4. Map (optional)
5. Social Links

#### Page Structure:
```tsx
// src/pages/Contact.tsx
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send to Supabase later
    console.log('Contact form:', formData)
    alert('Thank you! We will get back to you soon.')
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-causten font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you!</p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full border rounded px-4 py-3"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full border rounded px-4 py-3"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border rounded px-4 py-3"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  className="w-full border rounded px-4 py-3"
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={6}
                  className="w-full border rounded px-4 py-3"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-teal-dark transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:info@hurayrapetfoods.ae" className="text-gray-600 hover:text-primary">
                      info@hurayrapetfoods.ae
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a href="tel:+971XXXXXXXX" className="text-gray-600 hover:text-primary">
                      +971 XX XXX XXXX
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <MessageCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">WhatsApp</h3>
                    <a href="https://wa.me/971XXXXXXXX" className="text-gray-600 hover:text-primary">
                      +971 XX XXX XXXX
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-gray-600">
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Working Hours</h3>
                    <p className="text-gray-600">
                      Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                      Friday - Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```

#### المطلوب:
- [ ] إنشاء `src/pages/Contact.tsx`
- [ ] Contact form with validation
- [ ] Contact information display
- [ ] Social media links
- [ ] Form submission handling

---

### 3️⃣ Footer Update (1.5 ساعة)

#### Footer Sections:
1. Company Info
2. Quick Links
3. Products
4. Support
5. Contact Info
6. Newsletter Signup
7. Payment Methods
8. Social Media

#### المطلوب:
- [ ] تحديث `src/components/Footer.tsx`
- [ ] إضافة جميع الروابط
- [ ] Newsletter form
- [ ] Payment icons
- [ ] Social links

---

### 4️⃣ Navigation Update (1 ساعة)

#### Header Links:
```tsx
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/#faq' }
]
```

#### المطلوب:
- [ ] تحديث `src/components/Header.tsx`
- [ ] إضافة جميع الروابط
- [ ] Active state للصفحة الحالية
- [ ] Mobile menu

---

### 5️⃣ Policy Pages (1.5 ساعة)

#### Pages المطلوبة:
1. Privacy Policy
2. Terms & Conditions
3. Shipping & Delivery
4. Return & Refund Policy

#### المطلوب:
- [ ] إنشاء `src/pages/PrivacyPolicy.tsx`
- [ ] إنشاء `src/pages/Terms.tsx`
- [ ] إنشاء `src/pages/Shipping.tsx`
- [ ] إنشاء `src/pages/Returns.tsx`
- [ ] كتابة المحتوى الأساسي

---

## ✅ Checklist النهائية

### Pages Created:
- [ ] `src/pages/About.tsx`
- [ ] `src/pages/Contact.tsx`
- [ ] `src/pages/PrivacyPolicy.tsx`
- [ ] `src/pages/Terms.tsx`
- [ ] `src/pages/Shipping.tsx`
- [ ] `src/pages/Returns.tsx`

### Components Updated:
- [ ] `src/components/Header.tsx` (navigation)
- [ ] `src/components/Footer.tsx` (complete)
- [ ] `src/components/ContactForm.tsx` (if separate)

### Content:
- [ ] About page content complete
- [ ] Contact information accurate
- [ ] Policy pages written
- [ ] Footer links all working

### Routes:
- [ ] `/about` route
- [ ] `/contact` route
- [ ] `/privacy` route
- [ ] `/terms` route
- [ ] `/shipping` route
- [ ] `/returns` route

---

## 📊 معايير الإنجاز

✅ **المرحلة مكتملة عندما:**
1. جميع الصفحات تعمل
2. Navigation يعمل بشكل صحيح
3. Footer محدّث ومكتمل
4. Contact form functional
5. All links working
6. Responsive design

---

## 🚀 الخطوة التالية

بعد إكمال هذه المرحلة، انتقل إلى:
```
PHASE_6_SUPABASE.md
```

---

**نسبة التقدم:** [░░░░░░░░░░] 0%
