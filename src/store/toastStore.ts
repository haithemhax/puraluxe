import { create } from 'zustand'

export type ToastKind = 'success' | 'info'

export interface ToastItem {
  id: string
  message: string
  kind: ToastKind
}

interface ToastState {
  toasts: ToastItem[]
  push: (message: string, kind?: ToastKind) => void
  dismiss: (id: string) => void
}

let tid = 0

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message, kind = 'success') => {
    const id = `t-${++tid}`
    set((s) => ({ toasts: [...s.toasts, { id, message, kind }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 3200)
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
