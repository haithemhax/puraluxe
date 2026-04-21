import { motion } from 'framer-motion'

const quotes = [
  {
    name: 'Yasmine K.',
    text: 'The Mint Serum is morning light in a bottle — my skin finally feels awake without harsh actives.',
  },
  {
    name: 'Karim B.',
    text: 'Argan Oil on my beard ends the frizz. PURALUXE feels like a quiet luxury I use every day.',
  },
  {
    name: 'Lina M.',
    text: 'Rose Hip Elixir at night, Neroli on weekends. The ritual is as beautiful as the oils.',
  },
]

function Stars() {
  return (
    <div className="flex justify-center gap-0.5 text-gold md:justify-start" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-sm">
          ★
        </span>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-wider text-gold-dark"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.p>
        <motion.h2
          className="mx-auto mt-2 max-w-lg text-center font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Voices of the ritual
        </motion.h2>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {quotes.map((q, i) => (
            <motion.article
              key={q.name}
              className="rounded-2xl bg-cream/80 p-8 ring-1 ring-ink/[0.06]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <Stars />
              <p className="mt-5 font-[family-name:var(--font-cormorant)] text-lg italic leading-relaxed text-ink md:text-xl">
                “{q.text}”
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
                {q.name}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
