import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import { WILAYAS } from '../data/wilayas'
import { useCartStore } from '../store/cartStore'
import { useOrdersStore } from '../store/ordersStore'

const checkoutField =
  'mt-2 w-full rounded-xl border border-ink/12 bg-paper px-4 py-3 text-ink outline-none transition-shadow focus:border-gold-dark/35 focus:ring-2 focus:ring-gold-light/40'

type Step = 1 | 2 | 3

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getShipping = useCartStore((s) => s.getShipping)
  const getDiscount = useCartStore((s) => s.getDiscount)
  const getTotal = useCartStore((s) => s.getTotal)
  const clearCart = useCartStore((s) => s.clearCart)
  const addOrder = useOrdersStore((s) => s.addOrder)

  const [step, setStep] = useState<Step>(1)
  const [cod, setCod] = useState(true)
  const [orderNo, setOrderNo] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    city: '',
    address: '',
    notes: '',
  })

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }))

  const canShip =
    form.fullName.trim() &&
    form.phone.trim() &&
    form.wilaya &&
    form.city.trim() &&
    form.address.trim()

  const submitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canShip) return
    setStep(2)
  }

  const placeOrder = () => {
    const n = `PLX-${Date.now().toString(36).toUpperCase()}`
    const lines = useCartStore.getState().items
    addOrder({
      id: n,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: form.fullName,
        phone: form.phone,
        wilaya: form.wilaya,
        city: form.city,
        address: form.address,
        notes: form.notes,
      },
      cod,
      items: lines.map((l) => ({
        name: l.name,
        slug: l.slug,
        quantity: l.quantity,
        volumeMl: l.volumeMl,
        unitPrice: l.unitPrice,
        lineTotal: l.unitPrice * l.quantity,
        image: l.image,
      })),
      subtotal: getSubtotal(),
      shipping: getShipping(),
      discount: getDiscount(),
      total: getTotal(),
    })
    setOrderNo(n)
    clearCart()
    setStep(3)
  }

  if (items.length === 0 && step !== 3) {
    return (
      <PageShell>
        <Helmet>
          <title>Checkout | PURALUXE</title>
        </Helmet>
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl italic text-ink/78">
            Your cart is empty.
          </p>
          <Link to="/shop" className="mt-8 inline-block">
            <Button variant="solid">Return to shop</Button>
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Helmet>
        <title>Checkout | PURALUXE</title>
      </Helmet>
      <div className="mx-auto max-w-3xl px-4 pb-24 md:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-muted">
          {([1, 2, 3] as const).map((s) => (
            <span
              key={s}
              className={`rounded-full px-3 py-1 ${
                step >= s ? 'bg-charcoal text-white' : 'bg-ink/[0.06]'
              }`}
            >
              {s}. {s === 1 ? 'Shipping' : s === 2 ? 'Review' : 'Done'}
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="s1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              onSubmit={submitShipping}
              className="space-y-6"
            >
              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal">
                Shipping
              </h1>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Full name
                </label>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className={checkoutField}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={checkoutField}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Wilaya
                </label>
                <select
                  required
                  value={form.wilaya}
                  onChange={(e) => update('wilaya', e.target.value)}
                  className={checkoutField}
                >
                  <option value="">Select wilaya</option>
                  {WILAYAS.map((w) => (
                    <option key={w.code} value={w.name}>
                      {w.code} — {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  City
                </label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className={checkoutField}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Address
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  className={checkoutField}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Delivery notes
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  className={checkoutField}
                  placeholder="Optional"
                />
              </div>

              <div className="rounded-2xl bg-cream/50 p-5 ring-1 ring-ink/[0.06]">
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Payment
                </p>
                <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={cod}
                    onChange={() => setCod((c) => !c)}
                    className="accent-gold"
                  />
                  Cash on delivery (COD) — primary for Algeria
                </label>
                {!cod && (
                  <p className="mt-2 text-xs text-ink/44">
                    Additional methods may be offered soon. COD remains our
                    recommended option.
                  </p>
                )}
              </div>

              <Button variant="solid" type="submit" disabled={!canShip}>
                Continue to review
              </Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal">
                Review order
              </h1>
              <div className="mt-8 space-y-4 rounded-2xl bg-paper p-6 text-sm leading-relaxed text-muted ring-1 ring-ink/[0.06]">
                <p>
                  <span className="font-semibold text-charcoal">Ship to</span>
                  <br />
                  {form.fullName}
                  <br />
                  {form.phone}
                  <br />
                  {form.address}, {form.city}, {form.wilaya}
                </p>
                {form.notes && (
                  <p>
                    <span className="font-semibold text-charcoal">Notes</span>
                    <br />
                    {form.notes}
                  </p>
                )}
                <p>
                  <span className="font-semibold text-charcoal">Payment</span>
                  <br />
                  {cod ? 'Cash on delivery' : 'As selected'}
                </p>
              </div>
              <ul className="mt-6 space-y-3 border-t border-ink/[0.08] pt-6">
                {items.map((l) => (
                  <li
                    key={l.lineId}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {l.name} × {l.quantity}{' '}
                      <span className="text-muted">
                        ({l.volumeMl} ml)
                      </span>
                    </span>
                    <span className="font-medium text-ink">
                      {(l.unitPrice * l.quantity).toLocaleString()} DZD
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 border-t border-ink/[0.08] pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium">{getSubtotal().toLocaleString()} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>
                    {getShipping() === 0
                      ? 'Complimentary'
                      : `${getShipping().toLocaleString()} DZD`}
                  </span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-gold-dark">
                    <span>Discount</span>
                    <span>−{getDiscount().toLocaleString()} DZD</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-ink/[0.08] pt-3 text-base font-semibold text-charcoal">
                  <span>Total</span>
                  <span>{getTotal().toLocaleString()} DZD</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="outline" type="button" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="solid" type="button" onClick={placeOrder}>
                  Place order
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="text-center py-8"
            >
              <motion.div
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-charcoal text-3xl text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                ✓
              </motion.div>
              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal">
                Merci — your ritual is confirmed
              </h1>
              <p className="mt-4 text-muted">
                Order number{' '}
                <span className="font-mono text-sm font-semibold text-ink">
                  {orderNo}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted">
                Estimated delivery: 3–6 business days within Algeria.
              </p>
              <Link to="/shop" className="mt-10 inline-block">
                <Button variant="outline">Continue shopping</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}
