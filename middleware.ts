import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const pathnameHasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )
  if (pathnameHasLocale) return NextResponse.next()

  if (pathname === '/') {
    const accept = req.headers.get('accept-language') ?? ''
    const wantsEn = /\ben\b/i.test(accept) && !/\bfr\b/i.test(accept)
    const target = wantsEn ? 'en' : defaultLocale
    const url = req.nextUrl.clone()
    url.pathname = `/${target}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|assets|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
}
