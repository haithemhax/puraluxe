import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

const stagger = 0.08

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pt-17">
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-linear-to-br from-gold-light/55 to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-pura-green/12 blur-3xl"
        aria-hidden
      />

      <div className="relative z-1 mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-0">
        <div className="flex max-w-xl flex-col justify-center">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Rare Elixir · cosmetic bio
          </motion.p>
          <motion.h1
            className="mt-5 font-cormorant text-[clamp(2.75rem,8vw,4.25rem)] font-light italic leading-[1.08] tracking-tight text-pura-green"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            The era of major oils
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: stagger * 2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Premium cosmetic bio oils crafted in Algeria with clean formulas,
            elegant packaging, and a ritual-first experience.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: stagger * 3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link to="/shop">
              <Button variant="solid">Shop the collection</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline">Our story</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto aspect-4/5 w-full max-w-md lg:max-w-none lg:justify-self-end"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 rounded-4xl bg-linear-to-br from-gold-light/40 via-paper to-pura-green-soft/40 shadow-[0_24px_80px_-20px_rgb(17_35_28/0.22)] ring-1 ring-gold-dark/20"
            aria-hidden
          />
          <div
            className="absolute inset-[8%] rounded-3xl opacity-90 mix-blend-multiply"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1611153472488-92b34f0460f2?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
          Scroll
        </span>
        <motion.div
          className="h-8 w-px bg-linear-to-b from-ink/25 to-transparent"
          animate={{ scaleY: [1, 0.35, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
