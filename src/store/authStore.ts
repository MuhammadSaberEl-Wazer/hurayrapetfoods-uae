import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types'

interface AuthStore {
  user: User | null
  /** Mock only: email -> { password, name } - will be replaced by Supabase */
  _mockUsers: Record<string, { password: string; name: string }>
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const DEMO_EMAIL = 'demo@hurayra.com'
const DEMO_PASSWORD = 'demo123'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      _mockUsers: {},
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        const key = email.toLowerCase().trim()
        const { _mockUsers } = get()

        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          set({
            user: { id: 'demo-1', email: DEMO_EMAIL, name: 'Demo User', provider: 'email' },
            isLoading: false
          })
          return { success: true }
        }

        const stored = _mockUsers[key]
        if (stored && stored.password === password) {
          set({
            user: { id: `user-${key}`, email: key, name: stored.name, provider: 'email' },
            isLoading: false
          })
          return { success: true }
        }

        set({ isLoading: false })
        return { success: false, error: 'Invalid email or password' }
      },

      signUp: async (name, email, password) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        const key = email.toLowerCase().trim()
        const { _mockUsers } = get()

        if (_mockUsers[key]) {
          set({ isLoading: false })
          return { success: false, error: 'An account with this email already exists' }
        }

        const newMock = { ..._mockUsers, [key]: { password, name: name.trim() } }
        set({
          _mockUsers: newMock,
          user: { id: `user-${Date.now()}`, email: key, name: name.trim(), provider: 'email' },
          isLoading: false
        })
        return { success: true }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 1000))
        set({
          user: {
            id: `google-${Date.now()}`,
            email: 'user@gmail.com',
            name: 'Google User',
            provider: 'google'
          },
          isLoading: false
        })
        return { success: true }
      },

      logout: () => set({ user: null })
    }),
    { name: 'hurayra-auth-storage', version: 1 }
  )
)
