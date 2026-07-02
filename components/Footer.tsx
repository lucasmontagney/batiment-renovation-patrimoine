import Link from 'next/link'
import type { Dictionary, Locale } from '@/lib/i18n'
import Logo from '@/components/Logo'

type Props = {
  locale: Locale
  dict: Dictionary
}

export default function Footer({ locale, dict }: Props) {
  const navLinks = [
    { href: `/${locale}/realisations`, label: dict.nav.realisations },
    { href: `/${locale}/atelier`, label: dict.nav.atelier },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ]

  return (
    <footer className="bg-olive-deep text-bone/65">
      <div className="container-main py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-block mb-8 transition-opacity duration-300 hover:opacity-80">
              <Logo variant="light" layout="stacked" />
            </Link>
            <p className="font-sans text-[13px] leading-relaxed text-bone/45 max-w-xs">
              {dict.brand.tagline}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-bone/30 mb-6">{dict.footer.nav}</p>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[11px] uppercase tracking-widest text-bone/55 hover:text-bone transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-bone/30 mb-6">{dict.footer.contact}</p>
            <address className="not-italic font-sans text-[13px] leading-loose text-bone/55 space-y-1">
              <p>{dict.contact.addressLine1}</p>
              <p>{dict.contact.addressLine2}</p>
              <div className="mt-5 space-y-2">
                <p>
                  <a
                    href={`tel:${dict.contact.phoneTel}`}
                    className="hover:text-bone transition-colors"
                  >
                    {dict.contact.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${dict.contact.email}`}
                    className="hover:text-bone transition-colors"
                  >
                    {dict.contact.email}
                  </a>
                </p>
                <p>
                  <a
                    href={dict.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-bone transition-colors"
                  >
                    {dict.contact.instagramHandle}
                  </a>
                </p>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-bone/10 pt-8 flex flex-col md:flex-row justify-between gap-3">
          <p className="font-sans text-[11px] text-bone/30">
            {dict.footer.rightsPrefix} {new Date().getFullYear()} {dict.footer.rightsSuffix}
          </p>
          <p className="font-sans text-[11px] text-bone/30 uppercase tracking-widest">
            {dict.brand.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
