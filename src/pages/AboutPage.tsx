import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'

const timeline = [
  {
    year: '2019',
    title: 'Founding',
    body: 'PURALUXE began as a studio obsession: cold-pressing single-origin oils for friends and atelier clients.',
  },
  {
    year: '2021',
    title: 'Philosophy',
    body: 'We formalized Rare Elixir — dropper serums with French perfumery discipline and apothecary honesty.',
  },
  {
    year: '2024',
    title: 'Sourcing',
    body: 'Direct relationships with growers across the Mediterranean and Maghreb, always harvest-dated.',
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <Helmet>
        <title>Our story | PURALUXE</title>
        <meta
          name="description"
          content="PURALUXE — pure, ancient, rare. Botanical cosmetics and cold-extracted oils."
        />
      </Helmet>
      <div className="mx-auto max-w-4xl px-4 pb-24 md:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-paper px-6 py-20 text-center ring-1 ring-ink/[0.06] md:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, #2a5a2a 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #b8943f33 0%, transparent 45%)',
            }}
            aria-hidden
          />
          <motion.h1
            className="relative font-[family-name:var(--font-cormorant)] text-[clamp(2rem,6vw,3.5rem)] italic text-charcoal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The house of major oils
          </motion.h1>
          <p className="relative mt-4 text-muted">
            cosmetic bio · botanical luxury without compromise
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
            Timeline
          </h2>
          <div className="mt-10 space-y-12 border-l border-ink/[0.1] pl-8">
            {timeline.map((item, i) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <p className="text-sm font-semibold text-gold-dark">{item.year}</p>
                <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl italic text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <motion.div
            className="rounded-2xl bg-paper p-8 ring-1 ring-ink/[0.06]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Founder
            </h2>
            <p className="mt-4 font-[family-name:var(--font-cormorant)] text-2xl italic text-charcoal">
              Amel R.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Trained between Grasse and Algiers, Amel bridges perfumery structure
              with North African botanical heritage — every batch is signed.
            </p>
          </motion.div>
          <motion.div
            className="rounded-2xl bg-paper p-8 ring-1 ring-ink/[0.06]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Atelier team
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Small-batch compounders, glass specialists, and QC partners across
              three cities — united by obsession with cold extraction and honest
              labeling.
            </p>
          </motion.div>
        </section>

        <section className="mt-24 rounded-3xl bg-cream/80 py-14 text-center ring-1 ring-ink/[0.06]">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
            Certifications & promises
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-cormorant)] text-xl italic text-charcoal md:text-2xl">
            100% Natural · Bio Certified · No Parabens · No Sulfates
          </p>
        </section>
      </div>
    </PageShell>
  )
}
