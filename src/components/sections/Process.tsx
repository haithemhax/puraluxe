import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Select your oil',
    desc: 'Choose a Rare Elixir aligned with your skin, scalp, or ritual moment.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-11 w-11 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M24 6v12M18 12h12M14 26c0-6 4-10 10-10s10 4 10 10v14H14V26z" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Cold extracted',
    desc: 'Slow, low-temperature extraction preserves volatile notes and potency.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-11 w-11 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M18 8h12l2 8v22a4 4 0 01-4 4H20a4 4 0 01-4-4V16l2-8z" />
        <path d="M20 20h8" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Delivered pure',
    desc: 'Sealed in amber glass and sent with care across Algeria and beyond.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-11 w-11 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 18l16-8 16 8v20l-16 8-16-8V18z" />
        <path d="M8 18l16 8 16-8M24 26v18" />
      </svg>
    ),
  },
]

export function Process() {
  return (
    <section className="border-y border-ink/[0.06] bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-gold-dark">
          How it works
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              className="relative rounded-2xl bg-paper p-8 shadow-sm ring-1 ring-ink/[0.06] md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <p className="font-[family-name:var(--font-cormorant)] text-4xl italic text-gold-dark/90 md:text-5xl">
                {s.n}
              </p>
              <div className="mt-4 flex justify-center md:justify-start">{s.icon}</div>
              <h3 className="mt-4 text-base font-semibold text-charcoal">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
