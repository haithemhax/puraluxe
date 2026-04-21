import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OrderRecord, OrderStatus } from '../types/order'

interface OrdersState {
  orders: OrderRecord[]
  addOrder: (order: Omit<OrderRecord, 'status'> & { status?: OrderStatus }) => void
  setOrderStatus: (id: string, status: OrderStatus) => void
  clearAll: () => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((s) => ({
          orders: [
            {
              ...order,
              status: order.status ?? 'new',
            },
            ...s.orders,
          ],
        })),
      setOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      clearAll: () => set({ orders: [] }),
    }),
    { name: 'puraluxe-orders' },
  ),
)
