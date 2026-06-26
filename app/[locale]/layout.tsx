import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, isLocale, getDict, type Locale } from '@/lib/i18n'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const loc = isLocale(params.locale) ? (params.locale as Locale) : 'fr'
  const dict = getDict(loc)
  const altLoc = loc === 'fr' ? 'en' : 'fr'
  return {
    title: dict.brand.name,
    description: dict.brand.tagline,
    alternates: {
      canonical: `/${loc}`,
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: dict.brand.name,
      locale: loc === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: altLoc === 'fr' ? 'fr_FR' : 'en_GB',
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  const dict = getDict(locale)

  return (
    <>
      <Navigation locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
