import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useDashboardAuthStore } from '../../store/dashboardAuthStore'

export function RequireDashboard({ children }: { children: ReactNode }) {
  const unlocked = useDashboardAuthStore((s) => s.unlocked)
  const location = useLocation()

  if (!unlocked) {
    return (
      <Navigate
        to="/dashboard/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  return <>{children}</>
}
