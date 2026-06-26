import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import PageHero from '@/components/PageHero'
import { getDict, isLocale, type Locale } from '@/lib/i18n'

type Params = { params: { locale: string } }

export default function SavoirFairePage({ params }: Params) {
  const locale = (isLocale(params.locale) ? params.locale : 'fr') as Locale
  const dict = getDict(locale)
  const t = dict.savoirFaire

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
        imageSrc="/assets/images/Maçonnerie de pierre/Pierre 6/IMG_20191219_153225.jpg"
        imageAlt={t.title}
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
            {t.techniques.map((tech, i) => (
              <FadeIn key={tech.num} delay={(i % 2) * 0.08}>
                <article className="border-t border-pierre/40 pt-8">
                  <span className="font-sans text-[11px] text-dust/70 mb-6 block tracking-widest">
                    {tech.num}
                  </span>
                  <h2 className="font-display text-display-md text-ink font-light mb-5 leading-tight">
                    {tech.title}
                  </h2>
                  <p className="font-sans text-[14px] text-dust leading-relaxed">{tech.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-chaux-cream">
        <div className="container-main max-w-3xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-5">{t.seoEyebrow}</p>
            <h2 className="font-display text-display-md text-ink font-light mb-8">
              {t.seoTitle}
            </h2>
            <p className="font-sans text-[15px] text-dust leading-relaxed mb-10">{t.seoBody}</p>
            <Link href={`/${locale}/contact`} className="btn-ghost-dark">
              {dict.cta.talk}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
