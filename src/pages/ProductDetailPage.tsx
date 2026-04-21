import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import { ProductCard } from '../components/ui/ProductCard'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { useCatalogStore } from '../store/catalogStore'
import type { ProductVolume } from '../types/product'
import { useCartStore } from '../store/cartStore'
import { useToastStore } from '../store/toastStore'
import { useWishlist } from '../hooks/useWishlist'

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  return (
    <span className="text-gold" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? '★' : '☆'}</span>
      ))}
    </span>
  )
}

function Accordion({
  title,
  children,
  open,
  onToggle,
}: {
  title: string
  children: React.ReactNode
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-ink/[0.08]">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-charcoal transition-colors hover:text-ink"
        onClick={onToggle}
        aria-expanded={open}
      >
        {title}
        <span className="text-lg font-light text-muted">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed text-muted">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const catalog = useCatalogStore((s) => s.products)
  const product = slug ? getProductBySlug(slug, catalog) : undefined

  const [imgIdx, setImgIdx] = useState(0)
  const [vol, setVol] = useState<ProductVolume | null>(null)
  const [qty, setQty] = useState(1)
  const [acc, setAcc] = useState<string | null>('description')

  const addItem = useCartStore((s) => s.addItem)
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen)
  const pushToast = useToastStore((s) => s.push)
  const { toggle, has } = useWishlist()

  const thumbMap = useMemo(() => {
    if (!product) return [0, 0, 0] as const
    const n = product.images.length
    if (n >= 3) return [0, 1, 2] as const
    if (n === 2) return [0, 1, 0] as const
    return [0, 0, 0] as const
  }, [product])

  const selectedVol = useMemo(() => {
    if (!product) return null
    if (vol) return vol
    return (
      product.volumes.find((v) => v.ml === 30) ??
      product.volumes.find((v) => v.ml === 10) ??
      product.volumes[0]
    )
  }, [product, vol])

  if (!product) {
    return <Navigate to="/404" replace />
  }

  const related = getRelatedProducts(product.slug, catalog, 4)

  const addToCart = () => {
    if (!selectedVol) return
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      volumeMl: selectedVol.ml,
      unitPrice: selectedVol.price,
      quantity: qty,
    })
    pushToast(`${product.name} (${selectedVol.ml}ml) added to cart.`)
    setDrawerOpen(true)
  }

  const wish = () => {
    const on = has(product.id)
    toggle(product.id)
    pushToast(on ? 'Removed from wishlist.' : 'Saved to wishlist.', 'info')
  }

  const toggleAcc = (id: string) =>
    setAcc((a) => (a === id ? null : id))

  return (
    <PageShell>
      <Helmet>
        <title>
          {product.name} | PURALUXE Rare Elixir
        </title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="mb-8">
          <Link
            to="/shop"
            className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            ← Back to shop
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-cream ring-1 ring-ink/[0.06] shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images[thumbMap[imgIdx]]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
              </div>
            </motion.div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {([0, 1, 2] as const).map((slot) => {
                const src = product.images[thumbMap[slot]]
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setImgIdx(slot)}
                    className={`overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      imgIdx === slot
                        ? 'border-charcoal ring-2 ring-charcoal/10'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="aspect-square h-full w-full object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
              PURALUXE
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl italic text-charcoal md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 font-[family-name:var(--font-cormorant)] text-xl italic text-muted">
              {product.tagline}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <Stars rating={product.rating} />
              <span className="text-muted">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-charcoal">
              Volume
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.volumes.map((v) => (
                <button
                  key={v.ml}
                  type="button"
                  onClick={() => setVol(v)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    selectedVol?.ml === v.ml
                      ? 'border-charcoal bg-charcoal text-white'
                      : 'border-ink/15 text-ink hover:border-ink/25'
                  }`}
                >
                  {v.ml} ml · {v.price.toLocaleString()} DZD
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Quantity
                </p>
                <div className="mt-2 flex items-center overflow-hidden rounded-xl border border-ink/12 bg-paper">
                  <button
                    type="button"
                    className="px-4 py-2.5 text-ink transition-colors hover:bg-ink/[0.04]"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="min-w-[2.5rem] text-center font-medium text-ink">
                    {qty}
                  </span>
                  <button
                    type="button"
                    className="px-4 py-2.5 text-ink transition-colors hover:bg-ink/[0.04]"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
                <Button variant="solid" className="min-w-[200px]" onClick={addToCart}>
                  Add to cart
                </Button>
                <Button variant="outline" onClick={wish}>
                  {has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                </Button>
              </div>
            </div>

            <div className="mt-12">
              <Accordion
                title="Description"
                open={acc === 'description'}
                onToggle={() => toggleAcc('description')}
              >
                {product.description}
              </Accordion>
              <Accordion
                title="Key ingredients"
                open={acc === 'ingredients'}
                onToggle={() => toggleAcc('ingredients')}
              >
                <ul className="list-inside list-disc space-y-1">
                  {product.ingredients.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion
                title="How to use"
                open={acc === 'use'}
                onToggle={() => toggleAcc('use')}
              >
                Apply 2–4 drops to clean skin, scalp, or lengths. Pat gently;
                allow absorption before layering. Patch test first.
              </Accordion>
              <Accordion
                title="Shipping info"
                open={acc === 'shipping'}
                onToggle={() => toggleAcc('shipping')}
              >
                Orders ship within 2–3 business days across Algeria. Free
                shipping over 5,000 DZD. Amber glass may require signature on
                delivery.
              </Accordion>
            </div>
          </div>
        </div>

        <section className="mt-24 border-t border-ink/[0.06] pt-16">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal">
            You may also like
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} variant="featured" />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
