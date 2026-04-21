import { NavLink, Outlet, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDashboardAuthStore } from '../../store/dashboardAuthStore'
import { Logo } from '../../components/layout/Logo'

const nav = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/categories', label: 'Categories' },
  { to: '/dashboard/products', label: 'Products' },
  { to: '/dashboard/orders', label: 'Orders' },
  { to: '/dashboard/customers', label: 'Customers' },
  { to: '/dashboard/settings', label: 'Settings' },
]

export default function DashboardLayout() {
  const lock = useDashboardAuthStore((s) => s.lock)

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Helmet>
        <title>Atelier console | PURALUXE</title>
      </Helmet>
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 border-r border-gold-dark/15 bg-paper md:flex md:flex-col">
          <div className="border-b border-gold-dark/15 p-5">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="sm" />
            </Link>
            <p className="mt-2 font-[family-name:var(--font-cinzel)] text-[8px] uppercase tracking-[0.25em] text-gold-dark/70">
              Console
            </p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-[2px] px-3 py-2 font-[family-name:var(--font-cinzel)] text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive
                      ? 'bg-gold-light/40 text-gold-dark'
                      : 'text-ink/52 hover:bg-gold-light/20 hover:text-charcoal'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-gold-dark/15 p-3">
            <Link
              to="/"
              className="block px-3 py-2 font-[family-name:var(--font-jost)] text-xs text-gold-dark/85 hover:text-charcoal transition-colors duration-300"
            >
              ← View storefront
            </Link>
            <button
              type="button"
              className="mt-1 w-full px-3 py-2 text-left font-[family-name:var(--font-jost)] text-xs text-ink/40 hover:text-charcoal transition-colors duration-300"
              onClick={() => {
                lock()
                window.location.href = '/dashboard/login'
              }}
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-gold-dark/15 px-4 py-4 md:hidden">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Logo size="sm" />
            </Link>
            <Link
              to="/"
              className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-wider text-gold-dark"
            >
              Store
            </Link>
          </header>
          <div className="border-b border-gold-dark/15 px-4 py-2 md:hidden">
            <nav className="flex flex-wrap gap-2">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-[40px] border px-3 py-1 font-[family-name:var(--font-cinzel)] text-[8px] uppercase tracking-wider ${
                      isActive
                        ? 'border-gold-dark bg-gold-light/35 text-gold-dark'
                        : 'border-gold-dark/25 text-ink/58'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <main className="flex-1 overflow-auto p-4 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
