import { useMemo, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { LayoutGroup, motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { ProductCard } from '../components/ui/ProductCard'
import { ProductGridSkeleton } from '../components/ui/ProductGridSkeleton'
import type { OilType, ProductCategory } from '../types/product'
import { useCatalogStore } from '../store/catalogStore'
import { useShopCategoryStore } from '../store/shopCategoryStore'
import { useWishlist } from '../hooks/useWishlist'

const OILS: { value: OilType; label: string }[] = [
  { value: 'argan', label: 'Argan' },
  { value: 'rosehip', label: 'Rosehip' },
  { value: 'mint', label: 'Mint' },
  { value: 'lavender', label: 'Lavender' },
  { value: 'black-seed', label: 'Black Seed' },
  { value: 'rosemary', label: 'Rosemary' },
  { value: 'jojoba', label: 'Jojoba' },
  { value: 'neroli', label: 'Neroli' },
  { value: 'other', label: 'Other' },
]

type SortKey = 'newest' | 'price-asc' | 'bestselling'

function EmptyBotanical() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <svg
        className="mb-8 h-40 w-40 text-gold/25"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden
      >
        <ellipse cx="60" cy="60" rx="50" ry="45" stroke="currentColor" />
        <path
          d="M60 25c18 22 22 48 8 70M35 65c12-18 35-14 45 5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
      <p className="font-[family-name:var(--font-cormorant)] text-2xl italic text-ink/78">
        No products found
      </p>
      <p className="mt-2 max-w-sm font-[family-name:var(--font-jost)] text-sm text-ink/44">
        Adjust your filters — the apothecary still holds more elixirs.
      </p>
    </div>
  )
}

export default function ShopPage() {
  const catalog = useCatalogStore((s) => s.products)
  const shopCategories = useShopCategoryStore((s) => s.categories)
  const [searchParams, setSearchParams] = useSearchParams()
  const wishOnly = searchParams.get('wishlist') === '1'
  const { ids: wishIds } = useWishlist()

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [oils, setOils] = useState<OilType[]>([])
  const [sort, setSort] = useState<SortKey>('newest')

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 420)
    return () => window.clearTimeout(t)
  }, [])

  const toggleCat = (c: ProductCategory) => {
    setCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    )
  }

  const toggleOil = (o: OilType) => {
    setOils((prev) =>
      prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o],
    )
  }

  const filtered = useMemo(() => {
    let list = [...catalog]
    if (wishOnly) list = list.filter((p) => wishIds.includes(p.id))
    if (categories.length)
      list = list.filter((p) => categories.includes(p.category))
    if (oils.length) list = list.filter((p) => oils.includes(p.oilType))

    if (sort === 'newest')
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    else if (sort === 'price-asc')
      list.sort((a, b) => a.price - b.price)
    else if (sort === 'bestselling')
      list.sort((a, b) => {
        const ab = a.bestSelling ? 1 : 0
        const bb = b.bestSelling ? 1 : 0
        if (bb !== ab) return bb - ab
        return b.reviews - a.reviews
      })

    return list
  }, [catalog, categories, oils, sort, wishOnly, wishIds])

  const clearWishParam = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('wishlist')
    setSearchParams(next)
  }

  return (
    <PageShell>
      <Helmet>
        <title>Shop Rare Elixir | PURALUXE</title>
        <meta
          name="description"
          content="Browse cold-extracted botanical serums and oils. Face, hair, and body."
        />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="mb-10 border-b border-ink/[0.06] pb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
            Shop
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl italic text-charcoal md:text-5xl">
            All products
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Filter by category and oil type. Wishlist view shows only saved items.
          </p>
          {wishOnly && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm font-medium text-ink underline-offset-4 hover:underline"
              onClick={clearWishParam}
            >
              Show all products
            </motion.button>
          )}
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-10">
          <aside className="lg:w-64 lg:shrink-0">
            <div className="space-y-10 rounded-2xl bg-paper p-6 ring-1 ring-ink/[0.06] lg:sticky lg:top-28">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Category
                </h2>
                <ul className="mt-3 space-y-2">
                  {shopCategories.map((c) => (
                    <li key={c.id}>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/85">
                        <input
                          type="checkbox"
                          checked={categories.includes(c.id)}
                          onChange={() => toggleCat(c.id)}
                          className="border-gold-dark/50 text-gold-dark focus:ring-gold"
                        />
                        {c.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Oil type
                </h2>
                <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto pr-1">
                  {OILS.map((o) => (
                    <li key={o.value}>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/85">
                        <input
                          type="checkbox"
                          checked={oils.includes(o.value)}
                          onChange={() => toggleOil(o.value)}
                          className="border-gold-dark/50"
                        />
                        {o.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label
                  htmlFor="sort-shop"
                  className="text-xs font-semibold uppercase tracking-wider text-charcoal"
                >
                  Sort by
                </label>
                <select
                  id="sort-shop"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="mt-2 w-full rounded-xl border border-ink/12 bg-cream/30 px-3 py-2.5 text-sm text-ink outline-none transition-shadow focus:border-gold-dark/35 focus:ring-2 focus:ring-gold-light/40"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price · low to high</option>
                  <option value="bestselling">Best selling</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : filtered.length === 0 ? (
              <EmptyBotanical />
            ) : (
              <LayoutGroup>
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {filtered.map((p) => (
                    <motion.div key={p.id} layout transition={{ duration: 0.35 }}>
                      <ProductCard product={p} variant="shop" enableLayout />
                    </motion.div>
                  ))}
                </motion.div>
              </LayoutGroup>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
