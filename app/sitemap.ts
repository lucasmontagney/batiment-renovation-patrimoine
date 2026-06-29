import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

const BASE_URL = 'https://batiment-renovation-patrimoine.fr'
const routes = ['', '/realisations', '/atelier', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap((l) =>
    routes.map((r) => ({
      url: `${BASE_URL}/${l}${r}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: r === '' ? 1 : 0.7,
    })),
  )
}
