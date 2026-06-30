const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'GeneralContractor'],
  '@id': 'https://batiment-renovation-patrimoine.com/#business',
  name: 'Bâtiment Rénovation Patrimoine',
  description:
    "Maçonnerie traditionnelle et rénovation patrimoniale haut de gamme à Pézenas, dans l'Hérault.",
  image: 'https://batiment-renovation-patrimoine.com/images/hero/escalier.jpeg',
  url: 'https://batiment-renovation-patrimoine.com',
  telephone: '+33698037960',
  email: 'd.montagney@gmail.com',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6 rue de Peyne',
    addressLocality: 'Pézenas',
    postalCode: '34120',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Hérault' },
    { '@type': 'AdministrativeArea', name: 'Occitanie' },
  ],
  founder: {
    '@type': 'Person',
    name: 'David Montagney',
  },
  sameAs: ['https://www.instagram.com/davidmontagney/'],
  knowsAbout: [
    'Maçonnerie traditionnelle',
    'Enduits à la chaux',
    'Calades de galets',
    'Restauration de bâti ancien',
    'Voûtes en pierre',
    'Escaliers en pierre',
    'Terrasses tropéziennes',
    'Plages de piscine en pierre',
    'Béton de chanvre',
    'Sur-élévation',
  ],
}

export default function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  )
}
