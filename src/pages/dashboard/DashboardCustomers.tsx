import { useMemo } from 'react'
import { useOrdersStore } from '../../store/ordersStore'

export default function DashboardCustomers() {
  const orders = useOrdersStore((s) => s.orders)

  const rows = useMemo(() => {
    const map = new Map<
      string,
      { phone: string; name: string; orders: number; spent: number; last: string }
    >()
    for (const o of orders) {
      const key = o.customer.phone.trim() || o.customer.fullName
      const prev = map.get(key)
      const spent = o.total
      if (!prev) {
        map.set(key, {
          phone: o.customer.phone,
          name: o.customer.fullName,
          orders: 1,
          spent,
          last: o.createdAt,
        })
      } else {
        prev.orders += 1
        prev.spent += spent
        if (new Date(o.createdAt) > new Date(prev.last)) prev.last = o.createdAt
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.last).getTime() - new Date(a.last).getTime(),
    )
  }, [orders])

  return (
    <div>
      <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
        Customers
      </h1>
      <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/48">
        Derived from completed orders (same browser). Not a full CRM.
      </p>
      {rows.length === 0 ? (
        <p className="mt-12 font-[family-name:var(--font-cormorant)] text-xl italic text-ink/44">
          No customer records yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-[2px] border border-gold-dark/15">
          <table className="w-full min-w-[560px] border-collapse text-left font-[family-name:var(--font-jost)] text-sm">
            <thead>
              <tr className="border-b border-gold-dark/15 bg-gold-light/30 font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Lifetime (DZD)</th>
                <th className="p-3">Last order</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={`${r.phone}::${r.name}`}
                  className="border-b border-gold-dark/10 text-ink/85"
                >
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3">{r.orders}</td>
                  <td className="p-3 text-gold-dark">{r.spent.toLocaleString()}</td>
                  <td className="p-3 text-ink/52">
                    {new Date(r.last).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
