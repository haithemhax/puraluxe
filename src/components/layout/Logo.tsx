interface LogoProps {
  className?: string
  showWordmark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 'h-9', md: 'h-11', lg: 'h-[4.5rem]' }

export function Logo({
  className = '',
  showWordmark = false,
  size = 'md',
}: LogoProps) {
  const h = heights[size]
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/puraluxe-logo.png"
        alt="PURALUXE"
        className={`${h} w-auto object-contain object-center`}
        width={256}
        height={256}
        decoding="async"
      />
      {showWordmark && (
        <span className="font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-[0.35em] text-gold-dark">
          PURALUXE
        </span>
      )}
    </div>
  )
}
