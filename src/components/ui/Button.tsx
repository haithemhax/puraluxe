import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-[family-name:var(--font-jost)] font-medium tracking-tight rounded-full transition-all duration-200 ease-out cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]'

const variants: Record<Variant, string> = {
  solid:
    'border border-pura-green bg-pura-green text-white shadow-[0_8px_24px_-12px_rgb(31_59_47/0.65)] hover:bg-pura-green-light hover:shadow-[0_12px_30px_-14px_rgb(31_59_47/0.7)]',
  outline:
    'border border-gold-dark/25 bg-paper/80 text-ink hover:border-gold-dark/45 hover:bg-gold-light/25',
  ghost:
    'border border-transparent bg-transparent text-ink/70 hover:bg-pura-green/10 hover:text-pura-green',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export function Button({
  variant = 'outline',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
