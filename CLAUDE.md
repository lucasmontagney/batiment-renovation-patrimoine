# Bâtiment Rénovation Patrimoine

Site vitrine premium pour un atelier de maçonnerie d'art et restauration du patrimoine basé à Pézenas (Hérault, Occitanie).

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**.
- **next-intl** pour i18n FR/EN avec routes `/fr/*` et `/en/*`.
- **framer-motion** pour animations subtiles (fade-in scroll, parallax léger hero).
- Pas d'autre framework CSS. Pas de CMS — contenu en dur dans le repo.

## Identité

- **Nom** : Bâtiment Rénovation Patrimoine.
- **Ton éditorial** : sobre, presque littéraire. Phrases courtes, lyrisme retenu.
- **Esthétique** : moderne haut de gamme. Contraste fort, espace, photo plein écran.
- **Palette** : pierre + chaux + olive sombre (tokens `tailwind.config.ts`).
- **Typo** : Cormorant Garamond (display) + Inter (body), Google Fonts.
- **Logo + favicon** : à créer.

## Cible

- Particuliers haut de gamme (demeures anciennes, résidences secondaires).
- Architectes / maîtres d'œuvre / prescripteurs patrimoine.
- Zone : Hérault entier.

## Pages

- `/` — accueil : hero plein écran, intro atelier, piliers, featured chantier, citation, CTA.
- `/realisations` — galerie par catégorie + avant/après par catégorie (si dispo).
- `/atelier` — histoire, valeurs, équipe (portraits + nom + rôle), partenaires/formations.
- `/contact` — formulaire (nom/email/tél/projet/commune/budget/upload photos) + coordonnées.

Pas de blog v1. Pas de mentions légales v1.

## Photos

Structure dans `public/images/` (kebab-case ASCII, auto-discovery via manifest) :

- `public/images/projets/<categorie>/` — galerie de la catégorie (photos directement à la racine).
- `public/images/projets/<categorie>/avant après/` — couple de photos avant/après pour la catégorie (optionnel, voir plus bas).
- `public/images/home/hero/` — photo(s) du hero d'accueil (la première alphabétique est utilisée).
- `public/images/home/featured/` — photo(s) de la section "Réalisation mise en avant" sur l'accueil.
- `public/images/hero/` — fallback hero historique (`escalier.jpeg`).
- `public/images/brand/` — logo, favicon, OG.
- `public/images/equipe/` — portraits (à venir).

Modèle : **une catégorie = une galerie**. Toutes les photos d'une catégorie vont directement dans son dossier (pas de sous-dossiers par chantier).

Catégories actuelles : `calades/`, `construction/`, `enduits-chaux/`, `escalier/`, `salles-de-bain/`, `terrasses/`, `toits/`.

### Workflow ajout de photos

Pour ajouter une photo de galerie : la déposer dans le dossier de la catégorie — c'est tout. Le script `scripts/build-photos-manifest.js` régénère `lib/photos-manifest.json` à chaque `npm run dev` ou `npm run build` (hooks `predev` / `prebuild`). En local on peut aussi forcer : `npm run sync-photos`.

Pour ajouter une nouvelle catégorie : créer `public/images/projets/<slug>/`, déposer les photos, puis ajouter l'entrée dans `categoriesInput` de `lib/projects.ts` (slug, name FR/EN, folder).

### Avant/après par catégorie

Convention : dans une catégorie, créer un sous-dossier `avant après/` et y déposer exactement 2 photos. Le composant `CompareSlider` est rendu automatiquement dans la page Réalisations pour cette catégorie.

Pour contrôler l'ordre :
- Soit nommer les fichiers `avant.jpg` et `apres.jpg` (la détection se fait sur le nom — `avant`, `apres`, `après`, `before`, `after`).
- Soit laisser des noms arbitraires : l'ordre alphabétique décide (premier = avant, second = après).

L'emplacement du slider alterne automatiquement d'une catégorie à l'autre (au-dessus de la galerie / en dessous).

### Photos d'accueil

- `public/images/home/hero/` : déposer une photo plein écran pour le hero de l'accueil (parallaxe). Si le dossier est vide, l'ancien `hero/escalier.jpeg` est utilisé en fallback.
- `public/images/home/featured/` : déposer une photo verticale (ratio 4:5 idéal) pour la section "Réalisation mise en avant" sur l'accueil. Si vide, une photo enduits-chaux est utilisée par défaut.

Pour les deux dossiers, la première photo en ordre alphabétique est prise. Pour changer la photo, renommer ou remplacer le fichier.

## Coordonnées

- **Adresse** : 6 rue de Peyne, 34120 Pézenas.
- **Téléphone** : 06 98 03 79 60.
- **Email** : d.montagney@gmail.com (public + destination formulaire).
- **Instagram** : [@davidmontagney](https://www.instagram.com/davidmontagney/).
- **Domaine** : https://batiment-renovation-patrimoine.com/.

## Équipe

- David Montagney — Gérant.
- Mathias Branchu — Chef d'équipe.

Bios à remplir plus tard (sections vides au lancement).

## SEO

Mots-clés : rénovation intérieure · terrasse · terrasse tropézienne · plage de piscine · couverture · béton de chanvre / chaux-chanvre (SEO only) · enduit chaux · façade · escalier voûte catalane · agencement · patrimoine · Pézenas · Hérault.

## Conventions

- Réponses chat **en français**.
- Code, commentaires, classes en **anglais**.
- Tailwind utility-first, tokens dans `tailwind.config.ts` (`colors.pierre/chaux/olive-dark`, `fontFamily.display/sans`).
- Composants réutilisables dans `components/`, pages dans `app/[locale]/`.
- Animations sobres : FadeIn scroll, parallax léger hero. Pas de lightbox, pas de curseur custom.

## Lancement local

```
npm install
npm run dev
```

Build prod : `npm run build && npm start`. Lint : `npm run lint`.
