interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[40px] border border-gold-dark/35 bg-paper px-3 py-1 text-[9px] font-[family-name:var(--font-cinzel)] uppercase tracking-[0.2em] text-gold-dark ${className}`}
    >
      {children}
    </span>
  )
}
