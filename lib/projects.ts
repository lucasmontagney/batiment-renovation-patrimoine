import type { Locale } from './i18n'

const IMG = '/assets/images'

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

function photoPath(folder: string, file: string): string {
  return `${IMG}/${folder}/${file}`
}

export const categories: Category[] = [
  {
    slug: 'calades',
    name: { fr: 'Calades de galets', en: 'Pebble pavings' },
    folder: 'Calades de galets',
    projects: [
      {
        slug: 'calade-1',
        title: { fr: 'Cour d\'entrée et médaillon soleil', en: 'Entrance courtyard with sun medallion' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Calades de galets/Calade 1',
        photos: ['2018-09-18.jpg', 'Resized_20180913_162719.jpg', 'Resized_20180913_162745.jpg'],
      },
      {
        slug: 'calade-2',
        title: { fr: 'Grange voûtée — sol en galets', en: 'Vaulted barn — pebble flooring' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Calades de galets/Calade 2',
        photos: [
          'IMG-20201114-WA0001.jpg',
          'IMG-20201118-WA0009.jpg',
          'IMG-20201118-WA0018.jpg',
          'IMG-20201118-WA0033.jpg',
          'IMG-20201118-WA0036.jpg',
          'IMG-20201126-WA0001.jpg',
          'IMG-20201126-WA0002.jpg',
          'IMG-20201126-WA0004.jpg',
          'IMG-20201127-WA0026.jpg',
        ],
      },
      {
        slug: 'calade-3',
        title: { fr: 'Dalles et bordures en galets', en: 'Slabs with pebble borders' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Calades de galets/Calade 3',
        photos: [
          'IMG_20210413_084008.jpg',
          'IMG_20210414_100812.jpg',
          'IMG_20210414_172832.jpg',
          'IMG_20210415_162840.jpg',
          'IMG_20210415_162846.jpg',
        ],
      },
      {
        slug: 'calade-4',
        title: { fr: 'Médaillon en galets', en: 'Pebble medallion' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Calades de galets/Calade 4',
        photos: ['2022-04-08 (1).jpg', '2022-04-08.jpg'],
      },
      {
        slug: 'calade-5',
        title: { fr: 'Bord de rivière — pont et sol calade', en: 'Riverside — bridge and pebble floor' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Calades de galets/Calade 5',
        photos: ['IMG_6426.jpg', 'IMG_6431.jpg'],
      },
      {
        slug: 'calade-6',
        title: { fr: 'Joint calade — carreaux ciment', en: 'Pebble inset in cement tiles' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Calades de galets/Calade 6',
        photos: ['IMG_6432.jpg', 'IMG_6433.jpg'],
      },
    ],
  },
  {
    slug: 'enduits-chaux',
    name: { fr: 'Enduits à la chaux', en: 'Lime renders' },
    folder: 'Enduits à la chaux, facades',
    projects: [
      {
        slug: 'facade-1',
        title: { fr: 'Façade rose à beige — avant/après', en: 'Pink to beige façade — before/after' },
        location: { fr: 'Pézenas', en: 'Pézenas' },
        folder: 'Enduits à la chaux, facades/Façade 1',
        photos: ['2022-04-06 (1).jpg', '2022-04-06 (2).jpg', '2022-04-06.jpg'],
        beforeAfter: { before: '2022-04-06 (1).jpg', after: '2022-04-06.jpg' },
      },
      {
        slug: 'facade-2',
        title: { fr: 'Façade dorée aux volets bleus', en: 'Golden façade with blue shutters' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Enduits à la chaux, facades/Façade 2',
        photos: ['IMG-20211217-WA0000.jpg', 'IMG-20211217-WA0001.jpg', 'IMG-20211217-WA0002.jpg'],
      },
      {
        slug: 'facade-3',
        title: { fr: 'Restauration façade rue commerçante', en: 'High-street façade restoration' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Enduits à la chaux, facades/Façade 3',
        photos: ['IMG_20190726_085925.jpg'],
      },
      {
        slug: 'facade-4',
        title: { fr: 'Enduit chaux frais — chantier été', en: 'Fresh lime render — summer site' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Enduits à la chaux, facades/Façade 4',
        photos: [
          'PANO_20210705_174358.jpg',
          'PANO_20210705_174704.jpg',
          'PANO_20210708_081422.jpg',
          'IMG_20210712_093423.jpg',
        ],
      },
      {
        slug: 'facade-5',
        title: { fr: 'Demeure à porte cintrée — état initial', en: 'Arched-door home — initial state' },
        location: { fr: 'Pézenas', en: 'Pézenas' },
        folder: 'Enduits à la chaux, facades/Façade 5',
        photos: ['IMG_20220106_094015.jpg'],
      },
      {
        slug: 'facade-6',
        title: { fr: 'Façade beige fini — garage', en: 'Finished beige façade' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Enduits à la chaux, facades/Façade 6',
        photos: ['IMG_20220427_164952.jpg'],
      },
    ],
  },
  {
    slug: 'maconnerie-pierre',
    name: { fr: 'Maçonnerie de pierre', en: 'Stone masonry' },
    folder: 'Maçonnerie de pierre',
    projects: [
      {
        slug: 'pierre-1',
        title: { fr: 'Mur galets — maison de montagne', en: 'Pebble wall — mountain house' },
        location: { fr: 'Cévennes', en: 'Cévennes' },
        folder: 'Maçonnerie de pierre/Pierre 1',
        photos: ['IMG_6418.jpg', 'IMG_6424.jpg'],
      },
      {
        slug: 'pierre-2',
        title: { fr: 'Façade pierres plates', en: 'Flat-stone façade' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Maçonnerie de pierre/Pierre 2',
        photos: ['IMG_6422.jpg'],
      },
      {
        slug: 'pierre-3',
        title: { fr: 'Intérieur rustique — mur et niche', en: 'Rustic interior — wall and alcove' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Maçonnerie de pierre/Pierre 3',
        photos: ['19626.jpg', '52250.jpg'],
      },
      {
        slug: 'pierre-4',
        title: { fr: 'Escalier en pierre', en: 'Stone staircase' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Maçonnerie de pierre/Pierre 4',
        photos: ['IMG_6416.jpg'],
      },
      {
        slug: 'pierre-5',
        title: { fr: 'Voûte de cave — restauration', en: 'Cellar vault restoration' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Maçonnerie de pierre/Pierre 5',
        photos: ['IMG_20190912_102611.jpg', 'IMG_20190927_095740.jpg'],
      },
      {
        slug: 'pierre-6',
        title: { fr: 'Intérieur voûté restauré', en: 'Restored vaulted interior' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Maçonnerie de pierre/Pierre 6',
        photos: ['IMG_20191218_112813.jpg', 'IMG_20191219_153225.jpg'],
      },
      {
        slug: 'pierre-7',
        title: { fr: 'Excavation sous-sol', en: 'Basement excavation' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Maçonnerie de pierre/Pierre 7',
        photos: ['IMG_20200525_082210.jpg'],
      },
    ],
  },
  {
    slug: 'salles-de-bain',
    name: { fr: 'Salles de bain', en: 'Bathrooms' },
    folder: 'salles de bains',
    projects: [
      {
        slug: 'sdb-1',
        title: { fr: 'Douche en pierre brune dorée', en: 'Golden brown stone shower' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles de bains/Salle de bain 1',
        photos: ['-1019104130653345361.jpg'],
      },
      {
        slug: 'sdb-2',
        title: { fr: 'Salle de bain travertin — œil-de-bœuf', en: 'Travertine bathroom — oculus' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles de bains/Salle de bain 2',
        photos: [
          '-116185890689498279.jpg',
          '-602151230891967668.jpg',
          '1391659742876027560.jpg',
          '5395699012085002284.jpg',
        ],
      },
      {
        slug: 'sdb-3',
        title: { fr: 'Carrelage en cours de pose', en: 'Tiling in progress' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles de bains/Salle de bain 3',
        photos: ['IMG_20211116_105203.jpg', 'IMG_20211116_105207.jpg'],
      },
      {
        slug: 'sdb-4',
        title: { fr: 'Douche italienne travertin', en: 'Italian travertine shower' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'salles de bains/Salle de bain 4',
        photos: ['unnamed.jpg'],
      },
    ],
  },
  {
    slug: 'terrasses',
    name: { fr: 'Terrasses & plages de piscine', en: 'Terraces & pool decks' },
    folder: 'Terrasses, plage de piscine',
    projects: [
      {
        slug: 'terrasse-toute',
        title: { fr: 'Terrasses, plages de piscine', en: 'Terraces, pool decks' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Terrasses, plage de piscine',
        photos: [
          '2019-04-29 (1).jpg',
          '2019-04-29.jpg',
          '2019-05-27 (1).jpg',
          '2019-05-27.jpg',
          '2019-05-28.jpg',
          'IMG-20211109-WA0001.jpg',
          'IMG_20190521_103543.jpg',
          'IMG_20190625_174956.jpg',
          'IMG_20190625_175013.jpg',
          'IMG_20191116_104210.jpg',
          'IMG_20210529_113842.jpg',
          'IMG_20210529_113905.jpg',
          'IMG_20211007_081356.jpg',
          'IMG_6421.jpg',
          'IMG_6425.jpg',
          'IMG_6428.jpg',
          'IMG_6429.jpg',
          'IMG_6430.jpg',
          'IMG_6434.jpg',
          'PANO_20210922_085917.jpg',
          'PANO_20210922_085953.jpg',
          'PANO_20210922_111149.jpg',
          'Resized_20190318_155734.jpg',
          '5482051157561966893.jpg',
        ],
      },
    ],
  },
  {
    slug: 'construction',
    name: { fr: 'Construction & sur-élévation', en: 'Construction & additions' },
    folder: 'Construction, sur-élévation',
    projects: [
      {
        slug: 'construction-toutes',
        title: { fr: 'Construction & sur-élévation', en: 'Construction & additions' },
        location: { fr: 'Hérault', en: 'Hérault' },
        folder: 'Construction, sur-élévation',
        photos: [
          '2018-06-20.jpg',
          '2019-03-20.jpg',
          '2022-04-06.jpg',
          'IMG-20211015-WA0001.jpg',
          'IMG-20211015-WA0005.jpg',
          'IMG-20211015-WA0009.jpg',
          'IMG-20211015-WA0014.jpg',
          'IMG-20211015-WA0017.jpg',
          'IMG-20211015-WA0018.jpg',
          'IMG-20211015-WA0023.jpg',
          'IMG-20211015-WA0024.jpg',
          'IMG-20211015-WA0026.jpg',
          'IMG-20220211-WA0000.jpg',
          'IMG-20220211-WA0001.jpg',
          'IMG-20220211-WA0004.jpg',
          'IMG-20220302-WA0002.jpg',
          'IMG-20220302-WA0004.jpg',
          'IMG_20211027_113115.jpg',
          'IMG_20220317_101051.jpg',
          'IMG_20220426_093355.jpg',
          'IMG_20220513_084324.jpg',
          'IMG_20220513_084329.jpg',
          'IMG_20220513_084339.jpg',
          'IMG_20220513_084358.jpg',
          'PANO_20210803_131306.jpg',
          'PANO_20210803_131339.jpg',
          'PANO_20210812_095008.jpg',
          'PANO_20210812_095527.jpg',
          'PANO_20210914_113206.jpg',
          'PANO_20220426_093404.jpg',
        ],
      },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getProjectPhotoSrc(project: Project, fileName: string): string {
  return photoPath(project.folder, fileName)
}

export function getProjectFirstPhoto(project: Project): string {
  return photoPath(project.folder, project.photos[0])
}

export const HERO_IMAGE = `${IMG}/hero/escalier.jpeg`

export const FEATURED_HOME_PROJECT = {
  src: `${IMG}/Enduits à la chaux, facades/Façade 1/2022-04-06.jpg`,
  altFr: 'Façade restaurée à l\'enduit chaux — Pézenas',
  altEn: 'Lime render restored façade — Pézenas',
}
