import Image from 'next/image'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
  imageSrc?: string
  imageAlt?: string
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: Props) {
  if (imageSrc) {
    return (
      <section className="relative h-[60vh] min-h-[460px] flex items-end">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-deep/0 via-olive-deep/15 to-olive-deep/75" />
        <div className="relative container-main pb-16 md:pb-20">
          <p className="eyebrow text-bone/55 mb-4">{eyebrow}</p>
          <h1 className="font-display text-display-lg text-bone font-light max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-[14px] text-bone/60 mt-5 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="pt-40 pb-20 bg-chaux-cream">
      <div className="container-main">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="font-display text-display-lg text-ink font-light max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-[15px] text-dust leading-relaxed mt-6 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
