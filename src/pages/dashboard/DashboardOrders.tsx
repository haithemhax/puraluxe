import { useState } from 'react'
import { useOrdersStore } from '../../store/ordersStore'
import type { OrderStatus } from '../../types/order'

const STATUS_OPTIONS: OrderStatus[] = ['new', 'processing', 'shipped', 'delivered']

export default function DashboardOrders() {
  const orders = useOrdersStore((s) => s.orders)
  const setOrderStatus = useOrdersStore((s) => s.setOrderStatus)
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div>
      <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
        Orders
      </h1>
      <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/48">
        Saved when customers complete checkout on this device. Export or sync requires a backend.
      </p>
      {orders.length === 0 ? (
        <p className="mt-12 font-[family-name:var(--font-cormorant)] text-xl italic text-ink/44">
          No orders yet. Complete a test checkout to see data here.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => {
            const expanded = openId === o.id
            return (
              <div
                key={o.id}
                className="border border-gold-dark/15 bg-cream rounded-[2px] overflow-hidden"
              >
                <button
                  type="button"
                  className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 text-left transition-colors duration-300 hover:bg-gold/5"
                  onClick={() => setOpenId(expanded ? null : o.id)}
                >
                  <div>
                    <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-wider text-gold-dark">
                      {o.id}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-jost)] text-sm text-ink">
                      {o.customer.fullName} · {o.customer.phone}
                    </p>
                    <p className="text-xs text-ink/44">
                      {new Date(o.createdAt).toLocaleString()} · {o.customer.wilaya}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-[family-name:var(--font-cinzel)] text-xs text-gold-dark">
                      {o.total.toLocaleString()} DZD
                    </span>
                    <select
                      value={o.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setOrderStatus(o.id, e.target.value as OrderStatus)
                      }
                      className="border border-gold-dark/30 bg-paper px-2 py-1 text-xs text-ink outline-none focus:border-gold-dark rounded-[2px]"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </button>
                {expanded && (
                  <div className="border-t border-gold-dark/10 px-4 py-4 font-[family-name:var(--font-jost)] text-sm text-ink/72">
                    <p>
                      <span className="text-gold-dark">Address</span>
                      <br />
                      {o.customer.address}, {o.customer.city}
                    </p>
                    {o.customer.notes && (
                      <p className="mt-2">
                        <span className="text-gold-dark">Notes</span>
                        <br />
                        {o.customer.notes}
                      </p>
                    )}
                    <p className="mt-2">
                      <span className="text-gold-dark">Payment</span>
                      <br />
                      {o.cod ? 'Cash on delivery' : 'As noted'}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-gold-dark/10 pt-4">
                      {o.items.map((line, i) => (
                        <li key={i} className="flex justify-between gap-4">
                          <span>
                            {line.name} × {line.quantity}{' '}
                            <span className="text-ink/40">({line.volumeMl}ml)</span>
                          </span>
                          <span className="text-gold-dark shrink-0">
                            {line.lineTotal.toLocaleString()} DZD
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 space-y-1 text-xs text-ink/48">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{o.subtotal.toLocaleString()} DZD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{o.shipping.toLocaleString()} DZD</span>
                      </div>
                      {o.discount > 0 && (
                        <div className="flex justify-between text-gold-dark">
                          <span>Discount</span>
                          <span>−{o.discount.toLocaleString()} DZD</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
