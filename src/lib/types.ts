/**
 * TypeScript Type Definitions
 * Hurayra Pet Foods UAE
 */

// Product Types
export type ProductType = 'chicken' | 'tuna'

export interface Product {
  id: string
  name: string
  nameAr?: string
  slug: string
  type: ProductType
  description: string
  descriptionAr?: string
  price: number
  compareAtPrice?: number
  sizes: ProductSize[]
  features: string[]
  nutritionalInfo: NutritionalInfo
  ingredients: string[]
  images: string[]
  inStock: boolean
  featured: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ProductSize {
  size: string
  price: number
  sku: string
  inStock: boolean
}

export interface NutritionalInfo {
  protein: string
  fat: string
  fiber: string
  moisture: string
  calories?: string
}

// Auth / User Types (for Supabase later)
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  provider?: 'email' | 'google'
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  selectedSize: ProductSize
  quantity: number
  price: number
  total: number
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentMethod = 'cash-on-delivery' | 'card' | 'bank-transfer'

export interface Order {
  id: string
  orderNumber: string
  customerId?: string
  customerInfo: CustomerInfo
  deliveryAddress: DeliveryAddress
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface DeliveryAddress {
  address: string
  city: string
  emirate: string
}

export interface OrderItem {
  productId: string
  productName: string
  size: string
  sku: string
  quantity: number
  price: number
  subtotal: number
}

// Contact Types
export interface ContactMessage {
  id?: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status?: 'new' | 'read' | 'replied'
  createdAt?: string
}

// Review Types
export interface Review {
  id: string
  productId: string
  customerName: string
  rating: number
  comment: string
  verified: boolean
  createdAt: string
}

// Testimonial Types
export interface Testimonial {
  id: string
  name: string
  nameAr?: string
  location: string
  locationAr?: string
  rating: number
  comment: string
  commentAr?: string
  image?: string
  verified: boolean
}

// FAQ Types
export interface FAQ {
  id: string
  question: string
  questionAr?: string
  answer: string
  answerAr?: string
  category?: string
  order?: number
}

// Feature Types
export interface Feature {
  icon: string
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string
  subscribed: boolean
  subscribedAt?: string
}
