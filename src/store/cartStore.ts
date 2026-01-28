import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, ProductSize } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product, selectedSize: ProductSize, quantity?: number) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, selectedSize, quantity = 1) => {
        const cartItemId = `${product.id}-${selectedSize.sku}`
        const existingItem = get().items.find(item => item.id === cartItemId)

        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: get().items.map(item =>
              item.id === cartItemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          // Add new item
          const newItem: CartItem = {
            id: cartItemId,
            productId: product.id,
            product,
            selectedSize,
            quantity,
            price: selectedSize.price,
            total: selectedSize.price * quantity
          }
          set({ items: [...get().items, newItem] })
        }
      },

      removeFromCart: (cartItemId) => {
        set({
          items: get().items.filter(item => item.id !== cartItemId)
        })
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId)
          return
        }

        set({
          items: get().items.map(item =>
            item.id === cartItemId
              ? {
                  ...item,
                  quantity,
                  total: item.selectedSize.price * quantity
                }
              : item
          )
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.total, 0)
      }
    }),
    {
      name: 'hurayra-cart-storage',
      version: 1
    }
  )
)
