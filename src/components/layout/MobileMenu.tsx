import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-150 bg-paper/98 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(circle at 20% 10%, rgb(199 161 92 / 0.2), transparent 45%), radial-gradient(circle at 80% 80%, rgb(31 59 47 / 0.18), transparent 45%)',
            }}
            aria-hidden
          />
          <button
            type="button"
            aria-label="Close menu"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-pura-green/10 hover:text-pura-green"
            onClick={onClose}
          >
            <span className="text-xl leading-none">×</span>
          </button>
          <nav
            className="flex h-full flex-col items-center justify-center gap-2 px-8"
            aria-label="Mobile"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
                className="w-full max-w-xs"
              >
                <Link
                  to={l.to}
                  className="block rounded-2xl border border-transparent px-6 py-4 text-center text-lg font-medium text-ink transition-all hover:border-gold-dark/30 hover:bg-pura-green/5 hover:text-pura-green"
                  onClick={onClose}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
