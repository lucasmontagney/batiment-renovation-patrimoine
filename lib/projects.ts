import type { Locale } from './i18n'
import manifest from './photos-manifest.json'

const IMG_BASE = '/images/projets'

export type Category = {
  slug: string
  name: Record<Locale, string>
  folder: string
  description?: Record<Locale, string>
  photos: string[]
}

type CategoryInput = Omit<Category, 'photos'> & { photos?: string[] }

const photosByFolder = manifest as Record<string, string[]>

function attachPhotos(input: CategoryInput): Category {
  return {
    ...input,
    photos: input.photos ?? photosByFolder[input.folder] ?? [],
  }
}

const categoriesInput: CategoryInput[] = [
  {
    slug: 'calades',
    name: { fr: 'Calades de galets', en: 'Pebble pavings' },
    folder: 'calades',
  },
  {
    slug: 'enduits-chaux',
    name: { fr: 'Enduits à la chaux', en: 'Lime renders' },
    folder: 'enduits-chaux',
  },
  {
    slug: 'escalier',
    name: { fr: 'Escaliers', en: 'Staircases' },
    folder: 'escalier',
  },
  {
    slug: 'salles-de-bain',
    name: { fr: 'Salles de bain', en: 'Bathrooms' },
    folder: 'salles-de-bain',
  },
  {
    slug: 'terrasses',
    name: { fr: 'Terrasses & plages de piscine', en: 'Terraces & pool decks' },
    folder: 'terrasses',
  },
  {
    slug: 'construction',
    name: { fr: 'Construction & sur-élévation', en: 'Construction & additions' },
    folder: 'construction',
  },
  {
    slug: 'toits',
    name: { fr: 'Toits & couvertures', en: 'Roofing' },
    folder: 'toits',
  },
]

export const categories: Category[] = categoriesInput.map(attachPhotos)

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryPhotoSrc(category: Category, fileName: string): string {
  return `${IMG_BASE}/${category.folder}/${fileName}`
}

export function getCategoryFirstPhoto(category: Category): string {
  return `${IMG_BASE}/${category.folder}/${category.photos[0]}`
}

export const HERO_IMAGE = '/images/hero/escalier.jpeg'

export const FEATURED_HOME_PROJECT = {
  src: `${IMG_BASE}/enduits-chaux/WhatsApp Image 2026-06-25 at 16.45.53.jpeg`,
  altFr: 'Façade restaurée à l\'enduit chaux — Pézenas',
  altEn: 'Lime render restored façade — Pézenas',
}
