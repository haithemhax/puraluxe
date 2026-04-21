import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useCatalogStore } from '../../store/catalogStore'
import { useShopCategoryStore } from '../../store/shopCategoryStore'

export default function DashboardProducts() {
  const products = useCatalogStore((s) => s.products)
  const removeProduct = useCatalogStore((s) => s.removeProduct)
  const getCategoryLabel = useShopCategoryStore((s) => s.getLabel)

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
            Products
          </h1>
          <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/48">
            Built-in products come with the catalog; anything you add is saved on this device only.
          </p>
        </div>
        <Link to="/dashboard/products/new">
          <Button variant="solid">Add product</Button>
        </Link>
      </div>
      <div className="mt-2 overflow-x-auto rounded-[2px] border border-gold-dark/15">
        <table className="w-full min-w-[720px] border-collapse text-left font-[family-name:var(--font-jost)] text-sm">
          <thead>
            <tr className="border-b border-gold-dark/15 bg-gold-light/30 font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark">
              <th className="p-3">Name</th>
              <th className="p-3">Source</th>
              <th className="p-3">Category</th>
              <th className="p-3">Oil</th>
              <th className="p-3">Volumes</th>
              <th className="p-3">From (DZD)</th>
              <th className="p-3">Rating</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const minP = Math.min(...p.volumes.map((v) => v.price))
              const volLabel = p.volumes.map((v) => `${v.ml}ml`).join(', ')
              return (
                <tr key={p.id} className="border-b border-gold-dark/10 text-ink/85">
                  <td className="p-3 font-[family-name:var(--font-cormorant)] text-base text-ink">
                    {p.name}
                  </td>
                  <td className="p-3 text-xs uppercase tracking-wider text-gold-dark/80">
                    {p.source === 'owner' ? 'You added' : 'Seed'}
                  </td>
                  <td className="p-3">{getCategoryLabel(p.category)}</td>
                  <td className="p-3 capitalize">{p.oilType.replace('-', ' ')}</td>
                  <td className="p-3 text-xs text-ink/60">{volLabel}</td>
                  <td className="p-3 text-gold-dark">{minP.toLocaleString()}</td>
                  <td className="p-3">
                    {p.rating}{' '}
                    <span className="text-ink/35">({p.reviews})</span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to={`/product/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-wider text-gold-dark hover:text-charcoal transition-colors duration-300"
                      >
                        View live
                      </Link>
                      <button
                        type="button"
                        className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-wider text-ink/45 hover:text-red-700 transition-colors duration-300"
                        onClick={() => {
                          const isSeed = p.source !== 'owner'
                          const msg = isSeed
                            ? `Remove “${p.name}” from this device’s catalog? Default products stay hidden until you use Settings → Restore default products.`
                            : `Remove “${p.name}” from this device’s catalog?`
                          if (window.confirm(msg)) removeProduct(p.id)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
