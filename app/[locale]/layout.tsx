import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, isLocale, getDict, type Locale } from '@/lib/i18n'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LangSetter from '@/components/LangSetter'

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
    title: {
      template: `%s · ${dict.brand.name}`,
      default: dict.brand.name,
    },
    description: dict.brand.tagline,
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
      <LangSetter />
      <Navigation locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
