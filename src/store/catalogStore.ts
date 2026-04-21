import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SEED_PRODUCTS } from '../data/products'
import type { Product, ProductCategory } from '../types/product'

function slugify(name: string): string {
  const s = name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return s || 'elixir'
}

function uniqueSlug(base: string, products: Product[]): string {
  let out = base
  let n = 0
  while (products.some((p) => p.slug === out)) {
    n += 1
    out = `${base}-${n}`
  }
  return out
}

export interface OwnerProductInput {
  name: string
  description: string
  price10: number
  price30: number
  imageDataUrl: string
  category: ProductCategory
  tagline?: string
}

interface CatalogState {
  products: Product[]
  addOwnerProduct: (input: OwnerProductInput) => Product
  /** Remove any product from the persisted catalog (seed or owner-added). */
  removeProduct: (id: string) => void
  /** Reset catalog to built-in seed SKUs (removes custom products too). */
  restoreSeedCatalog: () => void
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: [...SEED_PRODUCTS],

      addOwnerProduct: (input) => {
        const products = get().products
        const slug = uniqueSlug(slugify(input.name), products)
        const id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `owner-${Date.now()}`
        const desc = input.description.trim()
        const short =
          desc.length > 130 ? `${desc.slice(0, 127).trim()}…` : desc
        const product: Product = {
          id,
          name: input.name.trim(),
          slug,
          tagline: input.tagline?.trim() || 'Rare Elixir — cosmetic bio',
          description: desc,
          shortDescription: short,
          price: Math.round(input.price30),
          volumes: [
            { ml: 10, price: Math.round(input.price10) },
            { ml: 30, price: Math.round(input.price30) },
          ],
          category: input.category,
          oilType: 'other',
          ingredients: [],
          benefits: [],
          rating: 5,
          reviews: 0,
          images: [input.imageDataUrl],
          createdAt: new Date().toISOString().slice(0, 10),
          source: 'owner',
        }
        set({ products: [...products, product] })
        return product
      },

      removeProduct: (id) =>
        set((s) => ({
          products: s.products.filter((p) => p.id !== id),
        })),

      restoreSeedCatalog: () =>
        set({ products: [...SEED_PRODUCTS] }),
    }),
    { name: 'puraluxe-catalog' },
  ),
)
