import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import {
  FREE_SHIPPING_THRESHOLD,
  useCartStore,
} from '../store/cartStore'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeLine = useCartStore((s) => s.removeLine)
  const promoCode = useCartStore((s) => s.promoCode)
  const setPromoCode = useCartStore((s) => s.setPromoCode)
  const applyPromo = useCartStore((s) => s.applyPromo)
  const promoApplied = useCartStore((s) => s.promoApplied)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getShipping = useCartStore((s) => s.getShipping)
  const getDiscount = useCartStore((s) => s.getDiscount)
  const getTotal = useCartStore((s) => s.getTotal)

  const sub = getSubtotal()
  const untilFree = Math.max(0, FREE_SHIPPING_THRESHOLD - sub)

  return (
    <PageShell>
      <Helmet>
        <title>Your cart | PURALUXE</title>
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 pb-24 md:px-8">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl italic text-charcoal">
          Cart
        </h1>
        <p className="mt-2 text-sm text-muted">
          Review items before you checkout.
        </p>

        {items.length === 0 ? (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-muted">
              Your cart is empty.
            </p>
            <Link to="/shop" className="mt-6 inline-block">
              <Button variant="solid">Browse products</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {items.map((line) => (
                <motion.div
                  key={line.lineId}
                  layout
                  className="flex gap-4 rounded-2xl bg-paper p-4 ring-1 ring-ink/[0.06]"
                >
                  <img
                    src={line.image}
                    alt=""
                    className="h-28 w-24 shrink-0 rounded-xl object-cover ring-1 ring-ink/[0.06]"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${line.slug}`}
                      className="font-[family-name:var(--font-cormorant)] text-xl text-charcoal hover:text-gold-dark transition-colors duration-300"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted">
                      {line.volumeMl} ml · {line.unitPrice.toLocaleString()} DZD
                      each
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="flex items-center overflow-hidden rounded-lg border border-ink/12">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-ink transition-colors hover:bg-ink/[0.04]"
                          onClick={() =>
                            updateQuantity(line.lineId, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-ink transition-colors hover:bg-ink/[0.04]"
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
                    <p className="mt-3 text-sm font-medium text-ink">
                      Line total ·{' '}
                      {(line.unitPrice * line.quantity).toLocaleString()} DZD
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl bg-paper p-6 ring-1 ring-ink/[0.06]">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Order summary
                </h2>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium">{sub.toLocaleString()} DZD</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-gold-dark">
                      <span>Promo (PURALUXE10)</span>
                      <span>−{getDiscount().toLocaleString()} DZD</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span>
                      {getShipping() === 0
                        ? 'Complimentary'
                        : `${getShipping().toLocaleString()} DZD`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-ink/[0.08] pt-3 text-base font-semibold text-charcoal">
                    <span>Total</span>
                    <span>{getTotal().toLocaleString()} DZD</span>
                  </div>
                </div>
                {untilFree > 0 && sub > 0 && (
                  <p className="mt-4 text-xs text-muted">
                    Add {untilFree.toLocaleString()} DZD more for complimentary
                    shipping.
                  </p>
                )}
                <div className="mt-6 space-y-2">
                  <label
                    htmlFor="promo"
                    className="text-xs font-semibold uppercase tracking-wider text-charcoal"
                  >
                    Promo code
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="PURALUXE10"
                      className="min-w-0 flex-1 rounded-xl border border-ink/12 bg-cream/30 px-3 py-2.5 text-sm text-ink outline-none transition-shadow focus:border-gold-dark/35 focus:ring-2 focus:ring-gold-light/40"
                    />
                    <Button variant="outline" className="shrink-0 px-4" onClick={applyPromo}>
                      Apply
                    </Button>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <Link to="/shop">
                    <Button variant="outline" className="w-full">
                      Continue shopping
                    </Button>
                  </Link>
                  <Link to="/checkout">
                    <Button variant="solid" className="w-full">
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}
