import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order } from '@/lib/types'

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrdersByEmail: (email: string) => Order[]
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] })
      },

      getOrdersByEmail: (email) => {
        return get().orders.filter((o) => o.customerInfo.email.toLowerCase() === email.toLowerCase())
      }
    }),
    { name: 'hurayra-orders-storage', version: 1 }
  )
)
