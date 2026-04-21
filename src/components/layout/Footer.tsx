import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const quick = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/dashboard/login', label: 'Console' },
]

const products = [
  { to: '/product/mint-serum', label: 'Mint Serum' },
  { to: '/product/argan-oil', label: 'Argan Oil' },
  { to: '/product/rose-hip-elixir', label: 'Rose Hip Elixir' },
  { to: '/product/neroli-serum', label: 'Neroli Serum' },
]

export function Footer() {
  return (
    <footer className="border-t border-gold-dark/20 bg-linear-to-b from-paper to-cream/70">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-xs font-cormorant text-xl italic leading-snug text-pura-green">
              The era of major oils
            </p>
            <p className="mt-2 text-xs font-medium tracking-wide text-muted">
              cosmetic bio
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {quick.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted transition-colors duration-200 hover:text-pura-green"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Favorites
            </h3>
            <ul className="mt-5 space-y-3">
              {products.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted transition-colors duration-200 hover:text-pura-green"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>
                <a
                  href="mailto:hello@puraluxe.com"
                  className="transition-colors duration-200 hover:text-pura-green"
                >
                  hello@puraluxe.com
                </a>
              </li>
              <li>Algiers · Oran · Constantine</li>
              <li className="flex gap-6 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-ink/80 underline-offset-4 hover:text-pura-green hover:underline"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-ink/80 underline-offset-4 hover:text-pura-green hover:underline"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-ink/80 underline-offset-4 hover:text-pura-green hover:underline"
                  aria-label="TikTok"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-16 border-t border-gold-dark/15 pt-8 text-center text-xs text-muted">
          © 2026 PURALUXE · cosmetic bio · All rights reserved
        </p>
      </div>
    </footer>
  )
}
