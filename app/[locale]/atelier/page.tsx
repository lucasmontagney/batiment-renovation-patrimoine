import FadeIn from '@/components/FadeIn'
import PageHero from '@/components/PageHero'
import { getDict, isLocale, type Locale } from '@/lib/i18n'

type Params = { params: { locale: string } }

export default function AtelierPage({ params }: Params) {
  const locale = (isLocale(params.locale) ? params.locale : 'fr') as Locale
  const dict = getDict(locale)
  const t = dict.atelier

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
        imageSrc="/images/projets/enduits-chaux/facade-2/IMG-20211217-WA0001.jpg"
        imageAlt={t.title}
      />

      {/* History */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn className="lg:col-span-4">
              <p className="eyebrow mb-5">{t.historyEyebrow}</p>
              <h2 className="font-display text-display-md text-ink font-light leading-tight">
                {t.historyTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <p className="font-sans text-[15px] text-dust leading-relaxed">
                {t.historyPlaceholder}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-chaux-cream">
        <div className="container-main">
          <FadeIn className="mb-16">
            <p className="eyebrow mb-5">{t.valuesEyebrow}</p>
            <h2 className="font-display text-display-lg text-ink font-light leading-tight">
              {t.valuesTitle}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {t.values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <article className="border-t border-pierre/40 pt-8">
                  <h3 className="font-display text-[1.6rem] text-ink font-light mb-4 leading-tight">
                    {v.title}
                  </h3>
                  <p className="font-sans text-[14px] text-dust leading-relaxed">{v.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-main">
          <FadeIn className="mb-16">
            <p className="eyebrow mb-5">{t.teamEyebrow}</p>
            <h2 className="font-display text-display-lg text-ink font-light leading-tight">
              {t.teamTitle}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {t.team.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <article>
                  <div className="relative aspect-[4/5] bg-pierre/15 mb-6 overflow-hidden">
                    {/* Photo équipe à venir — placeholder mat */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[6rem] text-pierre/40 font-light">
                        {m.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')}
                      </span>
                    </div>
                  </div>
                  <p className="font-display text-[1.6rem] text-ink font-light leading-tight mb-2">
                    {m.name}
                  </p>
                  <p className="font-sans text-[12px] text-dust uppercase tracking-widest mb-4">
                    {m.role}
                  </p>
                  <p className="font-sans text-[14px] text-dust/80 leading-relaxed">{m.bio}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-olive-deep">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn className="lg:col-span-4">
              <p className="eyebrow text-bone/40 mb-5">{t.partnersEyebrow}</p>
              <h2 className="font-display text-display-md text-bone font-light leading-tight">
                {t.partnersTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <p className="font-sans text-[15px] text-bone/60 leading-relaxed">
                {t.partnersPlaceholder}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
