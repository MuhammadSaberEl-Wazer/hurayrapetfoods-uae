import type { Product } from '@/lib/types'
import { productImagesChicken, productImagesTuna, productImagesCombo } from '@/data/productImages'

/**
 * Products Data - Hurayra Pet Foods UAE
 * Product types: Chicken, Tuna & Combo
 */

export const products: Product[] = [
  // Chicken Formula
  {
    id: 'chicken-premium',
    name: 'Premium Halal Chicken Cat Food',
    slug: 'premium-halal-chicken-cat-food',
    type: 'chicken',
    description: 'Our premium halal chicken formula is specially crafted for cats who deserve the best. Made with 100% halal-certified chicken meat as the primary ingredient, this complete and balanced meal provides all the essential nutrients your feline friend needs. Rich in high-quality protein, omega-3 fatty acids, and essential vitamins, it supports healthy muscle development, a shiny coat, and overall vitality. Free from artificial preservatives, colors, and flavors.',
    price: 50,
    compareAtPrice: 30,
    sizes: [
      {
        size: '900g',
        price: 50,
        sku: 'HRP-CHK-900',
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
    images: productImagesChicken,
    inStock: true,
    featured: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z'
  },
  
  // Tuna Formula
  {
    id: 'tuna-premium',
    name: 'Premium Halal Tuna Cat Food',
    slug: 'premium-halal-tuna-cat-food',
    type: 'tuna',
    description: 'Indulge your cat with our premium halal tuna formula, made with sustainably sourced, halal-certified tuna. This delicious recipe is packed with high-quality protein and essential fatty acids that cats naturally crave. Enhanced with omega-3 from fish oil, it promotes heart health, brain function, and a lustrous coat. Perfect for cats who prefer seafood flavors, this complete meal provides balanced nutrition without any artificial additives.',
    price: 52,
    compareAtPrice: 35,
    sizes: [
      {
        size: '900g',
        price: 52,
        sku: 'HRP-TUN-900',
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
    images: productImagesTuna,
    inStock: true,
    featured: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z'
  },

  // Combo — Chicken & Tuna
  {
    id: 'combo-chicken-tuna',
    name: 'Premium Halal Chicken & Tuna Combo',
    slug: 'premium-halal-chicken-tuna-combo',
    type: 'combo',
    description: 'The best of both worlds — our combo brings together premium halal chicken and tuna in one complete formula. Perfect for cats who love variety, this balanced blend offers high-quality protein from two premium sources, essential omega fatty acids, and full nutrition in every serving. 100% halal certified, no artificial additives.',
    price: 51,
    compareAtPrice: 32,
    sizes: [
      { size: '900g', price: 51, sku: 'HRP-CMB-900', inStock: true }
    ],
    features: [
      'Chicken & Tuna — Two Premium Proteins',
      '100% Halal Certified',
      'High Protein (35%)',
      'Grain-Free Formula',
      'No Artificial Preservatives',
      'Omega-3 & Omega-6',
      'Complete & Balanced Nutrition',
      'Ideal for Variety-Loving Cats'
    ],
    nutritionalInfo: {
      protein: '35%',
      fat: '14%',
      fiber: '3%',
      moisture: '10%',
      calories: '378 kcal/cup'
    },
    ingredients: [
      'Chicken Meat (Halal Certified)',
      'Tuna (Halal Certified)',
      'Fish Oil (Omega-3 source)',
      'Sweet Potato',
      'Peas',
      'Vitamins (A, D3, E, B-complex)',
      'Minerals (Calcium, Phosphorus, Zinc, Iron)',
      'Taurine',
      'Natural Fiber',
      'Rosemary Extract (natural preservative)'
    ],
    images: productImagesCombo,
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

export const getProductsByType = (type: 'chicken' | 'tuna' | 'combo'): Product[] => {
  return products.filter(p => p.type === type)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured)
}

export const getInStockProducts = (): Product[] => {
  return products.filter(p => p.inStock)
}
