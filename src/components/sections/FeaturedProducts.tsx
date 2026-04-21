import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../../data/products'
import { useCatalogStore } from '../../store/catalogStore'
import { ProductCard } from '../ui/ProductCard'

export function FeaturedProducts() {
  const catalog = useCatalogStore((s) => s.products)
  const products = getFeaturedProducts(catalog)

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end md:mb-16">
          <div>
            <motion.p
              className="text-xs font-semibold uppercase tracking-wider text-gold-dark"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured
            </motion.p>
            <motion.h2
              className="mt-2 font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,3rem)] italic text-charcoal"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              The collection
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/shop"
              className="text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-gold-dark hover:underline"
            >
              View all products →
            </Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <ProductCard product={p} variant="featured" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
