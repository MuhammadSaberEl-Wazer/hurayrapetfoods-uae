export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  category: 'nutrition' | 'health' | 'care' | 'tips' | 'news';
  categoryAr: string;
  author: {
    name: string;
    nameAr: string;
    avatar: string;
    role: string;
    roleAr: string;
  };
  image: string;
  publishDate: string;
  readTime: number; // in minutes
  tags: string[];
  tagsAr: string[];
  featured: boolean;
}

export const blogCategories = [
  { id: 'nutrition', name: 'Nutrition', nameAr: 'التغذية' },
  { id: 'health', name: 'Health', nameAr: 'الصحة' },
  { id: 'care', name: 'Care', nameAr: 'العناية' },
  { id: 'tips', name: 'Tips', nameAr: 'نصائح' },
  { id: 'news', name: 'News', nameAr: 'أخبار' },
];

export const blogs: BlogPost[] = [
  {
    id: '1',
    slug: 'importance-of-halal-cat-food',
    title: 'The Importance of Halal Cat Food for Muslim Pet Owners',
    titleAr: 'أهمية طعام القطط الحلال لأصحاب الحيوانات الأليفة المسلمين',
    excerpt: 'Discover why halal certification matters when choosing food for your beloved cat and how it aligns with Islamic values.',
    excerptAr: 'اكتشف لماذا تهم شهادة الحلال عند اختيار طعام قطتك المحبوبة وكيف تتماشى مع القيم الإسلامية.',
    content: `
# The Importance of Halal Cat Food for Muslim Pet Owners

As Muslim pet owners, we strive to ensure that every aspect of our lives aligns with Islamic principles, including the care of our beloved pets. One crucial aspect that often gets overlooked is the food we provide for our cats.

## What Makes Cat Food Halal?

Halal cat food is prepared according to Islamic dietary laws. This means:
- No pork or pork-derived ingredients
- Meat sourced from animals slaughtered according to Islamic guidelines
- No alcohol or intoxicating substances
- No harmful or forbidden ingredients

## Why Choose Halal Cat Food?

### 1. Peace of Mind
Knowing that your cat's food meets halal standards brings spiritual comfort and aligns with your values as a Muslim.

### 2. Quality Assurance
Halal certification often indicates higher quality standards, as the production process is closely monitored.

### 3. Nutritional Excellence
Our halal-certified cat food at Hurayra Pet Foods is not just halal—it's also grain-free, high in protein, and made with real chicken or tuna.

### 4. Supporting Ethical Practices
By choosing halal products, you support ethical treatment of animals throughout the supply chain.

## The Hurayra Difference

At Hurayra Pet Foods, we understand the importance of providing halal options for Muslim pet owners in the UAE. Our products are:
- 100% Halal Certified
- Made with premium ingredients
- Grain-free formulas
- High in protein for optimal feline health
- Available in delicious chicken and tuna varieties

## Making the Switch

Transitioning your cat to halal food is simple. Start by mixing small amounts with their current food and gradually increase the proportion over 7-10 days.

Your cat's health and your peace of mind go hand in hand. Choose Hurayra Pet Foods for quality halal nutrition.
    `,
    contentAr: `
# أهمية طعام القطط الحلال لأصحاب الحيوانات الأليفة المسلمين

كأصحاب حيوانات أليفة مسلمين، نسعى لضمان أن كل جانب من جوانب حياتنا يتماشى مع المبادئ الإسلامية، بما في ذلك رعاية حيواناتنا الأليفة المحبوبة.

## ما الذي يجعل طعام القطط حلالاً؟

طعام القطط الحلال يُحضّر وفقاً للقوانين الغذائية الإسلامية:
- لا يحتوي على لحم خنزير أو مشتقاته
- اللحوم من حيوانات ذُبحت وفق الشريعة الإسلامية
- خالٍ من الكحول أو المواد المسكرة
- لا يحتوي على مكونات ضارة أو محرمة

## لماذا تختار طعام القطط الحلال؟

### 1. راحة البال
معرفة أن طعام قطتك يلبي معايير الحلال يجلب الراحة الروحية ويتماشى مع قيمك كمسلم.

### 2. ضمان الجودة
شهادة الحلال غالباً ما تشير إلى معايير جودة أعلى، حيث يتم مراقبة عملية الإنتاج عن كثب.

### 3. التميز الغذائي
طعام القطط الحلال المعتمد في Hurayra Pet Foods ليس حلالاً فقط - إنه أيضاً خالٍ من الحبوب، غني بالبروتين، ومصنوع من الدجاج أو التونة الحقيقية.

### 4. دعم الممارسات الأخلاقية
باختيار منتجات حلال، أنت تدعم المعاملة الأخلاقية للحيوانات في سلسلة التوريد.

## ميزة حريرة

في Hurayra Pet Foods، ندرك أهمية توفير خيارات حلال لأصحاب الحيوانات الأليفة المسلمين في الإمارات. منتجاتنا:
- معتمدة حلال 100٪
- مصنوعة من مكونات ممتازة
- تركيبات خالية من الحبوب
- غنية بالبروتين لصحة القطط المثلى
- متوفرة بنكهات الدجاج والتونة اللذيذة

اختر Hurayra Pet Foods للتغذية الحلال عالية الجودة.
    `,
    category: 'nutrition',
    categoryAr: 'التغذية',
    author: {
      name: 'Dr. Ahmed Al-Mansoori',
      nameAr: 'د. أحمد المنصوري',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
      role: 'Veterinary Nutritionist',
      roleAr: 'أخصائي تغذية بيطرية',
    },
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=90&fit=crop',
    publishDate: '2026-01-15',
    readTime: 5,
    tags: ['Halal', 'Nutrition', 'Islamic Values', 'Cat Care'],
    tagsAr: ['حلال', 'تغذية', 'قيم إسلامية', 'رعاية القطط'],
    featured: true,
  },
  {
    id: '2',
    slug: 'grain-free-diet-benefits',
    title: '5 Benefits of a Grain-Free Diet for Your Cat',
    titleAr: '5 فوائد للنظام الغذائي الخالي من الحبوب لقطتك',
    excerpt: 'Learn why grain-free cat food is becoming the preferred choice for pet owners who want the best for their feline friends.',
    excerptAr: 'تعرف على لماذا أصبح طعام القطط الخالي من الحبوب الخيار المفضل لأصحاب الحيوانات الأليفة الذين يريدون الأفضل لأصدقائهم القطط.',
    content: `
# 5 Benefits of a Grain-Free Diet for Your Cat

Cats are obligate carnivores, meaning their bodies are designed to thrive on a diet primarily made of meat. Here's why grain-free food is beneficial for your feline friend.

## 1. Better Digestion
Cats lack the necessary enzymes to properly digest grains. A grain-free diet reduces digestive stress and improves nutrient absorption.

## 2. Healthier Skin and Coat
Many cats develop allergies to grains, leading to skin problems. Grain-free food can result in a shinier coat and healthier skin.

## 3. Increased Energy Levels
With more protein and fewer carbohydrates, grain-free food provides sustainable energy without the sugar spikes.

## 4. Weight Management
Grain-free diets are naturally lower in carbohydrates, helping maintain a healthy weight and muscle mass.

## 5. Reduced Allergies
Eliminating grains removes common allergens, reducing itching, scratching, and digestive issues.

## Hurayra's Grain-Free Promise
All our formulas are 100% grain-free, focusing on high-quality proteins from chicken and tuna.
    `,
    contentAr: `
# 5 فوائد للنظام الغذائي الخالي من الحبوب لقطتك

القطط حيوانات آكلة للحوم بطبيعتها، مما يعني أن أجسامها مصممة للازدهار على نظام غذائي يتكون في المقام الأول من اللحوم.

## 1. هضم أفضل
القطط تفتقر إلى الإنزيمات اللازمة لهضم الحبوب بشكل صحيح. النظام الغذائي الخالي من الحبوب يقلل من الإجهاد الهضمي ويحسن امتصاص المغذيات.

## 2. جلد وشعر أكثر صحة
العديد من القطط تطور حساسية للحبوب، مما يؤدي إلى مشاكل جلدية. الطعام الخالي من الحبوب يمكن أن يؤدي إلى شعر أكثر لمعاناً وجلد أكثر صحة.

## 3. مستويات طاقة متزايدة
مع المزيد من البروتين وكربوهيدرات أقل، يوفر الطعام الخالي من الحبوب طاقة مستدامة دون ارتفاع السكر.

## 4. إدارة الوزن
الأنظمة الغذائية الخالية من الحبوب منخفضة بشكل طبيعي في الكربوهيدرات، مما يساعد في الحفاظ على وزن صحي وكتلة عضلية.

## 5. تقليل الحساسية
القضاء على الحبوب يزيل مسببات الحساسية الشائعة، مما يقلل من الحكة والخدش ومشاكل الهضم.

## وعد حريرة الخالي من الحبوب
جميع تركيباتنا خالية 100٪ من الحبوب، مع التركيز على البروتينات عالية الجودة من الدجاج والتونة.
    `,
    category: 'nutrition',
    categoryAr: 'التغذية',
    author: {
      name: 'Sarah Al-Hashemi',
      nameAr: 'سارة الهاشمي',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      role: 'Feline Nutritionist',
      roleAr: 'أخصائية تغذية القطط',
    },
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1200&q=90&fit=crop',
    publishDate: '2026-01-20',
    readTime: 4,
    tags: ['Grain-Free', 'Nutrition', 'Health', 'Diet'],
    tagsAr: ['خالي من الحبوب', 'تغذية', 'صحة', 'نظام غذائي'],
    featured: true,
  },
  {
    id: '3',
    slug: 'cat-hydration-tips',
    title: 'Essential Tips to Keep Your Cat Hydrated',
    titleAr: 'نصائح أساسية للحفاظ على ترطيب قطتك',
    excerpt: 'Proper hydration is crucial for your cat\'s health. Learn practical ways to ensure your feline friend drinks enough water.',
    excerptAr: 'الترطيب المناسب أمر بالغ الأهمية لصحة قطتك. تعلم طرق عملية لضمان شرب صديقك القطط ما يكفي من الماء.',
    content: `
# Essential Tips to Keep Your Cat Hydrated

Cats are notorious for not drinking enough water. Here are proven strategies to improve your cat's hydration.

## Why Hydration Matters
Proper hydration prevents kidney disease, urinary tract infections, and helps maintain overall health.

## Top Hydration Tips

### 1. Fresh Water Always
Change water daily and keep bowls clean. Cats prefer fresh, cool water.

### 2. Multiple Water Stations
Place water bowls in different locations around your home.

### 3. Consider a Cat Fountain
Many cats prefer running water. A fountain can encourage drinking.

### 4. Wet Food Integration
Our Hurayra products contain moisture that contributes to daily hydration needs.

### 5. Bowl Material Matters
Use ceramic or stainless steel bowls. Avoid plastic which can harbor bacteria.

## Signs of Dehydration
- Dry gums
- Lethargy
- Sunken eyes
- Loss of appetite

Stay vigilant and keep your cat healthy!
    `,
    contentAr: `
# نصائح أساسية للحفاظ على ترطيب قطتك

القطط معروفة بعدم شرب كمية كافية من الماء. إليك استراتيجيات مثبتة لتحسين ترطيب قطتك.

## لماذا يهم الترطيب
الترطيب المناسب يمنع أمراض الكلى والتهابات المسالك البولية ويساعد في الحفاظ على الصحة العامة.

## أهم نصائح الترطيب

### 1. ماء طازج دائماً
غيّر الماء يومياً واحفظ الأوعية نظيفة. القطط تفضل الماء الطازج البارد.

### 2. محطات مياه متعددة
ضع أوعية الماء في أماكن مختلفة حول منزلك.

### 3. فكر في نافورة للقطط
العديد من القطط تفضل الماء الجاري. النافورة يمكن أن تشجع على الشرب.

### 4. دمج الطعام الرطب
منتجات حريرة تحتوي على رطوبة تساهم في احتياجات الترطيب اليومية.

### 5. مادة الوعاء مهمة
استخدم أوعية السيراميك أو الفولاذ المقاوم للصدأ. تجنب البلاستيك الذي يمكن أن يأوي البكتيريا.

## علامات الجفاف
- لثة جافة
- خمول
- عيون غائرة
- فقدان الشهية

كن يقظاً واحفظ قطتك صحية!
    `,
    category: 'health',
    categoryAr: 'الصحة',
    author: {
      name: 'Dr. Fatima Al-Zaabi',
      nameAr: 'د. فاطمة الزعابي',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop',
      role: 'Veterinarian',
      roleAr: 'طبيبة بيطرية',
    },
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&q=90&fit=crop',
    publishDate: '2026-01-22',
    readTime: 3,
    tags: ['Health', 'Hydration', 'Cat Care', 'Tips'],
    tagsAr: ['صحة', 'ترطيب', 'رعاية القطط', 'نصائح'],
    featured: false,
  },
  {
    id: '4',
    slug: 'understanding-cat-behavior',
    title: 'Understanding Your Cat\'s Body Language',
    titleAr: 'فهم لغة جسد قطتك',
    excerpt: 'Decode what your cat is trying to tell you through their body language and vocalizations.',
    excerptAr: 'فك رموز ما تحاول قطتك أن تخبرك به من خلال لغة جسدها وأصواتها.',
    content: `
# Understanding Your Cat's Body Language

Cats communicate primarily through body language. Learning to read these signals strengthens your bond.

## Tail Positions
- **Upright**: Happy and confident
- **Puffed up**: Scared or aggressive
- **Tucked**: Anxious or submissive
- **Swishing**: Irritated or playful

## Ear Positions
- **Forward**: Alert and interested
- **Sideways**: Nervous or agitated
- **Flat back**: Frightened or aggressive

## Eye Contact
- **Slow blink**: Trust and affection
- **Dilated pupils**: Excited or scared
- **Staring**: Challenge or focus

## Vocalizations
- **Purring**: Usually contentment
- **Meowing**: Attention-seeking
- **Hissing**: Warning or fear
- **Chirping**: Excitement

Understanding these signals helps you respond appropriately to your cat's needs.
    `,
    contentAr: `
# فهم لغة جسد قطتك

القطط تتواصل بشكل أساسي من خلال لغة الجسد. تعلم قراءة هذه الإشارات يقوي رابطتك.

## أوضاع الذيل
- **منتصب**: سعيد وواثق
- **منتفخ**: خائف أو عدواني
- **مطوي**: قلق أو خاضع
- **يتأرجح**: منزعج أو مرح

## أوضاع الأذن
- **للأمام**: متيقظ ومهتم
- **للجانب**: عصبي أو منزعج
- **مسطح للخلف**: خائف أو عدواني

## التواصل بالعين
- **وميض بطيء**: ثقة وعاطفة
- **حدقة متسعة**: متحمس أو خائف
- **التحديق**: تحدي أو تركيز

## الأصوات
- **الخرخرة**: عادة الرضا
- **المواء**: طلب الانتباه
- **الهسهسة**: تحذير أو خوف
- **التغريد**: إثارة

فهم هذه الإشارات يساعدك على الاستجابة بشكل مناسب لاحتياجات قطتك.
    `,
    category: 'care',
    categoryAr: 'العناية',
    author: {
      name: 'Mohammed Al-Suwaidi',
      nameAr: 'محمد السويدي',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      role: 'Animal Behaviorist',
      roleAr: 'أخصائي سلوك الحيوانات',
    },
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&q=90&fit=crop',
    publishDate: '2026-01-25',
    readTime: 4,
    tags: ['Behavior', 'Cat Care', 'Communication', 'Tips'],
    tagsAr: ['سلوك', 'رعاية القطط', 'تواصل', 'نصائح'],
    featured: false,
  },
  {
    id: '5',
    slug: 'seasonal-cat-care-winter',
    title: 'Winter Cat Care: Keeping Your Feline Warm in UAE',
    titleAr: 'رعاية القطط الشتوية: الحفاظ على دفء قطتك في الإمارات',
    excerpt: 'Even in the UAE, winter temperatures can affect your cat. Learn how to keep them comfortable during cooler months.',
    excerptAr: 'حتى في الإمارات، درجات الحرارة الشتوية يمكن أن تؤثر على قطتك. تعلم كيف تحافظ على راحتها خلال الأشهر الباردة.',
    content: `
# Winter Cat Care: Keeping Your Feline Warm in UAE

While UAE winters are mild compared to many countries, cats still need special care during cooler months.

## Indoor Comfort
- Provide warm bedding in draft-free areas
- Keep indoor temperature consistent
- Create cozy hideaways with blankets

## Outdoor Precautions
- Limit outdoor time during cold mornings
- Provide shelter for outdoor cats
- Check car engines before starting (cats hide there)

## Nutrition During Winter
Cats may need slightly more calories in winter. Our Hurayra high-protein formulas provide the energy they need.

## Health Monitoring
- Watch for signs of cold stress
- Maintain regular vet checkups
- Keep vaccinations current

## Hydration Reminder
Cats drink less in winter. Ensure fresh water is always available.

Stay prepared and keep your cat healthy all year round!
    `,
    contentAr: `
# رعاية القطط الشتوية: الحفاظ على دفء قطتك في الإمارات

بينما شتاء الإمارات معتدل مقارنة بالعديد من البلدان، لا تزال القطط تحتاج إلى رعاية خاصة خلال الأشهر الباردة.

## الراحة الداخلية
- وفر فراش دافئ في مناطق خالية من التيارات الهوائية
- حافظ على درجة حرارة داخلية ثابتة
- أنشئ مخابئ مريحة بالبطانيات

## احتياطات خارجية
- قلل الوقت الخارجي خلال الصباحات الباردة
- وفر مأوى للقطط الخارجية
- تحقق من محركات السيارات قبل التشغيل (القطط تختبئ هناك)

## التغذية خلال الشتاء
القطط قد تحتاج سعرات حرارية أكثر قليلاً في الشتاء. تركيبات حريرة عالية البروتين توفر الطاقة التي يحتاجونها.

## مراقبة الصحة
- راقب علامات إجهاد البرد
- حافظ على الفحوصات البيطرية المنتظمة
- حافظ على التطعيمات محدثة

## تذكير الترطيب
القطط تشرب أقل في الشتاء. تأكد من توفر الماء العذب دائماً.

ابقَ مستعداً واحفظ قطتك صحية طوال العام!
    `,
    category: 'tips',
    categoryAr: 'نصائح',
    author: {
      name: 'Layla Al-Qassimi',
      nameAr: 'ليلى القاسمي',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
      role: 'Pet Care Specialist',
      roleAr: 'أخصائية رعاية الحيوانات الأليفة',
    },
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=90&fit=crop',
    publishDate: '2026-01-27',
    readTime: 5,
    tags: ['Seasonal Care', 'Winter', 'Health', 'UAE'],
    tagsAr: ['رعاية موسمية', 'شتاء', 'صحة', 'الإمارات'],
    featured: false,
  },
  {
    id: '6',
    slug: 'new-cat-checklist',
    title: 'Complete Checklist for New Cat Owners',
    titleAr: 'قائمة مرجعية كاملة لأصحاب القطط الجدد',
    excerpt: 'Everything you need to know and have before bringing your new feline friend home.',
    excerptAr: 'كل ما تحتاج معرفته وامتلاكه قبل إحضار صديقك القط الجديد إلى المنزل.',
    content: `
# Complete Checklist for New Cat Owners

Congratulations on your decision to adopt a cat! Here's everything you need to prepare.

## Essential Supplies
- High-quality cat food (like Hurayra!)
- Water and food bowls
- Litter box and litter
- Scratching post
- Toys and enrichment items
- Comfortable bed
- Carrier for vet visits

## Initial Health Care
- Schedule first vet checkup
- Vaccinations
- Spay/neuter consultation
- Microchipping
- Flea and tick prevention

## Cat-Proofing Your Home
- Remove toxic plants
- Secure loose wires
- Lock away chemicals
- Cover small spaces
- Check window screens

## Nutrition Plan
Start with premium halal cat food from Hurayra:
- High protein content
- Grain-free formula
- Available in chicken and tuna
- Suitable for all life stages

## Building Trust
- Give your cat space initially
- Use treats for positive association
- Play regularly
- Maintain consistent routines

Welcome to the wonderful world of cat ownership!
    `,
    contentAr: `
# قائمة مرجعية كاملة لأصحاب القطط الجدد

تهانينا على قرارك بتبني قطة! إليك كل ما تحتاج للتحضير.

## المستلزمات الأساسية
- طعام قطط عالي الجودة (مثل حريرة!)
- أوعية الماء والطعام
- صندوق الفضلات والرمل
- عمود خدش
- ألعاب وأدوات إثراء
- سرير مريح
- حامل لزيارات الطبيب البيطري

## الرعاية الصحية الأولية
- جدولة أول فحص بيطري
- التطعيمات
- استشارة التعقيم
- زرع الشريحة الإلكترونية
- الوقاية من البراغيث والقراد

## تأمين منزلك للقطة
- أزل النباتات السامة
- أمّن الأسلاك المفكوكة
- أقفل المواد الكيميائية
- غطِّ المساحات الصغيرة
- تحقق من شاشات النوافذ

## خطة التغذية
ابدأ بطعام القطط الحلال الفاخر من حريرة:
- محتوى عالي من البروتين
- تركيبة خالية من الحبوب
- متوفر بنكهات الدجاج والتونة
- مناسب لجميع مراحل الحياة

## بناء الثقة
- امنح قطتك مساحة في البداية
- استخدم المكافآت للارتباط الإيجابي
- العب بانتظام
- حافظ على روتين ثابت

مرحباً بك في عالم امتلاك القطط الرائع!
    `,
    category: 'tips',
    categoryAr: 'نصائح',
    author: {
      name: 'Omar Al-Mazrouei',
      nameAr: 'عمر المزروعي',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
      role: 'Cat Care Expert',
      roleAr: 'خبير رعاية القطط',
    },
    image: 'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=1200&q=90&fit=crop',
    publishDate: '2026-01-28',
    readTime: 6,
    tags: ['New Owners', 'Tips', 'Cat Care', 'Checklist'],
    tagsAr: ['أصحاب جدد', 'نصائح', 'رعاية القطط', 'قائمة مرجعية'],
    featured: true,
  },
];
