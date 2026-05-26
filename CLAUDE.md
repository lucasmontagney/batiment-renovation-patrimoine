# Bâtiment Rénovation Patrimoine

Site vitrine statique pour un atelier de maçonnerie d'art / restauration du patrimoine (Pézenas, Hérault, Languedoc).

## Stack

- **Statique** : HTML + CSS + JS vanilla. Pas de framework, pas de build step.
- **Fontes** : Cormorant Garamond (display) + Inter (body) via Google Fonts.
- **Design system** : tokens CSS dans `:root` de `assets/css/style.css` — palette pierre/chaux/ocre/olive, échelles `--text-*` fluides via clamp(), spacing `--s-1`..`--s-9`, conteneurs `--container` (1440), `--container-narrow` (960), `--container-prose` (680).
- **Conventions** : BEM-like (`.cat-section__head`, `.chantier__grid--1`). Pas de Tailwind. Ne **PAS** introduire de framework CSS.

## Pages

- `index.html` — accueil, hero plein écran + featured-grid + split sections
- `realisations.html` — galerie principale, regroupée en 7 catégories d'œuvres
- `services.html` — savoir-faire
- `engagements.html` — atelier / valeurs
- `contact.html` — formulaire + coordonnées

## Photos

- **Hero (toutes pages avec hero plein écran)** : `assets/images/oeuvres/cours-terrasses/05.jpg` (entrée bâtisse, volets verts).
- **24 photos d'œuvres** classées dans `assets/images/oeuvres/<categorie>/<nn>.jpg` :
  - `murs-pierre/` 01..05 (5)
  - `facades-chaux/` 02, 03, 04 (3)
  - `voutes-interieurs/` 01..03 (3)
  - `salles-de-bain/` 01..06 (6)
  - `cours-terrasses/` 01, 03, 04, 05 (4)  ← 05 = hero
  - `plages-piscine/` 02, 04 (2)
  - `calades/` 01 (1)
- Numérotation **non séquentielle** (trous volontaires) : ne pas "corriger" en renommant.

## Classes CSS qui pilotent la taille des photos

- `.hero__media` — plein écran 100svh, **ne pas réduire**.
- `.featured-grid` (accueil) — grille 12 col, modificateurs `.fg--7/5/4/8/6/full`.
- `.split__media` — média à demi-largeur dans `.split`, aspect 4/5 par défaut.
- `.service__img` — carte service, aspect 4/3.
- `.gallery` — galerie alternative (3 col), aspect 4/5 (utilisée en cas de vue plate).
- `.chantier__grid` (`--1`, `--2`, `--3`) — grilles principales de `realisations.html`, **structure officielle des œuvres**.
- `.project__bonus` — vignettes secondaires d'un projet.
- `.compare` — composant avant/après (slider 16/11).

## Lancement local

Tout statique : ouvrir `index.html` directement ou servir avec n'importe quel serveur (`python -m http.server`, `npx serve`, Live Server VSCode).

## Préférences

- Réponses en **français**.
- Pas de markdown verbeux dans les réponses chat sauf si demandé.
- Modifications CSS : **append en bas** plutôt que toucher le design system existant, sauf demande explicite de refacto.
- Pas d'images d'illustration générées : on travaille avec les 24 photos existantes.
