import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { Button } from '../ui/Button'

export function CartDrawer() {
  const open = useCartStore((s) => s.drawerOpen)
  const setOpen = useCartStore((s) => s.setDrawerOpen)
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeLine = useCartStore((s) => s.removeLine)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getShipping = useCartStore((s) => s.getShipping)
  const getTotal = useCartStore((s) => s.getTotal)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[160] bg-charcoal/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[170] flex h-full w-full max-w-md flex-col border-l border-ink/[0.06] bg-paper shadow-[0_0_80px_-20px_rgb(0_0_0/0.2)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-ink/[0.06] px-6 py-5">
              <h2 className="text-lg font-semibold tracking-tight text-charcoal">
                Your cart
              </h2>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-12 text-center text-sm text-muted">
                  Nothing here yet—add something you love.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((line) => (
                    <li
                      key={line.lineId}
                      className="flex gap-4 border-b border-ink/[0.06] pb-6"
                    >
                      <img
                        src={line.image}
                        alt=""
                        className="h-24 w-20 shrink-0 rounded-xl object-cover ring-1 ring-ink/[0.06]"
                      />
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/product/${line.slug}`}
                          className="font-[family-name:var(--font-cormorant)] text-lg text-ink transition-colors hover:text-gold-dark"
                          onClick={() => setOpen(false)}
                        >
                          {line.name}
                        </Link>
                        <p className="text-xs text-muted">
                          {line.volumeMl} ml · {line.unitPrice.toLocaleString()} DZD
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <div className="flex items-center overflow-hidden rounded-lg border border-ink/12">
                            <button
                              type="button"
                              className="px-3 py-1.5 text-sm text-ink transition-colors hover:bg-ink/[0.04]"
                              onClick={() =>
                                updateQuantity(line.lineId, line.quantity - 1)
                              }
                            >
                              −
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-medium text-ink">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              className="px-3 py-1.5 text-sm text-ink transition-colors hover:bg-ink/[0.04]"
                              onClick={() =>
                                updateQuantity(line.lineId, line.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
                            onClick={() => removeLine(line.lineId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-3 border-t border-ink/[0.06] px-6 py-5">
              <div className="flex justify-between text-sm text-ink">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">{getSubtotal().toLocaleString()} DZD</span>
              </div>
              <div className="flex justify-between text-sm text-ink">
                <span className="text-muted">Shipping</span>
                <span>
                  {getShipping() === 0
                    ? items.length
                      ? 'Complimentary'
                      : '—'
                    : `${getShipping().toLocaleString()} DZD`}
                </span>
              </div>
              <div className="flex justify-between border-t border-ink/[0.06] pt-3 text-base font-semibold text-charcoal">
                <span>Total</span>
                <span>{getTotal().toLocaleString()} DZD</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/cart" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    View full cart
                  </Button>
                </Link>
                <Link to="/checkout" onClick={() => setOpen(false)}>
                  <Button variant="solid" className="w-full">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
