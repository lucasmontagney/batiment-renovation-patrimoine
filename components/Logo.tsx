type Variant = 'dark' | 'light'
type Layout = 'horizontal' | 'stacked'

type Props = {
  variant?: Variant
  layout?: Layout
  className?: string
}

export default function Logo({ variant = 'dark', layout = 'horizontal', className = '' }: Props) {
  const isLight = variant === 'light'
  const textColor = isLight ? 'text-bone' : 'text-ink'
  const dividerBg = isLight ? 'bg-bone/50' : 'bg-ink/45'

  if (layout === 'stacked') {
    return (
      <span
        aria-label="Bâtiment Rénovation Patrimoine"
        className={`inline-flex flex-col items-center gap-3 ${textColor} ${className}`}
      >
        <span className="font-display font-semibold text-[46px] tracking-[0.06em] leading-none">BRP</span>
        <span className={`h-px w-16 ${dividerBg}`} aria-hidden />
        <span className="flex flex-col items-center leading-tight">
          <span className="font-sans text-[10px] tracking-[0.36em] uppercase">Bâtiment</span>
          <span className="font-sans text-[10px] tracking-[0.36em] uppercase mt-1">Rénovation Patrimoine</span>
        </span>
      </span>
    )
  }

  return (
    <span
      aria-label="Bâtiment Rénovation Patrimoine"
      className={`inline-flex items-center gap-3 md:gap-4 ${textColor} ${className}`}
    >
      <span className="font-display font-semibold text-[26px] md:text-[30px] tracking-[0.08em] leading-none">BRP</span>
      <span className={`h-8 md:h-9 w-px ${dividerBg}`} aria-hidden />
      <span className="flex flex-col leading-[1.4]">
        <span className="font-sans text-[8px] md:text-[9px] tracking-[0.28em] uppercase">Bâtiment</span>
        <span className="font-sans text-[8px] md:text-[9px] tracking-[0.28em] uppercase">Rénovation Patrimoine</span>
      </span>
    </span>
  )
}
