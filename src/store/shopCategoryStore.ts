import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useCatalogStore } from './catalogStore'

export interface ShopCategory {
  id: string
  label: string
}

const DEFAULT_CATEGORIES: ShopCategory[] = [
  { id: 'face', label: 'Face' },
  { id: 'hair', label: 'Hair' },
  { id: 'body', label: 'Body' },
]

function slugify(raw: string): string {
  const s = raw
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return s || 'category'
}

function uniqueId(base: string, existing: ShopCategory[]): string {
  let id = base
  let n = 0
  while (existing.some((c) => c.id === id)) {
    n += 1
    id = `${base}-${n}`
  }
  return id
}

interface ShopCategoryState {
  categories: ShopCategory[]
  /** Label for display, or the raw id if missing (e.g. legacy data). */
  getLabel: (id: string) => string
  addCategory: (label: string) => { ok: true; id: string } | { ok: false; error: string }
  updateLabel: (id: string, label: string) => void
  removeCategory: (id: string) => { ok: true } | { ok: false; error: string }
  moveCategory: (id: string, dir: 'up' | 'down') => void
  resetToDefaults: () => { ok: true } | { ok: false; error: string }
}

export const useShopCategoryStore = create<ShopCategoryState>()(
  persist(
    (set, get) => ({
      categories: [...DEFAULT_CATEGORIES],

      getLabel: (id) => {
        const c = get().categories.find((x) => x.id === id)
        return c?.label ?? id
      },

      addCategory: (label) => {
        const trimmed = label.trim()
        if (!trimmed) return { ok: false, error: 'Enter a category name.' }
        const base = slugify(trimmed)
        const list = get().categories
        const id = uniqueId(base, list)
        set({ categories: [...list, { id, label: trimmed }] })
        return { ok: true, id }
      },

      updateLabel: (id, label) => {
        const trimmed = label.trim()
        if (!trimmed) return
        set((s) => ({
          categories: s.categories.map((c) =>
            c.id === id ? { ...c, label: trimmed } : c,
          ),
        }))
      },

      removeCategory: (id) => {
        const products = useCatalogStore.getState().products
        if (products.some((p) => p.category === id)) {
          return {
            ok: false,
            error:
              'Remove or reassign products using this category before deleting it.',
          }
        }
        set((s) => ({
          categories: s.categories.filter((c) => c.id !== id),
        }))
        return { ok: true }
      },

      moveCategory: (id, dir) => {
        const list = [...get().categories]
        const i = list.findIndex((c) => c.id === id)
        if (i < 0) return
        const j = dir === 'up' ? i - 1 : i + 1
        if (j < 0 || j >= list.length) return
        ;[list[i], list[j]] = [list[j], list[i]]
        set({ categories: list })
      },

      resetToDefaults: () => {
        const defaultIds = new Set(DEFAULT_CATEGORIES.map((c) => c.id))
        const products = useCatalogStore.getState().products
        const orphan = [
          ...new Set(
            products.map((p) => p.category).filter((id) => !defaultIds.has(id)),
          ),
        ]
        if (orphan.length > 0) {
          return {
            ok: false,
            error: `Cannot reset while products use non-default categories: ${orphan.join(', ')}.`,
          }
        }
        set({ categories: [...DEFAULT_CATEGORIES] })
        return { ok: true }
      },
    }),
    { name: 'puraluxe-shop-categories' },
  ),
)
