import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <PageShell>
      <Helmet>
        <title>Not found | PURALUXE</title>
      </Helmet>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pb-24 text-center">
        <motion.svg
          className="mb-10 h-48 w-48 text-gold/30"
          viewBox="0 0 160 160"
          fill="none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          aria-hidden
        >
          <ellipse cx="80" cy="80" rx="70" ry="55" stroke="currentColor" />
          <path
            d="M80 35c22 28 28 62 12 90M45 85c18-22 48-16 62 8"
            stroke="currentColor"
            strokeWidth="1"
          />
          <text
            x="80"
            y="88"
            textAnchor="middle"
            fill="currentColor"
            className="font-serif text-[28px]"
            opacity="0.5"
          >
            404
          </text>
        </motion.svg>
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal">
          This path has no elixir
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          The page you seek may have been moved. Return to the collection.
        </p>
        <Link to="/" className="mt-10">
          <Button variant="solid">Return home</Button>
        </Link>
      </div>
    </PageShell>
  )
}
