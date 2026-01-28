import type { Product } from '@/lib/types'

/**
 * Products Data - Hurayra Pet Foods UAE
 * Only 2 product types: Chicken & Tuna
 */

export const products: Product[] = [
  // Chicken Formula
  {
    id: 'chicken-premium',
    name: 'Premium Halal Chicken Cat Food',
    nameAr: 'طعام قطط دجاج حلال فاخر',
    slug: 'premium-halal-chicken-cat-food',
    type: 'chicken',
    description: 'Our premium halal chicken formula is specially crafted for cats who deserve the best. Made with 100% halal-certified chicken meat as the primary ingredient, this complete and balanced meal provides all the essential nutrients your feline friend needs. Rich in high-quality protein, omega-3 fatty acids, and essential vitamins, it supports healthy muscle development, a shiny coat, and overall vitality. Free from artificial preservatives, colors, and flavors.',
    descriptionAr: 'تركيبة الدجاج الحلال الفاخرة لدينا مصممة خصيصًا للقطط التي تستحق الأفضل. مصنوع من لحم دجاج معتمد حلال 100٪ كمكون رئيسي، توفر هذه الوجبة الكاملة والمتوازنة جميع العناصر الغذائية الأساسية التي يحتاجها صديقك القطط. غني بالبروتين عالي الجودة وأحماض أوميغا 3 الدهنية والفيتامينات الأساسية، يدعم تطور العضلات الصحي ومعطف لامع وحيوية عامة. خالي من المواد الحافظة والألوان والنكهات الصناعية.',
    price: 25,
    compareAtPrice: 30,
    sizes: [
      {
        size: '400g',
        price: 25,
        sku: 'HRP-CHK-400',
        inStock: true
      },
      {
        size: '1kg',
        price: 55,
        sku: 'HRP-CHK-1K',
        inStock: true
      },
      {
        size: '2kg',
        price: 95,
        sku: 'HRP-CHK-2K',
        inStock: true
      },
      {
        size: '5kg',
        price: 220,
        sku: 'HRP-CHK-5K',
        inStock: true
      }
    ],
    features: [
      '100% Halal Certified Chicken',
      'High Protein Content (35%)',
      'Grain-Free Formula',
      'No Artificial Preservatives',
      'Rich in Omega-3 & Omega-6',
      'Essential Vitamins & Minerals',
      'Supports Healthy Digestion',
      'Promotes Shiny Coat'
    ],
    nutritionalInfo: {
      protein: '35%',
      fat: '15%',
      fiber: '3%',
      moisture: '10%',
      calories: '380 kcal/cup'
    },
    ingredients: [
      'Chicken Meat (Halal Certified)',
      'Chicken Liver',
      'Fish Oil (Omega-3 source)',
      'Sweet Potato',
      'Peas',
      'Vitamins (A, D3, E, B-complex)',
      'Minerals (Calcium, Phosphorus, Zinc, Iron)',
      'Taurine',
      'Natural Fiber',
      'Rosemary Extract (natural preservative)'
    ],
    images: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80',
      'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
      'https://images.unsplash.com/photo-1573865526739-10c1dd7aa059?w=800&q=80'
    ],
    inStock: true,
    featured: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z'
  },
  
  // Tuna Formula
  {
    id: 'tuna-premium',
    name: 'Premium Halal Tuna Cat Food',
    nameAr: 'طعام قطط تونا حلال فاخر',
    slug: 'premium-halal-tuna-cat-food',
    type: 'tuna',
    description: 'Indulge your cat with our premium halal tuna formula, made with sustainably sourced, halal-certified tuna. This delicious recipe is packed with high-quality protein and essential fatty acids that cats naturally crave. Enhanced with omega-3 from fish oil, it promotes heart health, brain function, and a lustrous coat. Perfect for cats who prefer seafood flavors, this complete meal provides balanced nutrition without any artificial additives.',
    descriptionAr: 'دلل قطتك بتركيبة التونة الحلال الفاخرة لدينا، المصنوعة من التونة المعتمدة حلال والمستدامة. هذه الوصفة اللذيذة غنية بالبروتين عالي الجودة والأحماض الدهنية الأساسية التي تتوق إليها القطط بشكل طبيعي. معززة بأوميغا 3 من زيت السمك، تعزز صحة القلب ووظائف المخ ومعطف لامع. مثالي للقطط التي تفضل نكهات المأكولات البحرية، توفر هذه الوجبة الكاملة تغذية متوازنة بدون أي إضافات صناعية.',
    price: 28,
    compareAtPrice: 35,
    sizes: [
      {
        size: '400g',
        price: 28,
        sku: 'HRP-TUN-400',
        inStock: true
      },
      {
        size: '1kg',
        price: 60,
        sku: 'HRP-TUN-1K',
        inStock: true
      },
      {
        size: '2kg',
        price: 105,
        sku: 'HRP-TUN-2K',
        inStock: true
      },
      {
        size: '5kg',
        price: 245,
        sku: 'HRP-TUN-5K',
        inStock: true
      }
    ],
    features: [
      '100% Halal Certified Tuna',
      'High Protein Content (36%)',
      'Grain-Free Formula',
      'No Artificial Preservatives',
      'Extra Rich in Omega-3',
      'Essential Vitamins & Minerals',
      'Supports Heart & Brain Health',
      'Irresistible Seafood Flavor'
    ],
    nutritionalInfo: {
      protein: '36%',
      fat: '14%',
      fiber: '3%',
      moisture: '10%',
      calories: '375 kcal/cup'
    },
    ingredients: [
      'Tuna (Halal Certified)',
      'Fish Meal',
      'Fish Oil (Omega-3 source)',
      'Sweet Potato',
      'Peas',
      'Vitamins (A, D3, E, B-complex)',
      'Minerals (Calcium, Phosphorus, Zinc, Iron)',
      'Taurine',
      'Natural Fiber',
      'Rosemary Extract (natural preservative)'
    ],
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&q=90&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=1200&q=90&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1615789591457-74a63395c990?w=1200&q=90&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1200&q=90&fit=crop&auto=format'
    ],
    inStock: true,
    featured: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z'
  }
]

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug)
}

export const getProductsByType = (type: 'chicken' | 'tuna'): Product[] => {
  return products.filter(p => p.type === type)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured)
}

export const getInStockProducts = (): Product[] => {
  return products.filter(p => p.inStock)
}
