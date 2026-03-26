import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  tourId: string
  tourName: string
  date: string
  adults: number
  children: number
  pricePerAdult: number
  pricePerChild: number
  totalPrice: number
  imageUrl?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (tourId: string, date: string) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        // Check if item with same tour and date already exists
        const existingItemIndex = state.items.findIndex(
          (item) => item.tourId === newItem.tourId && item.date === newItem.date
        )

        if (existingItemIndex >= 0) {
          // Update existing item
          const newItems = [...state.items]
          newItems[existingItemIndex] = newItem
          return { items: newItems }
        }

        // Add new item
        return { items: [...state.items, newItem] }
      }),
      removeItem: (tourId, date) => set((state) => ({
        items: state.items.filter((item) => !(item.tourId === tourId && item.date === date))
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + item.totalPrice, 0)
    }),
    {
      name: 'machupicchu-cart'
    }
  )
)
