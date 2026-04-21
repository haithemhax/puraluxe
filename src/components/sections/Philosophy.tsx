import { motion } from 'framer-motion'

export function Philosophy() {
  return (
    <section className="overflow-hidden bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center md:gap-16 md:px-8">
        <motion.div
          className="relative min-h-[280px] overflow-hidden rounded-3xl shadow-[0_20px_60px_-24px_rgb(0_0_0/0.15)] ring-1 ring-ink/[0.06] sm:min-h-[360px]"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-gold-light/30 via-cream to-paper"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
            Philosophy
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
            Pure · Ancient · Rare
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            PURALUXE distills the apothecary tradition into dropper serums of
            uncompromising purity. Each Rare Elixir is cold-extracted to protect
            delicate botanical compounds — the same reverence found in French
            perfumery ateliers, rooted in living soil.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We source in small seasons, bottle in amber glass, and deliver oils
            as they were meant to be experienced: luminous, honest, and
            profoundly sensorial.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
