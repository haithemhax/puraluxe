import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartLine {
  lineId: string
  productId: string
  name: string
  slug: string
  image: string
  volumeMl: number
  unitPrice: number
  quantity: number
}

const FREE_SHIPPING_THRESHOLD = 5000

interface CartState {
  items: CartLine[]
  promoCode: string
  promoApplied: boolean
  drawerOpen: boolean
  addItem: (item: Omit<CartLine, 'lineId' | 'quantity'> & { quantity?: number }) => void
  updateQuantity: (lineId: string, quantity: number) => void
  removeLine: (lineId: string) => void
  clearCart: () => void
  setPromoCode: (code: string) => void
  applyPromo: () => void
  setDrawerOpen: (open: boolean) => void
  toggleDrawer: () => void
  getSubtotal: () => number
  getShipping: () => number
  getDiscount: () => number
  getTotal: () => number
}

function lineIdOf(productId: string, volumeMl: number) {
  return `${productId}-${volumeMl}`
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: '',
      promoApplied: false,
      drawerOpen: false,

      addItem: (item) => {
        const qty = item.quantity ?? 1
        const lid = lineIdOf(item.productId, item.volumeMl)
        const existing = get().items.find((l) => l.lineId === lid)
        if (existing) {
          set({
            items: get().items.map((l) =>
              l.lineId === lid
                ? { ...l, quantity: l.quantity + qty }
                : l,
            ),
          })
        } else {
          set({
            items: [
              ...get().items,
              {
                lineId: lid,
                productId: item.productId,
                name: item.name,
                slug: item.slug,
                image: item.image,
                volumeMl: item.volumeMl,
                unitPrice: item.unitPrice,
                quantity: qty,
              },
            ],
          })
        }
      },

      updateQuantity: (lineId, quantity) => {
        if (quantity < 1) {
          get().removeLine(lineId)
          return
        }
        set({
          items: get().items.map((l) =>
            l.lineId === lineId ? { ...l, quantity } : l,
          ),
        })
      },

      removeLine: (lineId) =>
        set({ items: get().items.filter((l) => l.lineId !== lineId) }),

      clearCart: () => set({ items: [], promoApplied: false, promoCode: '' }),

      setPromoCode: (code) => set({ promoCode: code, promoApplied: false }),

      applyPromo: () => {
        const code = get().promoCode.trim().toUpperCase()
        if (code === 'PURALUXE10') set({ promoApplied: true })
        else set({ promoApplied: false })
      },

      setDrawerOpen: (open) => set({ drawerOpen: open }),
      toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),

      getSubtotal: () =>
        get().items.reduce((s, l) => s + l.unitPrice * l.quantity, 0),

      getShipping: () => {
        const sub = get().getSubtotal()
        if (sub === 0) return 0
        return sub >= FREE_SHIPPING_THRESHOLD ? 0 : 500
      },

      getDiscount: () => {
        if (!get().promoApplied) return 0
        return Math.round(get().getSubtotal() * 0.1)
      },

      getTotal: () =>
        get().getSubtotal() - get().getDiscount() + get().getShipping(),
    }),
    { name: 'puraluxe-cart' },
  ),
)

export { FREE_SHIPPING_THRESHOLD }
