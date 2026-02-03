import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order } from '@/lib/types'
import { getSeedOrders } from '@/data/seedOrders'

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrdersByEmail: (email: string) => Order[]
}

const seedOrders = getSeedOrders()

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: seedOrders,

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] })
      },

      getOrdersByEmail: (email) => {
        return get().orders.filter((o) => o.customerInfo.email.toLowerCase() === email.toLowerCase())
      },
    }),
    {
      name: 'hurayra-orders-storage',
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = persistedState as { orders?: Order[] }
        const orders = state?.orders
        if (Array.isArray(orders) && orders.length > 0) {
          return { ...state, orders }
        }
        return { ...state, orders: seedOrders }
      },
    }
  )
)
