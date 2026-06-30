import type { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import PageHero from '@/components/PageHero'
import ContactForm from './ContactForm'
import { getDict, isLocale, type Locale } from '@/lib/i18n'

type Params = { params: { locale: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : 'fr') as Locale
  const dict = getDict(locale)
  return {
    title: dict.seo.contact.title,
    description: dict.seo.contact.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { fr: '/fr/contact', en: '/en/contact' },
    },
  }
}

export default function ContactPage({ params }: Params) {
  const locale = (isLocale(params.locale) ? params.locale : 'fr') as Locale
  const dict = getDict(locale)
  const t = dict.contact

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-7">
              <FadeIn>
                <ContactForm locale={locale} t={t.form} />
              </FadeIn>
            </div>

            <FadeIn delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-pierre/40 pt-8">
                <p className="eyebrow mb-6">{t.coordsEyebrow}</p>
                <h2 className="font-display text-display-md text-ink font-light mb-10 leading-tight">
                  {t.coordsTitle}
                </h2>

                <div className="space-y-8 font-sans text-[14px] text-dust leading-relaxed">
                  <div>
                    <p className="font-display text-[1.05rem] text-ink mb-1">
                      {t.addressLine1}
                    </p>
                    <p>{t.addressLine2}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-dust/60 mb-2">
                      {t.phoneLabel}
                    </p>
                    <a href={`tel:${t.phoneTel}`} className="text-ink hover:text-olive transition-colors">
                      {t.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-dust/60 mb-2">
                      {t.emailLabel}
                    </p>
                    <a href={`mailto:${t.email}`} className="text-ink hover:text-olive transition-colors break-all">
                      {t.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-dust/60 mb-2">
                      {t.instagramLabel}
                    </p>
                    <a
                      href={t.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-olive transition-colors"
                    >
                      {t.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
