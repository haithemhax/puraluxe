import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { useToastStore } from '../../store/toastStore'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const push = useToastStore((s) => s.push)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    push('Thank you — new elixirs will find you first.', 'info')
    setEmail('')
  }

  return (
    <section className="border-t border-ink/[0.06] bg-gradient-to-b from-paper to-cream py-20 md:py-24">
      <div className="mx-auto max-w-lg px-4 text-center md:max-w-xl md:px-8">
        <motion.h2
          className="font-[family-name:var(--font-cormorant)] text-[clamp(1.85rem,4vw,2.5rem)] italic text-charcoal"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join the ritual
        </motion.h2>
        <motion.p
          className="mt-3 text-sm text-muted"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          New drops and offers—no spam.
        </motion.p>
        <motion.form
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          onSubmit={submit}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="min-h-[48px] flex-1 rounded-full border border-ink/12 bg-paper px-5 text-sm text-ink placeholder:text-muted/70 outline-none transition-shadow focus:border-gold-dark/40 focus:ring-2 focus:ring-gold-light/50"
          />
          <Button variant="solid" className="sm:shrink-0" type="submit">
            Subscribe
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
