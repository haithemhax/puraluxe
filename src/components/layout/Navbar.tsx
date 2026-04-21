import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SearchModal } from './SearchModal'
import { useCartStore } from '../../store/cartStore'
import { useWishlist } from '../../hooks/useWishlist'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M16 16l6 6" strokeLinecap="round" />
    </svg>
  )
}

function IconBag({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M6 8h12l-1 14H7L6 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" strokeLinecap="round" />
    </svg>
  )
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 21s-7-4.6-7-10a4 4 0 017-2 4 4 0 017 2c0 5.4-7 10-7 10z" />
    </svg>
  )
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

export function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const cartCount = useCartStore((s) =>
    s.items.reduce((n, l) => n + l.quantity, 0),
  )
  const toggleDrawer = useCartStore((s) => s.toggleDrawer)
  const { count: wishCount } = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const transparent = isHome && !scrolled

  const iconBtn =
    'flex h-10 w-10 items-center justify-center rounded-full text-ink/65 transition-colors duration-200 hover:bg-pura-green/10 hover:text-pura-green'

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-140 transition-[background,box-shadow,border-color] duration-300 ${
          transparent
            ? 'border-transparent bg-transparent'
            : 'border-b border-gold-dark/15 bg-paper/92 shadow-[0_8px_40px_-24px_rgb(23_34_29/0.45)] backdrop-blur-lg'
        }`}
        initial={false}
      >
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Logo size="sm" />
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main"
          >
            {nav.map((item) => {
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'text-pura-green'
                      : transparent
                        ? 'text-ink/70 hover:text-pura-green'
                        : 'text-ink/55 hover:text-pura-green'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-linear-to-r from-gold to-gold-dark"
                      aria-hidden
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              aria-label="Search"
              className={iconBtn}
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch />
            </button>
            <Link
              to="/shop?wishlist=1"
              className={`relative ${iconBtn}`}
              aria-label="Wishlist"
            >
              <IconHeart />
              {wishCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-pura-green px-1 text-[10px] font-semibold text-white">
                  {wishCount > 9 ? '9+' : wishCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Open cart"
              className={`relative ${iconBtn}`}
              onClick={() => toggleDrawer()}
            >
              <IconBag />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-pura-green px-1 text-[10px] font-semibold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`md:hidden ${iconBtn}`}
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
