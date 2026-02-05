export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'nutrition' | 'health' | 'care' | 'tips' | 'news';
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  publishDate: string;
  readTime: number; // in minutes
  tags: string[];
  featured: boolean;
}

export const blogCategories = [
  { id: 'nutrition', name: 'Nutrition' },
  { id: 'health', name: 'Health' },
  { id: 'care', name: 'Care' },
  { id: 'tips', name: 'Tips' },
  { id: 'news', name: 'News' },
];

export const blogs: BlogPost[] = [
  {
    id: '1',
    slug: 'importance-of-halal-cat-food',
    title: 'The Importance of Halal Cat Food for Muslim Pet Owners',
    excerpt: 'Discover why halal certification matters when choosing food for your beloved cat and how it aligns with Islamic values.',
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
    category: 'nutrition',
    author: {
      name: 'Dr. Ahmed Al-Mansoori',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
      role: 'Veterinary Nutritionist',
    },
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=90&fit=crop',
    publishDate: '2026-01-15',
    readTime: 5,
    tags: ['Halal', 'Nutrition', 'Islamic Values', 'Cat Care'],
    featured: true,
  },
  {
    id: '2',
    slug: 'grain-free-diet-benefits',
    title: '5 Benefits of a Grain-Free Diet for Your Cat',
    excerpt: 'Learn why grain-free cat food is becoming the preferred choice for pet owners who want the best for their feline friends.',
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
    category: 'nutrition',
    author: {
      name: 'Sarah Al-Hashemi',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Al-Hashemi&background=008080&color=fff&size=150',
      role: 'Feline Nutritionist',
    },
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1200&q=90&fit=crop',
    publishDate: '2026-01-20',
    readTime: 4,
    tags: ['Grain-Free', 'Nutrition', 'Health', 'Diet'],
    featured: true,
  },
  {
    id: '3',
    slug: 'cat-hydration-tips',
    title: 'Essential Tips to Keep Your Cat Hydrated',
    excerpt: 'Proper hydration is crucial for your cat\'s health. Learn practical ways to ensure your feline friend drinks enough water.',
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
    category: 'health',
    author: {
      name: 'Dr. Fatima Al-Zaabi',
      avatar: 'https://ui-avatars.com/api/?name=Fatima+Al-Zaabi&background=008080&color=fff&size=150',
      role: 'Veterinarian',
    },
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&q=90&fit=crop',
    publishDate: '2026-01-22',
    readTime: 3,
    tags: ['Health', 'Hydration', 'Cat Care', 'Tips'],
    featured: false,
  },
  {
    id: '4',
    slug: 'understanding-cat-behavior',
    title: 'Understanding Your Cat\'s Body Language',
    excerpt: 'Decode what your cat is trying to tell you through their body language and vocalizations.',
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
    category: 'care',
    author: {
      name: 'Mohammed Al-Suwaidi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      role: 'Animal Behaviorist',
    },
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&q=90&fit=crop',
    publishDate: '2026-01-25',
    readTime: 4,
    tags: ['Behavior', 'Cat Care', 'Communication', 'Tips'],
    featured: false,
  },
  {
    id: '5',
    slug: 'seasonal-cat-care-winter',
    title: 'Winter Cat Care: Keeping Your Feline Warm in UAE',
    excerpt: 'Even in the UAE, winter temperatures can affect your cat. Learn how to keep them comfortable during cooler months.',
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
    category: 'tips',
    author: {
      name: 'Layla Al-Qassimi',
      avatar: 'https://ui-avatars.com/api/?name=Layla+Al-Qassimi&background=008080&color=fff&size=150',
      role: 'Pet Care Specialist',
    },
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=90&fit=crop',
    publishDate: '2026-01-27',
    readTime: 5,
    tags: ['Seasonal Care', 'Winter', 'Health', 'UAE'],
    featured: false,
  },
  {
    id: '6',
    slug: 'new-cat-checklist',
    title: 'Complete Checklist for New Cat Owners',
    excerpt: 'Everything you need to know and have before bringing your new feline friend home.',
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
    category: 'tips',
    author: {
      name: 'Omar Al-Mazrouei',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
      role: 'Cat Care Expert',
    },
    image: 'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=1200&q=90&fit=crop',
    publishDate: '2026-01-28',
    readTime: 6,
    tags: ['New Owners', 'Tips', 'Cat Care', 'Checklist'],
    featured: true,
  },
];
