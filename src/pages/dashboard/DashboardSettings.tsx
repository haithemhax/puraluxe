import { useDashboardAuthStore } from '../../store/dashboardAuthStore'
import { useOrdersStore } from '../../store/ordersStore'
import { useCatalogStore } from '../../store/catalogStore'
import { Button } from '../../components/ui/Button'

export default function DashboardSettings() {
  const lock = useDashboardAuthStore((s) => s.lock)
  const clearAll = useOrdersStore((s) => s.clearAll)
  const restoreSeedCatalog = useCatalogStore((s) => s.restoreSeedCatalog)

  return (
    <div>
      <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
        Settings
      </h1>
      <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/48">
        Preferences and data saved in this browser.
      </p>
      <div className="mt-10 max-w-lg space-y-8 border border-gold-dark/15 p-6 rounded-[2px]">
        <div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-[10px] uppercase tracking-[0.25em] text-gold-dark">
            Access
          </h2>
          <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/58">
            You stay signed in on this device until you sign out. To open the console again, enter your
            access PIN on the sign-in page.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            type="button"
            onClick={() => {
              lock()
              window.location.href = '/dashboard/login'
            }}
          >
            Sign out
          </Button>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-[10px] uppercase tracking-[0.25em] text-gold-dark">
            Product catalog (this browser)
          </h2>
          <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/58">
            Restores the original PURALUXE product list and removes any products you
            added or deleted. Use this if you removed built-in products and want them
            back.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-amber-700/40 text-amber-900 hover:bg-amber-50"
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  'Reset catalog to default products? Your added products will be removed.',
                )
              )
                restoreSeedCatalog()
            }}
          >
            Restore default products
          </Button>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-[10px] uppercase tracking-[0.25em] text-gold-dark">
            Order history (this browser)
          </h2>
          <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/58">
            Clears saved orders shown under Orders and Customers. Cannot be undone.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-red-400/50 text-red-200 hover:bg-red-950/40 hover:border-red-400"
            type="button"
            onClick={() => {
              if (window.confirm('Delete all stored orders on this device?')) clearAll()
            }}
          >
            Clear all orders
          </Button>
        </div>
      </div>
    </div>
  )
}
