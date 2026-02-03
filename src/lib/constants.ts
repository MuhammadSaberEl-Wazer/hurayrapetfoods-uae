/**
 * Application Constants
 * HurayraPetFood.ae — UAE
 */

// Site Information
export const SITE_NAME = 'HurayraPetFood.ae'
export const SITE_TAGLINE = '100% Halal Cat Food'
export const SITE_DESCRIPTION = 'Premium halal cat food made with trusted ingredients to support your cat\'s health, nutrition, and Islamic values.'

// Contact Information
export const CONTACT_EMAIL = 'info@hurayrapetfoods.ae'
export const CONTACT_PHONE = '+971 XX XXX XXXX'
export const CONTACT_WHATSAPP = '+971 XX XXX XXXX'
export const CONTACT_ADDRESS = 'Dubai, United Arab Emirates'

// Business Hours
export const WORKING_HOURS = {
  weekdays: 'Sunday - Thursday: 9:00 AM - 6:00 PM',
  weekend: 'Friday - Saturday: Closed'
}

// Social Media
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/hurayrapetfoods',
  instagram: 'https://instagram.com/hurayrapetfoods',
  twitter: 'https://twitter.com/hurayrapetfoods',
  tiktok: 'https://tiktok.com/@hurayrapetfoods'
}

// Product Categories
export const PRODUCT_TYPES = {
  CHICKEN: 'chicken',
  TUNA: 'tuna'
} as const

// Currency
export const CURRENCY = 'AED'
export const CURRENCY_SYMBOL = 'AED'

// Shipping
export const FREE_SHIPPING_THRESHOLD = 0 // Free shipping for all orders
export const SHIPPING_COST = 0

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const

// Payment Methods
export const PAYMENT_METHODS = {
  COD: 'cash-on-delivery'
} as const

// UAE Emirates
export const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Umm Al Quwain',
  'Fujairah'
] as const

// Features
export const FEATURES = [
  '100% Halal Certified',
  '100% Natural Ingredients',
  'Vet Approved',
  'Premium Quality',
  'Fast Delivery',
  'Satisfaction Guaranteed'
] as const

// Trust Badges
export const TRUST_BADGES = {
  customers: '10,000+',
  rating: 5,
  natural: '100%',
  halal: 'Certified'
} as const
