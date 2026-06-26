import type { Locale } from './i18n'
import manifest from './photos-manifest.json'

const IMG_BASE = '/images/projets'

export type Project = {
  slug: string
  title: Record<Locale, string>
  location?: Record<Locale, string>
  description?: Record<Locale, string>
  folder: string
  photos: string[]
  beforeAfter?: { before: string; after: string }
}

export type Category = {
  slug: string
  name: Record<Locale, string>
  folder: string
  projects: Project[]
}

type ProjectInput = Omit<Project, 'photos'> & { photos?: string[] }
type CategoryInput = Omit<Category, 'projects'> & { projects: ProjectInput[] }

const photosByFolder = manifest as Record<string, string[]>

function attachPhotos(input: ProjectInput): Project {
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
    projects: [
      {
        slug: 'calade-1',
        title: { fr: 'Cour d\'entrée et médaillon soleil', en: 'Entrance courtyard with sun medallion' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'calades/calade-1',
      },
      {
        slug: 'calade-2',
        title: { fr: 'Grange voûtée — sol en galets', en: 'Vaulted barn — pebble flooring' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'calades/calade-2',
      },
      {
        slug: 'calade-3',
        title: { fr: 'Dalles et bordures en galets', en: 'Slabs with pebble borders' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'calades/calade-3',
      },
      {
        slug: 'calade-4',
        title: { fr: 'Médaillon en galets', en: 'Pebble medallion' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'calades/calade-4',
      },
      {
        slug: 'calade-5',
        title: { fr: 'Bord de rivière — pont et sol calade', en: 'Riverside — bridge and pebble floor' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'calades/calade-5',
      },
      {
        slug: 'calade-6',
        title: { fr: 'Joint calade — carreaux ciment', en: 'Pebble inset in cement tiles' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'calades/calade-6',
      },
    ],
  },
  {
    slug: 'enduits-chaux',
    name: { fr: 'Enduits à la chaux', en: 'Lime renders' },
    folder: 'enduits-chaux',
    projects: [
      {
        slug: 'facade-1',
        title: { fr: 'Façade rose à beige — avant/après', en: 'Pink to beige façade — before/after' },
        location: { fr: 'Pézenas', en: 'Pézenas' },
        folder: 'enduits-chaux/facade-1',
        beforeAfter: { before: '2022-04-06 (1).jpg', after: '2022-04-06.jpg' },
      },
      {
        slug: 'facade-2',
        title: { fr: 'Façade dorée aux volets bleus', en: 'Golden façade with blue shutters' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'enduits-chaux/facade-2',
      },
      {
        slug: 'facade-3',
        title: { fr: 'Restauration façade rue commerçante', en: 'High-street façade restoration' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'enduits-chaux/facade-3',
      },
      {
        slug: 'facade-4',
        title: { fr: 'Enduit chaux frais — chantier été', en: 'Fresh lime render — summer site' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'enduits-chaux/facade-4',
      },
      {
        slug: 'facade-5',
        title: { fr: 'Demeure à porte cintrée — état initial', en: 'Arched-door home — initial state' },
        location: { fr: 'Pézenas', en: 'Pézenas' },
        folder: 'enduits-chaux/facade-5',
      },
      {
        slug: 'facade-6',
        title: { fr: 'Façade beige fini — garage', en: 'Finished beige façade' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'enduits-chaux/facade-6',
      },
    ],
  },
  {
    slug: 'maconnerie-pierre',
    name: { fr: 'Maçonnerie de pierre', en: 'Stone masonry' },
    folder: 'maconnerie-pierre',
    projects: [
      {
        slug: 'pierre-1',
        title: { fr: 'Mur galets — maison de montagne', en: 'Pebble wall — mountain house' },
        location: { fr: 'Cévennes', en: 'Cévennes' },
        folder: 'maconnerie-pierre/pierre-1',
      },
      {
        slug: 'pierre-2',
        title: { fr: 'Façade pierres plates', en: 'Flat-stone façade' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'maconnerie-pierre/pierre-2',
      },
      {
        slug: 'pierre-3',
        title: { fr: 'Intérieur rustique — mur et niche', en: 'Rustic interior — wall and alcove' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'maconnerie-pierre/pierre-3',
      },
      {
        slug: 'pierre-4',
        title: { fr: 'Escalier en pierre', en: 'Stone staircase' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'maconnerie-pierre/pierre-4',
      },
      {
        slug: 'pierre-5',
        title: { fr: 'Voûte de cave — restauration', en: 'Cellar vault restoration' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'maconnerie-pierre/pierre-5',
      },
      {
        slug: 'pierre-6',
        title: { fr: 'Intérieur voûté restauré', en: 'Restored vaulted interior' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'maconnerie-pierre/pierre-6',
      },
      {
        slug: 'pierre-7',
        title: { fr: 'Excavation sous-sol', en: 'Basement excavation' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'maconnerie-pierre/pierre-7',
      },
    ],
  },
  {
    slug: 'salles-de-bain',
    name: { fr: 'Salles de bain', en: 'Bathrooms' },
    folder: 'salles-de-bain',
    projects: [
      {
        slug: 'sdb-1',
        title: { fr: 'Douche en pierre brune dorée', en: 'Golden brown stone shower' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles-de-bain/sdb-1',
      },
      {
        slug: 'sdb-2',
        title: { fr: 'Salle de bain travertin — œil-de-bœuf', en: 'Travertine bathroom — oculus' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles-de-bain/sdb-2',
      },
      {
        slug: 'sdb-3',
        title: { fr: 'Carrelage en cours de pose', en: 'Tiling in progress' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles-de-bain/sdb-3',
      },
      {
        slug: 'sdb-4',
        title: { fr: 'Douche italienne travertin', en: 'Italian travertine shower' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles-de-bain/sdb-4',
      },
    ],
  },
  {
    slug: 'terrasses',
    name: { fr: 'Terrasses & plages de piscine', en: 'Terraces & pool decks' },
    folder: 'terrasses',
    projects: [
      {
        slug: 'terrasse-toutes',
        title: { fr: 'Terrasses, plages de piscine', en: 'Terraces, pool decks' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'terrasses/chantier-1',
      },
    ],
  },
  {
    slug: 'construction',
    name: { fr: 'Construction & sur-élévation', en: 'Construction & additions' },
    folder: 'construction',
    projects: [
      {
        slug: 'construction-toutes',
        title: { fr: 'Construction & sur-élévation', en: 'Construction & additions' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'construction/chantier-1',
      },
    ],
  },
]

export const categories: Category[] = categoriesInput.map((c) => ({
  ...c,
  projects: c.projects.map(attachPhotos),
}))

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getProjectPhotoSrc(project: Project, fileName: string): string {
  return `${IMG_BASE}/${project.folder}/${fileName}`
}

export function getProjectFirstPhoto(project: Project): string {
  return `${IMG_BASE}/${project.folder}/${project.photos[0]}`
}

export const HERO_IMAGE = '/images/hero/escalier.jpeg'

export const FEATURED_HOME_PROJECT = {
  src: `${IMG_BASE}/enduits-chaux/facade-1/2022-04-06.jpg`,
  altFr: 'Façade restaurée à l\'enduit chaux — Pézenas',
  altEn: 'Lime render restored façade — Pézenas',
}
