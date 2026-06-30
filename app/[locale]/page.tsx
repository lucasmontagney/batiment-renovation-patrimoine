import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import ParallaxHero from '@/components/ParallaxHero'
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd'
import { getDict, isLocale, type Locale } from '@/lib/i18n'
import { HERO_IMAGE, FEATURED_HOME_PROJECT } from '@/lib/projects'

type Params = { params: { locale: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : 'fr') as Locale
  const dict = getDict(locale)
  return {
    title: dict.seo.home.title,
    description: dict.seo.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: '/fr', en: '/en' },
    },
  }
}

export default function HomePage({ params }: Params) {
  const locale = (isLocale(params.locale) ? params.locale : 'fr') as Locale
  const dict = getDict(locale)
  const t = dict.home

  return (
    <>
      <LocalBusinessJsonLd />
      <ParallaxHero src={HERO_IMAGE} alt="Escalier en pierre — Bâtiment Rénovation Patrimoine">
        <p className="eyebrow text-bone/55 mb-7">{t.eyebrow}</p>
        <h1 className="font-display text-display-xl text-bone font-light leading-none mb-10">
          {t.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <Link href={`/${locale}/realisations`} className="btn-ghost-light">
          {dict.cta.seeAll}
        </Link>

        <div className="absolute bottom-10 right-8 md:right-16 hidden md:flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-bone/25 relative overflow-hidden">
            <div className="absolute inset-0 bg-bone/60 animate-scroll-cue" />
          </div>
        </div>
      </ParallaxHero>

      {/* Intro */}
      <section className="section-padding">
        <div className="container-main">
          <FadeIn>
            <p className="eyebrow mb-8">{t.introEyebrow}</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn delay={0.05} className="lg:col-span-7">
              <p className="font-display text-display-md text-ink font-light leading-snug">
                {t.introLead}
              </p>
            </FadeIn>
            <FadeIn delay={0.12} className="lg:col-span-5 flex flex-col justify-end">
              <p className="font-sans text-[15px] text-dust leading-relaxed mb-8">
                {t.introBody}
              </p>
              <Link href={`/${locale}/atelier`} className="btn-ghost-dark self-start">
                {dict.nav.atelier}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-padding bg-chaux-cream">
        <div className="container-main">
          <FadeIn className="mb-16">
            <p className="eyebrow">{t.pillarsEyebrow}</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {t.pillars.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.08}>
                <article className="border-t border-pierre/40 pt-8">
                  <span className="font-sans text-[11px] text-dust/70 mb-6 block">{p.num}</span>
                  <h3 className="font-display text-[1.8rem] md:text-[2rem] text-ink font-light mb-4 leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[13px] text-dust leading-relaxed">
                    {p.text}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding">
        <div className="container-main">
          <FadeIn className="mb-12">
            <p className="eyebrow">{t.featuredEyebrow}</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <FadeIn className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={FEATURED_HOME_PROJECT.src}
                alt={locale === 'fr' ? FEATURED_HOME_PROJECT.altFr : FEATURED_HOME_PROJECT.altEn}
                fill
                className="object-cover"
              />
            </FadeIn>
            <FadeIn delay={0.12} className="lg:pl-8">
              <p className="font-sans text-[11px] text-dust/70 uppercase tracking-widest mb-6">
                {t.featuredKicker}
              </p>
              <h2 className="font-display text-display-md text-ink font-light mb-6 leading-snug">
                {t.featuredTitle}
              </h2>
              <p className="font-sans text-[14px] text-dust leading-relaxed mb-10">
                {t.featuredText}
              </p>
              <Link href={`/${locale}/realisations`} className="btn-ghost-dark">
                {dict.cta.seeAll}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-olive-deep">
        <div className="container-main max-w-3xl text-center mx-auto">
          <FadeIn direction="none">
            <blockquote>
              <p className="font-display text-[1.8rem] md:text-[2.2rem] lg:text-[2.6rem] text-bone font-light italic leading-relaxed">
                « {t.quote} »
              </p>
              <footer className="mt-10">
                <cite className="font-sans text-[11px] text-bone/40 uppercase tracking-widest not-italic">
                  {t.quoteAuthor}
                </cite>
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn>
              <p className="eyebrow mb-7">{t.contactEyebrow}</p>
              <h2 className="font-display text-display-lg text-ink font-light leading-tight">
                {t.contactTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="font-sans text-[14px] text-dust leading-relaxed mb-10">
                {t.contactBody}
              </p>
              <Link href={`/${locale}/contact`} className="btn-ghost-dark">
                {dict.cta.talk}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
