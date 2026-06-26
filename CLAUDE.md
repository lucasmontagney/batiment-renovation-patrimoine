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

- `/` — accueil : hero plein écran escalier, intro atelier, piliers savoir-faire, featured chantier, citation, CTA.
- `/realisations` — galerie chantiers par catégorie (visuel prime, peu de texte).
- `/savoir-faire` — techniques (pierre, chaux, terrasses, sdb, couverture, etc.).
- `/atelier` — histoire, valeurs, équipe (portraits + nom + rôle), partenaires/formations.
- `/contact` — formulaire (nom/email/tél/projet/commune/budget/upload photos) + coordonnées.

Pas de blog v1. Pas de mentions légales v1.

## Photos

Structure dans `public/images/` (kebab-case ASCII, auto-discovery via manifest) :

- `public/images/projets/<categorie>/<chantier>/<photo.jpg>` — convention par chantier.
- `public/images/hero/` — photos hero (escalier).
- `public/images/brand/` — logo, favicon, OG.
- `public/images/equipe/` — portraits (à venir).

Modèle : **une catégorie = une galerie**. Toutes les photos d'une catégorie vont directement dans son dossier (pas de sous-dossiers par chantier).

Catégories actuelles :

- `calades/`
- `construction/`
- `enduits-chaux/`
- `escalier/`
- `salles-de-bain/`
- `terrasses/`
- `toits/`

### Workflow ajout de photos

Pour ajouter une photo : la déposer dans le dossier de la catégorie — c'est tout. Le script `scripts/build-photos-manifest.js` régénère automatiquement `lib/photos-manifest.json` à chaque `npm run dev` ou `npm run build` (hooks `predev` / `prebuild`). En local on peut aussi forcer : `npm run sync-photos`.

Pour ajouter une nouvelle catégorie : créer un dossier `public/images/projets/<slug>/`, déposer les photos, puis ajouter l'entrée dans `categoriesInput` de `lib/projects.ts` (slug, name FR/EN, folder) — le tableau `photos` est dérivé automatiquement.

## Coordonnées

- **Adresse** : 6 rue de Peyne, 34120 Pézenas.
- **Téléphone** : 06 98 03 79 60.
- **Email** : d.montagney@gmail.com (public + destination formulaire).
- **Instagram** : [@davidmontagney](https://www.instagram.com/davidmontagney/).
- **Domaine** : https://batiment-renovation-patrimoine.fr/.

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
