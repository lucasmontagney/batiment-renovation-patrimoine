import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { OG_IMAGE } from '@/lib/projects'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://batiment-renovation-patrimoine.com'),
  title: {
    template: '%s · Bâtiment Rénovation Patrimoine',
    default: "Bâtiment Rénovation Patrimoine — Maçonnerie d'art, Pézenas",
  },
  description:
    "Maçonnerie traditionnelle et rénovation patrimoniale haut de gamme à Pézenas, dans l'Hérault. Enduits chaux, murs en pierre, voûtes, calades, terrasses.",
  authors: [{ name: 'David Montagney' }],
  creator: 'Bâtiment Rénovation Patrimoine',
  keywords: [
    'rénovation patrimoine Pézenas',
    'maçonnerie traditionnelle Hérault',
    'enduit chaux Hérault',
    'restauration bâti ancien Occitanie',
    'calade galets',
    'escalier voûte catalane',
    'terrasse tropézienne',
    'plage de piscine pierre',
    'béton de chanvre',
    'David Montagney',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Bâtiment Rénovation Patrimoine',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Bâtiment Rénovation Patrimoine — Maçonnerie d\'art, Pézenas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bâtiment Rénovation Patrimoine — Maçonnerie d\'art, Pézenas',
    description:
      'Maçonnerie traditionnelle et rénovation patrimoniale haut de gamme à Pézenas, dans l\'Hérault.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
