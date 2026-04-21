import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '../../components/ui/Button'
import { useShopCategoryStore } from '../../store/shopCategoryStore'
import { useToastStore } from '../../store/toastStore'

export default function DashboardCategories() {
  const categories = useShopCategoryStore((s) => s.categories)
  const addCategory = useShopCategoryStore((s) => s.addCategory)
  const updateLabel = useShopCategoryStore((s) => s.updateLabel)
  const removeCategory = useShopCategoryStore((s) => s.removeCategory)
  const moveCategory = useShopCategoryStore((s) => s.moveCategory)
  const resetToDefaults = useShopCategoryStore((s) => s.resetToDefaults)
  const push = useToastStore((s) => s.push)

  const [newLabel, setNewLabel] = useState('')
  const [edits, setEdits] = useState<Record<string, string>>({})

  const labelFor = (id: string, fallback: string) =>
    edits[id] !== undefined ? edits[id] : fallback

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const r = addCategory(newLabel)
    if (r.ok) {
      setNewLabel('')
      push('Category added.', 'info')
    } else push(r.error, 'info')
  }

  const onSaveRow = (id: string, fallback: string) => {
    const v = (edits[id] ?? fallback).trim()
    if (!v) {
      push('Category name cannot be empty.', 'info')
      return
    }
    updateLabel(id, v)
    setEdits((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    push('Saved.', 'info')
  }

  return (
    <div>
      <Helmet>
        <title>Categories | Atelier console</title>
      </Helmet>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
          Shop categories
        </h1>
        <p className="mt-2 max-w-xl font-[family-name:var(--font-jost)] text-sm text-ink/48">
          These labels appear in the shop sidebar filter and when you assign a category to a
          product. IDs are generated from the name (e.g. &quot;Hair care&quot; →{' '}
          <span className="text-gold-dark/90">hair-care</span>).
        </p>
      </div>

      <form
        onSubmit={onAdd}
        className="mb-10 flex flex-col gap-3 rounded-[2px] border border-gold-dark/15 bg-gold-light/20 p-4 sm:flex-row sm:items-end"
      >
        <div className="min-w-0 flex-1">
          <label
            htmlFor="new-cat"
            className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
          >
            New category
          </label>
          <input
            id="new-cat"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Beard"
            className="mt-2 w-full border border-gold-dark/30 bg-cream px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
          />
        </div>
        <Button variant="solid" type="submit" className="shrink-0">
          Add
        </Button>
      </form>

      <div className="overflow-x-auto rounded-[2px] border border-gold-dark/15">
        <table className="w-full min-w-[640px] border-collapse text-left font-[family-name:var(--font-jost)] text-sm">
          <thead>
            <tr className="border-b border-gold-dark/15 bg-gold-light/30 font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark">
              <th className="p-3">Order</th>
              <th className="p-3">ID</th>
              <th className="p-3">Label (shop + catalog)</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-gold-dark/10 text-ink/85">
                <td className="p-3">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="rounded border border-gold-dark/20 px-2 py-1 font-[family-name:var(--font-cinzel)] text-[8px] uppercase tracking-wider text-gold-dark hover:bg-gold-light/40"
                      onClick={() => moveCategory(c.id, 'up')}
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="rounded border border-gold-dark/20 px-2 py-1 font-[family-name:var(--font-cinzel)] text-[8px] uppercase tracking-wider text-gold-dark hover:bg-gold-light/40"
                      onClick={() => moveCategory(c.id, 'down')}
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                  </div>
                </td>
                <td className="p-3 font-mono text-xs text-ink/55">{c.id}</td>
                <td className="p-3">
                  <input
                    value={labelFor(c.id, c.label)}
                    onChange={(e) =>
                      setEdits((prev) => ({ ...prev, [c.id]: e.target.value }))
                    }
                    className="w-full min-w-[160px] border border-gold-dark/25 bg-cream px-3 py-2 text-ink outline-none focus:border-gold-dark rounded-[2px]"
                  />
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-wider text-gold-dark hover:text-charcoal transition-colors duration-300"
                      onClick={() => onSaveRow(c.id, c.label)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-wider text-ink/45 hover:text-red-700 transition-colors duration-300"
                      onClick={() => {
                        const r = removeCategory(c.id)
                        if (r.ok) push('Category removed.', 'info')
                        else push(r.error, 'info')
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 border-t border-gold-dark/15 pt-6">
        <p className="font-[family-name:var(--font-jost)] text-xs text-ink/45">
          Reset names and order to Face, Hair, and Body. This does not delete products.
        </p>
        <Button
          variant="outline"
          type="button"
          className="mt-3"
          onClick={() => {
            if (
              window.confirm(
                'Reset category list to defaults (Face, Hair, Body)? This only works if no products use custom category IDs.',
              )
            ) {
              const r = resetToDefaults()
              if (r.ok) push('Defaults restored.', 'info')
              else push(r.error, 'info')
            }
          }}
        >
          Reset to defaults
        </Button>
      </div>
    </div>
  )
}
