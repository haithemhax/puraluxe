import type { Product } from '../types/product'

const img = {
  bottle1:
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=80',
  bottle2:
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=900&q=80',
  botanical1:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
  botanical2:
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900&q=80',
  dropper:
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80',
  oil:
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=80',
  herbs:
    'https://images.unsplash.com/photo-1515583244297-0e43f04e6ddd?w=900&q=80',
  spa:
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mint Serum',
    slug: 'mint-serum',
    tagline: 'Refreshing botanical clarity',
    description:
      'Cold-extracted pure peppermint oil serum blended with jojoba and vitamin E for radiant, clarified skin. Crafted in small batches to preserve volatile notes and potency.',
    shortDescription: 'Peppermint cold-extract for clarified, refreshed skin.',
    price: 1800,
    volumes: [
      { ml: 10, price: 1200 },
      { ml: 30, price: 1800 },
      { ml: 50, price: 2800 },
    ],
    category: 'face',
    oilType: 'mint',
    ingredients: ['Mentha piperita oil', 'Jojoba oil', 'Vitamin E'],
    benefits: ['Purifies', 'Refreshes', 'Brightens'],
    rating: 4.8,
    reviews: 124,
    images: [img.dropper, img.bottle1, img.botanical1, img.herbs],
    bestSelling: true,
    createdAt: '2025-11-01',
    source: 'seed',
  },
  {
    id: '2',
    name: 'Argan Oil',
    slug: 'argan-oil',
    tagline: 'Silken weightless nourishment',
    description:
      'Virgin argan kernel oil, cold-pressed and filtered once. Rich in vitamin E and fatty acids for hair lengths, cuticles, and dry areas.',
    shortDescription: 'Virgin cold-pressed argan for hair, skin, and nails.',
    price: 2200,
    volumes: [
      { ml: 10, price: 1500 },
      { ml: 30, price: 2200 },
      { ml: 50, price: 3400 },
    ],
    category: 'hair',
    oilType: 'argan',
    ingredients: ['Argania spinosa kernel oil'],
    benefits: ['Nourishes', 'Softens', 'Protects'],
    rating: 4.9,
    reviews: 312,
    images: [img.bottle2, img.oil, img.bottle1, img.spa],
    bestSelling: true,
    createdAt: '2025-09-15',
    source: 'seed',
  },
  {
    id: '3',
    name: 'Rose Hip Elixir',
    slug: 'rose-hip-elixir',
    tagline: 'Dawn-lit radiance',
    description:
      'CO₂-extracted rose hip seed oil with a naturally golden hue. Ideal for evening rituals and areas that crave renewal.',
    shortDescription: 'Rose hip seed extract for luminous, even-toned skin.',
    price: 2400,
    volumes: [
      { ml: 10, price: 1700 },
      { ml: 30, price: 2400 },
      { ml: 50, price: 3600 },
    ],
    category: 'face',
    oilType: 'rosehip',
    ingredients: ['Rosa canina seed oil', 'Tocopherol'],
    benefits: ['Renews', 'Evens tone', 'Supports barrier'],
    rating: 4.7,
    reviews: 98,
    images: [img.bottle1, img.dropper, img.botanical2, img.oil],
    createdAt: '2025-10-20',
    source: 'seed',
  },
  {
    id: '4',
    name: 'Lavender Serum',
    slug: 'lavender-serum',
    tagline: 'Twilight calm for skin',
    description:
      'High-altitude lavender essential oil in a soothing carrier base. A nightly dropper ritual to unwind the senses.',
    shortDescription: 'Lavender botanical serum for calm, balanced skin.',
    price: 1900,
    volumes: [
      { ml: 10, price: 1300 },
      { ml: 30, price: 1900 },
      { ml: 50, price: 2900 },
    ],
    category: 'face',
    oilType: 'lavender',
    ingredients: ['Lavandula angustifolia oil', 'Sweet almond oil'],
    benefits: ['Soothes', 'Balances', 'Calms'],
    rating: 4.6,
    reviews: 76,
    images: [img.botanical1, img.bottle2, img.herbs, img.dropper],
    createdAt: '2025-08-01',
    source: 'seed',
  },
  {
    id: '5',
    name: 'Black Seed Oil',
    slug: 'black-seed-oil',
    tagline: 'Heritage strength',
    description:
      'Nigella sativa cold-pressed oil, treasured across apothecary traditions. For scalp massage and targeted dry-skin care.',
    shortDescription: 'Cold-pressed nigella for scalp and resilient skin.',
    price: 2100,
    volumes: [
      { ml: 10, price: 1400 },
      { ml: 30, price: 2100 },
      { ml: 50, price: 3200 },
    ],
    category: 'body',
    oilType: 'black-seed',
    ingredients: ['Nigella sativa seed oil'],
    benefits: ['Fortifies', 'Comforts', 'Revives'],
    rating: 4.8,
    reviews: 154,
    images: [img.oil, img.bottle1, img.botanical2, img.spa],
    bestSelling: true,
    createdAt: '2025-07-10',
    source: 'seed',
  },
  {
    id: '6',
    name: 'Rosemary Elixir',
    slug: 'rosemary-elixir',
    tagline: 'Crisp herbal focus',
    description:
      'Rosemary leaf extract in a lightweight serum base. Awakening for morning routines and scalp edges.',
    shortDescription: 'Rosemary botanical elixir for scalp and complexion.',
    price: 1750,
    volumes: [
      { ml: 10, price: 1150 },
      { ml: 30, price: 1750 },
      { ml: 50, price: 2700 },
    ],
    category: 'hair',
    oilType: 'rosemary',
    ingredients: ['Rosmarinus officinalis extract', 'Grapeseed oil'],
    benefits: ['Invigorates', 'Clarifies', 'Refreshes'],
    rating: 4.5,
    reviews: 63,
    images: [img.herbs, img.dropper, img.bottle2, img.botanical1],
    createdAt: '2025-06-22',
    source: 'seed',
  },
  {
    id: '7',
    name: 'Jojoba Elixir',
    slug: 'jojoba-elixir',
    tagline: 'Liquid wax harmony',
    description:
      'Golden jojoba esters mirror skin’s own lipids. A universal base that absorbs cleanly on face, body, and hair ends.',
    shortDescription: 'Pure jojoba for balanced moisture without heaviness.',
    price: 1600,
    volumes: [
      { ml: 10, price: 1100 },
      { ml: 30, price: 1600 },
      { ml: 50, price: 2500 },
    ],
    category: 'body',
    oilType: 'jojoba',
    ingredients: ['Simmondsia chinensis seed oil'],
    benefits: ['Balances', 'Moisturizes', 'Protects'],
    rating: 4.7,
    reviews: 201,
    images: [img.spa, img.oil, img.bottle1, img.dropper],
    createdAt: '2025-11-12',
    source: 'seed',
  },
  {
    id: '8',
    name: 'Neroli Serum',
    slug: 'neroli-serum',
    tagline: 'Citrus blossom luminosity',
    description:
      'Bitter orange blossom absolute in a featherlight serum. A perfumer’s botanical for décolleté and pulse points.',
    shortDescription: 'Neroli blossom serum for luminous, scented skin.',
    price: 2600,
    volumes: [
      { ml: 10, price: 1900 },
      { ml: 30, price: 2600 },
      { ml: 50, price: 3900 },
    ],
    category: 'face',
    oilType: 'neroli',
    ingredients: ['Citrus aurantium amara flower oil', 'Squalane'],
    benefits: ['Illuminates', 'Perfumes subtly', 'Smooths'],
    rating: 4.9,
    reviews: 41,
    images: [img.botanical2, img.bottle2, img.spa, img.botanical1],
    createdAt: '2025-12-01',
    source: 'seed',
  },
]

/** Initial catalog snapshot (also used to reset) */
export const PRODUCTS = SEED_PRODUCTS

export function getProductBySlug(
  slug: string,
  list: Product[],
): Product | undefined {
  return list.find((p) => p.slug === slug)
}

export function getRelatedProducts(
  slug: string,
  list: Product[],
  limit = 4,
): Product[] {
  const p = getProductBySlug(slug, list)
  const others = list.filter((x) => x.slug !== slug)
  if (!p) return others.slice(0, limit)
  const sameCat = others.filter((x) => x.category === p.category)
  if (sameCat.length >= limit) return sameCat.slice(0, limit)
  const rest = others.filter((x) => x.category !== p.category)
  return [...sameCat, ...rest].slice(0, limit)
}

/** Home featured — Rare Elixir hero line (six core SKUs) */
export const FEATURED_SLUGS = [
  'mint-serum',
  'argan-oil',
  'rose-hip-elixir',
  'lavender-serum',
  'black-seed-oil',
  'rosemary-elixir',
] as const

export function getFeaturedProducts(list: Product[]): Product[] {
  const fromSlugs = FEATURED_SLUGS.map((s) => getProductBySlug(s, list)).filter(
    Boolean,
  ) as Product[]
  if (fromSlugs.length >= 6) return fromSlugs.slice(0, 6)
  const slugSet = new Set(fromSlugs.map((p) => p.slug))
  const rest = list.filter((p) => !slugSet.has(p.slug))
  return [...fromSlugs, ...rest].slice(0, 6)
}
