/** Category id from the shop category config (dashboard → Categories). */
export type ProductCategory = string

export type OilType =
  | 'argan'
  | 'rosehip'
  | 'mint'
  | 'lavender'
  | 'black-seed'
  | 'rosemary'
  | 'jojoba'
  | 'neroli'
  | 'other'

export interface ProductVolume {
  ml: number
  price: number
}

export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  shortDescription: string
  price: number
  volumes: ProductVolume[]
  category: ProductCategory
  oilType: OilType
  ingredients: string[]
  benefits: string[]
  rating: number
  reviews: number
  images: string[]
  bestSelling?: boolean
  createdAt: string
  /** Added via dashboard — can be removed from catalog */
  source?: 'seed' | 'owner'
}
