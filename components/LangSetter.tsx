'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LangSetter() {
  const pathname = usePathname()
  useEffect(() => {
    const locale = pathname.startsWith('/en') ? 'en' : 'fr'
    if (typeof document !== 'undefined' && document.documentElement.lang !== locale) {
      document.documentElement.lang = locale
    }
  }, [pathname])
  return null
}
