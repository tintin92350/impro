# Impro Suisse — Spécification technique de l'application publique

## Résumé du projet

Application web de type SPA destinée à consulter des fiches d'improvisation théâtrale : définitions, exercices et un générateur de thèmes aléatoires. L'application est 100% statique, sans authentification côté utilisateur, optimisée pour mobile.

Une seconde application (admin, Next.js, privée) sera développée séparément pour gérer le contenu.

---

## Architecture générale

```
Utilisateur (mobile/desktop)
        │
        ▼
   Scaleway Edge Services (CDN + HTTPS)
        │
        ▼
   Scaleway Object Storage (S3-compatible)
   ├── index.html
   ├── assets/          ← JS, CSS, images (build Vite)
   └── content/         ← Données JSON (fiches, exercices, thèmes)
```

L'application est un bundle statique servi depuis un bucket Scaleway Object Storage, avec Edge Services devant pour le HTTPS et le cache. Le contenu (fiches, exercices, thèmes) est stocké sous forme de fichiers JSON dans le même bucket, dans un préfixe `content/`. La SPA les charge via de simples requêtes `fetch()`.

Aucun backend, aucune API, aucune base de données.

---

## Stack technique

| Composant        | Choix                                     | Justification                                       |
|------------------|-------------------------------------------|------------------------------------------------------|
| Framework        | React 18+                                 | Écosystème mature, composants réutilisables           |
| Build tool       | Vite                                      | Build rapide, HMR, tree-shaking natif                 |
| Styling          | Tailwind CSS                              | Utilitaire, responsive-first, personnalisation facile |
| Routing          | React Router v7                          | SPA routing standard                                  |
| Langage          | TypeScript                                | Typage du contenu, maintenabilité                     |
| Hébergement      | Scaleway Object Storage + Edge Services   | Statique, pas cher, HTTPS, datacenter européen        |
| CI/CD            | GitHub Actions                            | Build + déploiement automatique sur push              |

---

## Structure du projet

```
impro-suisse-public/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                  ← Point d'entrée
│   ├── App.tsx                   ← Router principal
│   ├── components/
│   │   ├── Layout.tsx            ← Shell (header, nav, footer)
│   │   ├── FicheCard.tsx         ← Carte d'aperçu d'une fiche
│   │   ├── ExerciceCard.tsx      ← Carte d'aperçu d'un exercice
│   │   ├── SearchBar.tsx         ← Barre de recherche/filtre
│   │   ├── ThemeGenerator.tsx    ← Générateur de thèmes aléatoires
│   │   └── Tag.tsx               ← Badge de catégorie
│   ├── pages/
│   │   ├── HomePage.tsx          ← Accueil avec navigation rapide
│   │   ├── FichesPage.tsx        ← Liste des fiches de définition
│   │   ├── FicheDetailPage.tsx   ← Détail d'une fiche
│   │   ├── ExercicesPage.tsx     ← Liste des exercices
│   │   ├── ExerciceDetailPage.tsx← Détail d'un exercice
│   │   ├── GenerateurPage.tsx    ← Page du générateur de thèmes
│   │   └── NotFoundPage.tsx      ← 404
│   ├── hooks/
│   │   ├── useContent.ts         ← Hook de chargement du contenu JSON
│   │   └── useRandomTheme.ts     ← Logique du générateur aléatoire
│   ├── types/
│   │   └── content.ts            ← Interfaces TypeScript
│   └── utils/
│       └── search.ts             ← Filtrage/recherche côté client
├── content/                      ← Données JSON (copiées dans le build)
│   ├── fiches.json
│   ├── exercices.json
│   └── themes.json
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Modèle de données

Trois types de contenu, tous stockés en JSON.

### Fiche de définition

```typescript
interface Fiche {
  id: string;                  // slug unique, ex: "le-freeze"
  titre: string;               // "Le freeze"
  description: string;         // Texte court d'introduction
  contenu: string;             // Corps de la fiche (Markdown ou HTML)
  categorie: string;           // "technique" | "concept" | "format" | "regle"
  tags: string[];              // ["base", "débutant", "scène"]
}
```

### Exercice

```typescript
interface Exercice {
  id: string;                  // slug unique, ex: "zip-zap-zop"
  titre: string;               // "Zip Zap Zop"
  objectif: string;            // "Travailler l'écoute et la réactivité"
  description: string;         // Explication détaillée
  nombreJoueurs: {
    min: number;
    max: number | null;        // null = pas de maximum
  };
  duree: number;               // Durée estimée en minutes
  niveau: string;              // "débutant" | "intermédiaire" | "avancé"
  categorie: string;           // "échauffement" | "écoute" | "narration" | "personnage" | "espace"
  tags: string[];
  variantes?: string[];        // Variantes optionnelles
  conseils?: string[];         // Conseils pour l'animateur
}
```

### Thème

```typescript
interface Theme {
  id: string;
  texte: string;               // "Un mariage qui tourne mal"
  categorie: string;           // "situation" | "lieu" | "emotion" | "objet" | "personnage" | "phrase"
}
```

Le fichier `themes.json` contient un tableau plat de thèmes. Le générateur pioche aléatoirement dedans, avec un filtre optionnel par catégorie.

---

## Pages et fonctionnalités

### Accueil

Page d'entrée avec trois blocs de navigation rapide vers les fiches, les exercices et le générateur.

### Fiches de définition

Liste filtrable par catégorie et recherche textuelle. Chaque fiche s'ouvre sur une page de détail. Le filtrage se fait côté client.

### Exercices

Liste filtrable par niveau, catégorie, nombre de joueurs et durée. Chaque exercice s'ouvre sur une page de détail.

### Générateur de thèmes

Un bouton "Générer", un filtre optionnel par catégorie. Tirage aléatoire via `Math.random()`.

---

## Chargement du contenu

Le contenu est chargé au démarrage via `fetch()` sur les fichiers JSON du bucket.

```
GET /content/fiches.json
GET /content/exercices.json
GET /content/themes.json
```

Stratégie :

1. Au montage de `App.tsx`, lancer les trois fetches en parallèle via `Promise.all`.
2. Stocker les résultats dans un contexte React (`ContentProvider`).
3. Les pages consomment le contexte via le hook `useContent()`.
4. Afficher un loader pendant le chargement initial.

Les fichiers JSON sont petits (quelques dizaines de Ko). Un seul chargement initial suffit.

### Cache

Mettre un `Cache-Control: max-age=300` (5 min) sur les fichiers `content/*.json` dans Scaleway Object Storage. Les assets buildés par Vite contiennent un hash dans le nom de fichier et peuvent avoir un TTL long (`max-age=31536000`).

---

## Design et identité visuelle

### Charte couleur

Couleur dominante : rouge suisse.

| Rôle             | Couleur     | Usage                                    |
|------------------|-------------|------------------------------------------|
| Primaire         | `#E51E25`   | Rouge suisse — accents, boutons, CTA     |
| Primaire foncé   | `#B42328`   | Hover, focus                             |
| Primaire clair   | `#FCEAEA`   | Fonds légers, badges                     |
| Texte principal  | `#171616`   | Titres, corps de texte                   |
| Texte secondaire | `#6B7280`   | Labels, descriptions                     |
| Fond de page     | `#F9FAFB`   | Background général                       |
| Blanc            | `#FFFFFF`   | Cartes, surfaces                         |

Configuration Tailwind :

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        swiss: {
          50: '#FCEAEA',
          100: '#F8C5C7',
          200: '#F09A9D',
          300: '#E86165',
          400: '#E51E25',
          500: '#B42328',
          600: '#8E1B1F',
          700: '#681416',
          800: '#430D0E',
          900: '#2B0809',
        },
        text: {
          primary: '#171616',
          secondary: '#6B7280',
        },
      },
    },
  },
};
```

### Typographie

Deux fontes Google Fonts :

- Titres : une fonte display (ex: "DM Serif Display", "Playfair Display" ou "Fraunces").
- Corps : une sans-serif lisible sur mobile (ex: "DM Sans", "Plus Jakarta Sans" ou "Outfit").

### Responsive et mobile-first

- `< 640px` : Vue mobile (par défaut). Navigation en bottom bar. Cartes en colonne.
- `640px - 1024px` : Tablette. Grille 2 colonnes.
- `> 1024px` : Desktop. Grille 3 colonnes, top bar.

### Navigation mobile

Bottom navigation bar fixe avec 4 onglets : Accueil, Fiches, Exercices, Générateur.

---

## Routing

```
/                       → HomePage
/fiches                 → FichesPage
/fiches/:id             → FicheDetailPage
/exercices              → ExercicesPage
/exercices/:id          → ExerciceDetailPage
/generateur             → GenerateurPage
*                       → NotFoundPage
```

Configuration SPA : configurer la page d'erreur du bucket sur `index.html` pour que toutes les routes soient gérées par React Router.

---

## Recherche et filtrage

100% côté client. Recherche textuelle par sous-chaîne (case-insensitive) sur `titre`, `description` et `tags`. Optionnellement `fuse.js` (~6 Ko) pour du fuzzy search.

Filtres reflétés dans l'URL via query parameters (`/exercices?niveau=debutant`) pour le partage de liens.

---

## Déploiement

### Infrastructure Scaleway

| Ressource                   | Configuration                                              |
|-----------------------------|------------------------------------------------------------|
| Object Storage (bucket)     | Hébergement statique activé, région `fr-par` ou `nl-ams`   |
| Edge Services               | CDN devant le bucket, HTTPS avec certificat Let's Encrypt   |
| Domaines & DNS (optionnel)  | DNS Scaleway si domaine custom (ex: impro-suisse.ch)        |

Scaleway Object Storage est S3-compatible. On utilise l'AWS CLI ou `s3cmd` pour synchroniser les fichiers.

### Pipeline CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run build

      - name: Deploy to Scaleway Object Storage
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.SCW_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.SCW_SECRET_KEY }}
        run: |
          aws s3 sync dist/ s3://${{ vars.SCW_BUCKET }}/ \
            --endpoint-url https://s3.fr-par.scw.cloud \
            --delete
```

Le déploiement se déclenche à chaque push sur `main`. L'AWS CLI fonctionne directement avec Scaleway grâce à la compatibilité S3.

### Mise à jour du contenu

L'application admin (Next.js) écrira les fichiers JSON directement dans le bucket via le SDK S3. Le contenu peut aussi être mis à jour manuellement via la console Scaleway ou `s3cmd`.

---

## Qualité de code

| Outil            | Usage                                        |
|------------------|----------------------------------------------|
| ESLint           | Linting TypeScript/React                     |
| Prettier         | Formatage automatique                        |
| Vitest           | Tests unitaires sur les hooks et utilitaires  |

---

## Estimation de coûts (hébergement)

| Ressource              | Coût estimé / mois    | Notes                                       |
|------------------------|-----------------------|----------------------------------------------|
| Object Storage         | < 1 € (75 Go gratuits) | Quelques Mo de stockage, peu de requêtes   |
| Edge Services          | ~2-3 €                | Forfait de base pour le CDN + HTTPS          |
| DNS (optionnel)        | ~1 €                  | Si domaine géré par Scaleway                 |
| **Total**              | **~2-4 € / mois**    | Pour un trafic modéré                        |

---

## Liens avec l'application admin (Next.js)

Les deux applications sont totalement découplées. Le seul point de contact est le bucket Scaleway Object Storage :

- L'admin écrit dans `s3://bucket/content/*.json`.
- La SPA publique lit depuis `s3://bucket/content/*.json` (via Edge Services).

Ce découplage permet de développer et déployer les deux applications indépendamment.
