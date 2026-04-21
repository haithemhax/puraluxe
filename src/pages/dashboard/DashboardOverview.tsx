import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCatalogStore } from '../../store/catalogStore'
import { useOrdersStore } from '../../store/ordersStore'

export default function DashboardOverview() {
  const skuCount = useCatalogStore((s) => s.products.length)
  const orders = useOrdersStore((s) => s.orders)

  const stats = useMemo(() => {
    const revenue = orders.reduce((s, o) => s + o.total, 0)
    const pending = orders.filter((o) => o.status === 'new' || o.status === 'processing').length
    const shipped = orders.filter((o) => o.status === 'shipped' || o.status === 'delivered').length
    return { revenue, pending, shipped, count: orders.length }
  }, [orders])

  const cards = [
    { label: 'Products in catalog', value: String(skuCount), to: '/dashboard/products' },
    { label: 'Orders', value: String(stats.count), to: '/dashboard/orders' },
    { label: 'Revenue (DZD)', value: stats.revenue.toLocaleString(), to: '/dashboard/orders' },
    { label: 'Open / active', value: String(stats.pending), to: '/dashboard/orders' },
  ]

  return (
    <div>
      <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
        Overview
      </h1>
      <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/48">
        Snapshot of the storefront and checkout activity (stored in this browser).
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={c.to}
              className="block border border-gold-dark/20 bg-gold-light/20 p-6 rounded-[2px] transition-colors duration-300 hover:border-gold-dark/40"
            >
              <p className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.25em] text-gold/80">
                {c.label}
              </p>
              <p className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl text-charcoal">
                {c.value}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 border border-gold-dark/15 p-6 rounded-[2px]">
        <h2 className="font-[family-name:var(--font-cinzel)] text-[10px] uppercase tracking-[0.3em] text-gold-dark">
          Quick actions
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3 font-[family-name:var(--font-jost)] text-sm">
          <li>
            <Link className="text-gold-dark hover:text-charcoal transition-colors duration-300" to="/shop">
              Open shop
            </Link>
          </li>
          <li className="text-ink/22">·</li>
          <li>
            <Link className="text-gold-dark hover:text-charcoal transition-colors duration-300" to="/">
              Home page
            </Link>
          </li>
          <li className="text-ink/22">·</li>
          <li>
            <Link className="text-gold-dark hover:text-charcoal transition-colors duration-300" to="/dashboard/orders">
              Manage orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
