import { motion } from 'framer-motion'

const items = [
  { title: '100% natural ingredients' },
  { title: 'Cold-extracted oils' },
  { title: 'Dermatologist tested' },
]

export function Benefits() {
  return (
    <section className="border-y border-ink/[0.06] bg-paper py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45 }}
              className="text-center md:text-left"
            >
              <p className="text-sm font-medium leading-snug text-ink md:text-base">
                {item.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
