import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  /** Home hero is full viewport; skip top padding for fixed navbar offset */
  fullBleed?: boolean
  className?: string
}

export function PageShell({
  children,
  fullBleed = false,
  className = '',
}: PageShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`${fullBleed ? '' : 'min-h-screen pt-[5.25rem]'} ${className}`}
    >
      {children}
    </motion.div>
  )
}
