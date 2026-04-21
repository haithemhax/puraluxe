import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import { useToastStore } from '../store/toastStore'

const field =
  'mt-2 w-full rounded-xl border border-ink/12 bg-paper px-4 py-3 text-ink outline-none transition-shadow focus:border-gold-dark/35 focus:ring-2 focus:ring-gold-light/40'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const push = useToastStore((s) => s.push)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    push('Message received — we will reply within 48 hours.', 'info')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <PageShell>
      <Helmet>
        <title>Contact | PURALUXE</title>
        <meta name="description" content="Reach the PURALUXE atelier." />
      </Helmet>
      <div className="mx-auto max-w-xl px-4 pb-24 md:px-8">
        <motion.p
          className="text-xs font-semibold uppercase tracking-wider text-gold-dark"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact
        </motion.p>
        <motion.h1
          className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl italic text-charcoal"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Write to us
        </motion.h1>
        <p className="mt-3 text-sm text-muted">
          Wholesale, press, and product questions—we read every message.
        </p>
        <form onSubmit={submit} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="c-name"
              className="text-xs font-semibold uppercase tracking-wider text-charcoal"
            >
              Name
            </label>
            <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </div>
          <div>
            <label
              htmlFor="c-email"
              className="text-xs font-semibold uppercase tracking-wider text-charcoal"
            >
              Email
            </label>
            <input
              id="c-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label
              htmlFor="c-msg"
              className="text-xs font-semibold uppercase tracking-wider text-charcoal"
            >
              Message
            </label>
            <textarea
              id="c-msg"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={field}
            />
          </div>
          <Button variant="solid" type="submit">
            Send message
          </Button>
        </form>
      </div>
    </PageShell>
  )
}
