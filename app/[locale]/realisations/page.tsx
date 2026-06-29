import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import PageHero from '@/components/PageHero'
import CompareSlider from '@/components/CompareSlider'
import { getDict, isLocale, type Locale } from '@/lib/i18n'
import { categories, getCategoryPhotoSrc } from '@/lib/projects'

type Params = { params: { locale: string } }

export default function RealisationsPage({ params }: Params) {
  const locale = (isLocale(params.locale) ? params.locale : 'fr') as Locale
  const dict = getDict(locale)
  const t = dict.realisations

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
        imageSrc="/images/projets/terrasses/5482051157561966893.jpg"
        imageAlt={t.title}
      />

      {/* Anchor categories */}
      <section className="border-b border-pierre/25 bg-chaux sticky top-[76px] z-30">
        <div className="container-wide flex flex-wrap gap-x-8 gap-y-3 py-5 overflow-x-auto">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="font-sans text-[11px] uppercase tracking-widest text-dust hover:text-ink transition-colors whitespace-nowrap"
            >
              {c.name[locale]}
            </a>
          ))}
        </div>
      </section>

      {categories.map((cat, catIdx) => {
        const photos = cat.photos.map((f) => ({
          src: getCategoryPhotoSrc(cat, f),
          alt: cat.name[locale],
        }))

        // Alternate: even-indexed categories show the before/after slider FIRST,
        // odd-indexed show the gallery first then the slider underneath.
        const sliderFirst = catIdx % 2 === 0

        const sliderBlock = cat.beforeAfter && (
          <FadeIn className="mb-16">
            <CompareSlider
              beforeSrc={cat.beforeAfter.beforeSrc}
              afterSrc={cat.beforeAfter.afterSrc}
              beforeAlt={`${cat.name[locale]} — ${t.before}`}
              afterAlt={`${cat.name[locale]} — ${t.after}`}
              beforeLabel={t.before}
              afterLabel={t.after}
            />
          </FadeIn>
        )

        const galleryBlock = photos.length > 0 && <PhotoGrid photos={photos} />

        return (
          <section key={cat.slug} id={cat.slug} className="section-padding scroll-mt-32">
            <div className="container-wide">
              <FadeIn className="mb-16 md:mb-20">
                <p className="eyebrow mb-5">{t.eyebrow}</p>
                <h2 className="font-display text-display-lg text-ink font-light max-w-3xl leading-tight">
                  {cat.name[locale]}
                </h2>
                <p className="font-sans text-[12px] text-dust/70 uppercase tracking-widest mt-4">
                  {photos.length} {photos.length > 1 ? t.photoPlural : t.photoSingular}
                </p>
              </FadeIn>

              {sliderFirst ? (
                <>
                  {sliderBlock}
                  {galleryBlock}
                </>
              ) : (
                <>
                  {galleryBlock}
                  {sliderBlock && <div className="mt-16">{sliderBlock}</div>}
                </>
              )}
            </div>
          </section>
        )
      })}

      <section className="section-padding bg-olive-deep">
        <div className="container-main max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="eyebrow text-bone/40 mb-6">{t.ctaEyebrow}</p>
            <h2 className="font-display text-display-md text-bone font-light mb-8">
              {t.ctaTitle}
            </h2>
            <p className="font-sans text-[14px] text-bone/55 leading-relaxed mb-10">
              {t.ctaBody}
            </p>
            <Link href={`/${locale}/contact`} className="btn-ghost-light">
              {dict.cta.contactUs}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

function PhotoGrid({ photos }: { photos: { src: string; alt: string }[] }) {
  const n = photos.length
  if (n === 0) return null
  if (n === 1) {
    return (
      <FadeIn className="relative aspect-[16/10] overflow-hidden">
        <Image src={photos[0].src} alt={photos[0].alt} fill className="object-cover" sizes="100vw" />
      </FadeIn>
    )
  }
  if (n === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {photos.map((p, i) => (
          <FadeIn key={i} delay={i * 0.06} className="relative aspect-[4/5] overflow-hidden">
            <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="50vw" />
          </FadeIn>
        ))}
      </div>
    )
  }
  if (n === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {photos.map((p, i) => (
          <FadeIn key={i} delay={i * 0.06} className="relative aspect-[3/4] overflow-hidden">
            <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="33vw" />
          </FadeIn>
        ))}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {photos.map((p, i) => (
        <FadeIn key={i} delay={Math.min(i * 0.04, 0.3)} className="relative aspect-[4/5] overflow-hidden">
          <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
        </FadeIn>
      ))}
    </div>
  )
}
