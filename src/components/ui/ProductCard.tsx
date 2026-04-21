import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { useCartStore } from '../../store/cartStore'
import { useToastStore } from '../../store/toastStore'
import { useWishlist } from '../../hooks/useWishlist'
import { Button } from './Button'

interface ProductCardProps {
  product: Product
  variant?: 'featured' | 'shop'
  enableLayout?: boolean
}

export function ProductCard({
  product,
  variant = 'shop',
  enableLayout = false,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen)
  const pushToast = useToastStore((s) => s.push)
  const { toggle, has } = useWishlist()

  const defaultVol =
    product.volumes.find((v) => v.ml === 30) ??
    product.volumes.find((v) => v.ml === 10) ??
    product.volumes[0]

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      volumeMl: defaultVol.ml,
      unitPrice: defaultVol.price,
      quantity: 1,
    })
    pushToast(`${product.name} added to your ritual.`)
    setDrawerOpen(true)
  }

  const onWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const now = has(product.id)
    toggle(product.id)
    pushToast(
      now ? 'Removed from wishlist.' : 'Saved to wishlist.',
      'info',
    )
  }

  const to = `/product/${product.slug}`

  return (
    <motion.article
      layout={enableLayout}
      className="group relative overflow-hidden rounded-2xl bg-paper ring-1 ring-gold-dark/15 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgb(17_35_28/0.3)]"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative">
        <Link to={to} className="block">
          <div className="relative aspect-3/4 overflow-hidden bg-cream">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-pura-green/30 via-transparent to-transparent opacity-60" />
          </div>
        </Link>
        {variant === 'shop' && (
          <button
            type="button"
            aria-label={
              has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'
            }
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-dark/20 bg-paper/90 text-ink/70 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-pura-green hover:text-white"
            onClick={onWishlist}
          >
            <span className="text-lg leading-none">
              {has(product.id) ? '♥' : '♡'}
            </span>
          </button>
        )}
        {variant === 'featured' && (
          <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full justify-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="outline"
              className="w-full border-ink/15 bg-paper/95"
              onClick={addToCart}
            >
              Add to cart
            </Button>
          </div>
        )}
      </div>
      <Link to={to} className="block space-y-1.5 p-5">
        <h3 className="font-cormorant text-lg font-medium text-pura-green md:text-xl">
          {product.name}
        </h3>
        {variant === 'shop' && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {product.shortDescription}
          </p>
        )}
        <p className="pt-1 text-sm font-medium text-ink">
          {defaultVol.price.toLocaleString()} DZD
          <span className="font-normal text-muted"> · {defaultVol.ml} ml</span>
        </p>
      </Link>
      {variant === 'shop' && (
        <div className="px-5 pb-5">
          <Button
            variant="outline"
            className="w-full border-ink/12"
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </div>
      )}
    </motion.article>
  )
}
