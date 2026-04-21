import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DashboardAuthState {
  unlocked: boolean
  tryUnlock: (pin: string) => boolean
  lock: () => void
}

const PIN = import.meta.env.VITE_DASHBOARD_PIN ?? 'IKRAM'

export const useDashboardAuthStore = create<DashboardAuthState>()(
  persist(
    (set) => ({
      unlocked: false,
      tryUnlock: (pin) => {
        const ok = pin.trim() === PIN
        if (ok) set({ unlocked: true })
        return ok
      },
      lock: () => set({ unlocked: false }),
    }),
    {
      name: 'puraluxe-dashboard-auth',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
