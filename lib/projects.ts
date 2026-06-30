import type { Locale } from './i18n'
import manifest from './photos-manifest.json'

const IMG_BASE = '/images'
const BEFORE_AFTER_SUBFOLDER = 'avant après'

export type BeforeAfter = {
  beforeSrc: string
  afterSrc: string
}

export type Category = {
  slug: string
  name: Record<Locale, string>
  folder: string
  description?: Record<Locale, string>
  photos: string[]
  beforeAfter?: BeforeAfter
}

type CategoryInput = {
  slug: string
  name: Record<Locale, string>
  folder: string
  description?: Record<Locale, string>
}

const photosByFolder = manifest as Record<string, string[]>

function detectBeforeAfter(folderKey: string): BeforeAfter | undefined {
  const files = photosByFolder[folderKey]
  if (!files || files.length < 2) return undefined

  const lower = (s: string) => s.toLowerCase()
  const beforeIdx = files.findIndex((f) => /\b(avant|before)\b/i.test(f) || lower(f).startsWith('avant') || lower(f).startsWith('before'))
  const afterIdx = files.findIndex((f) => /\b(apres|après|after)\b/i.test(f) || lower(f).startsWith('apres') || lower(f).startsWith('après') || lower(f).startsWith('after'))

  const folder = folderKey
  if (beforeIdx !== -1 && afterIdx !== -1) {
    return {
      beforeSrc: `${IMG_BASE}/${folder}/${files[beforeIdx]}`,
      afterSrc: `${IMG_BASE}/${folder}/${files[afterIdx]}`,
    }
  }
  return {
    beforeSrc: `${IMG_BASE}/${folder}/${files[0]}`,
    afterSrc: `${IMG_BASE}/${folder}/${files[1]}`,
  }
}

function attachCategory(input: CategoryInput): Category {
  const projectKey = `projets/${input.folder}`
  return {
    ...input,
    photos: photosByFolder[projectKey] ?? [],
    beforeAfter: detectBeforeAfter(`${projectKey}/${BEFORE_AFTER_SUBFOLDER}`),
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

export const categories: Category[] = categoriesInput.map(attachCategory)

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryPhotoSrc(category: Category, fileName: string): string {
  return `${IMG_BASE}/projets/${category.folder}/${fileName}`
}

export function getCategoryFirstPhoto(category: Category): string {
  const first = category.photos[0]
  if (first) return getCategoryPhotoSrc(category, first)
  if (category.beforeAfter) return category.beforeAfter.afterSrc
  return HERO_IMAGE
}

function firstFromFolder(folderKey: string, fallback: string): string {
  const files = photosByFolder[folderKey]
  if (!files || files.length === 0) return fallback
  return `${IMG_BASE}/${folderKey}/${files[0]}`
}

export const HERO_IMAGE = firstFromFolder('home/hero', firstFromFolder('hero', '/images/hero/escalier.jpeg'))

export const FEATURED_HOME_PROJECT = {
  src: firstFromFolder('home/featured', `${IMG_BASE}/projets/enduits-chaux/enduit-chaux-facade-01.jpg`),
  altFr: 'Façade restaurée à l\'enduit chaux — Bâtiment Rénovation Patrimoine, Pézenas',
  altEn: 'Lime render restored façade — Bâtiment Rénovation Patrimoine, Pézenas',
}

export function getCategoryPhotoAlt(
  category: Category,
  index: number,
  locale: Locale,
): string {
  const n = index + 1
  if (locale === 'fr') {
    return `${category.name.fr} — vue ${n} — Bâtiment Rénovation Patrimoine, Pézenas, Hérault`
  }
  return `${category.name.en} — view ${n} — Bâtiment Rénovation Patrimoine, Pézenas, France`
}

export const OG_IMAGE = firstFromFolder('og', HERO_IMAGE)
