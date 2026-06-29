import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
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
      <body>{children}</body>
    </html>
  )
}
