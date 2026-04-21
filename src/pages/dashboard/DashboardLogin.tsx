import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Logo } from '../../components/layout/Logo'
import { useDashboardAuthStore } from '../../store/dashboardAuthStore'

export default function DashboardLogin() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const tryUnlock = useDashboardAuthStore((s) => s.tryUnlock)
  const unlocked = useDashboardAuthStore((s) => s.unlocked)
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: string } | null)?.from ?? '/dashboard'

  useEffect(() => {
    if (unlocked) navigate(from, { replace: true })
  }, [unlocked, from, navigate])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    if (tryUnlock(pin)) navigate(from, { replace: true })
    else setError(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4">
      <Helmet>
        <title>Console sign in | PURALUXE</title>
      </Helmet>
      <motion.div
        className="w-full max-w-sm border border-gold-dark/25 bg-gold-light/25 p-8 rounded-[2px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 flex flex-col items-center gap-2">
          <Logo size="md" />
          <p className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.35em] text-gold-dark/85">
            Atelier console
          </p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label
              htmlFor="dash-pin"
              className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
            >
              Access PIN
            </label>
            <input
              id="dash-pin"
              type="password"
              autoComplete="current-password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-2 w-full border border-gold-dark/30 bg-paper px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
              placeholder="••••••••"
            />
            {error && (
              <p className="mt-2 text-xs text-red-300/90 font-[family-name:var(--font-jost)]">
                Invalid PIN. Try again.
              </p>
            )}
          </div>
          <Button variant="solid" type="submit" className="w-full">
            Enter console
          </Button>
        </form>
        <p className="mt-6 text-center font-[family-name:var(--font-jost)] text-[11px] text-ink/40">
          Enter the access PIN for this console. If you were not given one, ask whoever manages this
          site.
        </p>
        <Link
          to="/"
          className="mt-4 block text-center font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-wider text-gold-dark/70 hover:text-charcoal transition-colors duration-300"
        >
          ← Back to site
        </Link>
      </motion.div>
    </div>
  )
}
