import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCatalogStore } from '../../store/catalogStore'
import { Modal } from '../ui/Modal'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const catalog = useCatalogStore((s) => s.products)

  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    return catalog.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.tagline.toLowerCase().includes(t) ||
        p.slug.replace(/-/g, ' ').includes(t),
    ).slice(0, 8)
  }, [q, catalog])

  const go = (slug: string) => {
    navigate(`/product/${slug}`)
    onClose()
    setQ('')
  }

  return (
    <Modal open={open} onClose={onClose} title="Search">
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try mint, argan, rose…"
        className="mb-6 w-full rounded-xl border border-ink/12 bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-muted/60 outline-none transition-shadow focus:border-gold-dark/35 focus:ring-2 focus:ring-gold-light/40"
      />
      <ul className="max-h-72 space-y-1 overflow-y-auto">
        {results.length === 0 && q.trim() && (
          <li className="text-sm text-muted">No products match that search.</li>
        )}
        {results.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-ink/[0.04]"
              onClick={() => go(p.slug)}
            >
              <img
                src={p.images[0]}
                alt=""
                className="h-12 w-10 rounded-lg object-cover ring-1 ring-ink/[0.06]"
              />
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-cormorant)] text-lg text-ink">
                  {p.name}
                </p>
                <p className="truncate text-xs text-muted">{p.tagline}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
