'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Dictionary, Locale } from '@/lib/i18n'
import { altLocale } from '@/lib/i18n'
import { HERO_IMAGE, getCategoryFirstPhoto, categories } from '@/lib/projects'
import Logo from '@/components/Logo'

type Props = {
  locale: Locale
  dict: Dictionary
}

export default function Navigation({ locale, dict }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const isHome = pathname === `/${locale}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [open])

  const transparent = isHome && !scrolled && !open

  const links = useMemo(
    () => [
      {
        href: `/${locale}/realisations`,
        label: dict.nav.realisations,
        img: getCategoryFirstPhoto(categories[0]),
      },
      {
        href: `/${locale}/atelier`,
        label: dict.nav.atelier,
        img: getCategoryFirstPhoto(categories[1]),
      },
      {
        href: `/${locale}/contact`,
        label: dict.nav.contact,
        img: HERO_IMAGE,
      },
    ],
    [locale, dict],
  )

  const otherLocale = altLocale(locale)
  const altHref = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? 'bg-transparent'
            : open
            ? 'bg-transparent'
            : 'bg-chaux/95 backdrop-blur-sm border-b border-pierre/20'
        }`}
      >
        <div className="container-wide flex items-center justify-between h-[76px]">
          <Link
            href={`/${locale}`}
            className="transition-opacity duration-300 hover:opacity-80"
            aria-label={dict.brand.name}
          >
            <Logo variant={transparent || open ? 'light' : 'dark'} />
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <Link
              href={altHref}
              className={`font-sans text-[11px] uppercase tracking-widest transition-colors duration-300 ${
                transparent || open ? 'text-bone/70 hover:text-bone' : 'text-dust hover:text-ink'
              }`}
            >
              {otherLocale.toUpperCase()}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`group flex items-center gap-3 transition-colors duration-300 ${
                transparent || open ? 'text-bone' : 'text-ink'
              }`}
              aria-label={open ? dict.nav.close : dict.nav.openMenu}
              aria-expanded={open}
            >
              <span className="font-sans text-[11px] uppercase tracking-widest">
                {open ? dict.nav.close : dict.nav.menu}
              </span>
              <span className="relative flex flex-col justify-center gap-[5px] w-8 h-8">
                <span
                  className={`block w-7 h-px bg-current origin-center transition-transform duration-300 ${
                    open ? 'rotate-45 translate-y-[3px]' : ''
                  }`}
                />
                <span
                  className={`block w-7 h-px bg-current origin-center transition-transform duration-300 ${
                    open ? '-rotate-45 -translate-y-[3px]' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-olive-deep"
          >
            <div className="absolute inset-0 grid lg:grid-cols-2">
              <div className="relative flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:pl-20 lg:pr-12">
                <nav className="flex flex-col gap-4 md:gap-6">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group block py-2"
                      >
                        <span className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light text-bone/85 leading-[0.95] tracking-tight transition-colors duration-300 group-hover:text-bone">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 text-bone/55 font-sans text-[12px]"
                >
                  <div>
                    <p className="text-bone/30 uppercase tracking-widest text-[10px] mb-2">
                      {dict.contact.coordsEyebrow}
                    </p>
                    <p>{dict.contact.addressLine1}</p>
                    <p>{dict.contact.addressLine2}</p>
                  </div>
                  <div>
                    <p className="text-bone/30 uppercase tracking-widest text-[10px] mb-2">
                      {dict.contact.phoneLabel}
                    </p>
                    <a href={`tel:${dict.contact.phoneTel}`} className="hover:text-bone transition-colors">
                      {dict.contact.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="text-bone/30 uppercase tracking-widest text-[10px] mb-2">
                      {dict.contact.emailLabel}
                    </p>
                    <a href={`mailto:${dict.contact.email}`} className="hover:text-bone transition-colors break-all">
                      {dict.contact.email}
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="hidden lg:block relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredIndex ?? 'default'}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={hoveredIndex === null ? HERO_IMAGE : links[hoveredIndex].img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="50vw"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-olive-deep/35" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
