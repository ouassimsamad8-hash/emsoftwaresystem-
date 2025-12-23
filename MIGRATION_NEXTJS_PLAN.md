# 🚀 Plan de Migration : Vite → Next.js 15 (App Router)

## 📊 Analyse du Projet Actuel

### Stack Vite actuelle :
- **Frontend** : React 18.3.1 + Vite 5.4.20
- **Routing** : Wouter 3.3.5
- **Styles** : Tailwind CSS 3.4.17 + shadcn/ui
- **State** : TanStack Query 5.60.5
- **Backend** : Express + Strapi headless CMS
- **Animations** : Framer Motion 11.13.1

### Pages existantes (15 routes) :
1. `/` - Home
2. `/about` - About
3. `/services` - Services listing
4. `/services/:slug` - Service detail (dynamic)
5. `/projects` - Projects listing
6. `/projects/:slug` - Project detail (dynamic)
7. `/blog` - Blog listing (BlogNcmaz)
8. `/blog/:slug` - Blog post detail (dynamic)
9. `/faq` - FAQ
10. `/contact` - Contact form
11. `/book-appointment` - Booking form
12. `/privacy` - Privacy policy
13. `/cookies` - Cookies policy
14. `*` - 404 Not Found

### API Strapi :
- Base URL: `http://localhost:1337`
- Endpoints utilisés:
  - `/api/blog-posts` - Articles
  - `/api/services` - Services
  - `/api/projects` - Projets
  - `/api/faqs` - FAQs
  - `/api/site-setting` - Config site

---

## 🎯 Stratégie de Migration

### Option choisie : **Next.js 15 App Router** ✅

**Pourquoi App Router ?**
- ✅ Architecture moderne (la plus récente)
- ✅ React Server Components natif
- ✅ Meilleur SEO avec SSR/SSG
- ✅ Streaming et Suspense out-of-the-box
- ✅ Layouts imbriqués puissants
- ✅ Compatible avec le thème Ncmaz (qui utilise App Router)

---

## 📁 Structure du Nouveau Projet Next.js

```
nextjs-blog/
├── app/
│   ├── layout.tsx                 # Root layout (Navigation + Footer)
│   ├── page.tsx                   # Home page (/)
│   ├── about/
│   │   └── page.tsx               # /about
│   ├── services/
│   │   ├── page.tsx               # /services
│   │   └── [slug]/
│   │       └── page.tsx           # /services/:slug
│   ├── projects/
│   │   ├── page.tsx               # /projects
│   │   └── [slug]/
│   │       └── page.tsx           # /projects/:slug
│   ├── blog/
│   │   ├── page.tsx               # /blog (avec Ncmaz)
│   │   └── [slug]/
│   │       └── page.tsx           # /blog/:slug
│   ├── faq/
│   │   └── page.tsx               # /faq
│   ├── contact/
│   │   └── page.tsx               # /contact
│   ├── book-appointment/
│   │   └── page.tsx               # /book-appointment
│   ├── privacy/
│   │   └── page.tsx               # /privacy
│   ├── cookies/
│   │   └── page.tsx               # /cookies
│   ├── not-found.tsx              # 404 custom
│   └── error.tsx                  # Error boundary
├── components/
│   ├── Navigation.tsx             # Nav bar
│   ├── Footer.tsx                 # Footer
│   ├── CookieConsent.tsx          # Cookie banner
│   ├── ui/                        # shadcn components
│   ├── blog/                      # Blog components
│   └── ncmaz-adapted/             # Ncmaz adapted components
├── lib/
│   ├── strapi.ts                  # Strapi API client
│   ├── language-context.tsx      # i18n context
│   ├── theme-context.tsx          # Dark mode
│   └── utils.ts                   # Utilities
├── styles/
│   └── globals.css                # Global styles
├── public/
│   └── ...                        # Static assets
├── .env.local                     # Environment variables
├── .env.example                   # Template env
├── next.config.js                 # Next.js config
├── tailwind.config.ts             # Tailwind config
└── tsconfig.json                  # TypeScript config
```

---

## 🔄 Mapping Pages Vite → Next.js

| Route Vite | Next.js App Router | Type | Data Fetching |
|-----------|-------------------|------|---------------|
| `/` | `app/page.tsx` | Static | SSG |
| `/about` | `app/about/page.tsx` | Static | SSG |
| `/services` | `app/services/page.tsx` | Dynamic | SSR/ISR |
| `/services/:slug` | `app/services/[slug]/page.tsx` | Dynamic | SSG avec generateStaticParams |
| `/projects` | `app/projects/page.tsx` | Dynamic | SSR/ISR |
| `/projects/:slug` | `app/projects/[slug]/page.tsx` | Dynamic | SSG avec generateStaticParams |
| `/blog` | `app/blog/page.tsx` | Dynamic | SSR/ISR |
| `/blog/:slug` | `app/blog/[slug]/page.tsx` | Dynamic | SSG avec generateStaticParams |
| `/faq` | `app/faq/page.tsx` | Dynamic | SSR/ISR |
| `/contact` | `app/contact/page.tsx` | Static | Client-side |
| `/book-appointment` | `app/book-appointment/page.tsx` | Static | Client-side |
| `/privacy` | `app/privacy/page.tsx` | Static | SSG |
| `/cookies` | `app/cookies/page.tsx` | Static | SSG |

---

## 🛠 Étapes de Migration (Ordre d'exécution)

### Phase 1 : Setup Initial ✅
1. Créer projet Next.js 15 avec TypeScript
2. Configurer Tailwind CSS avec votre config actuelle
3. Copier tous les assets (images, fonts, etc.)
4. Setup variables d'environnement (.env.local)

### Phase 2 : Infrastructure 🔧
1. Créer Root Layout (`app/layout.tsx`)
   - Provider wrappers (Theme, Language, TanStack Query)
   - Navigation + Footer
   - Metadata globale
2. Créer client Strapi (`lib/strapi.ts`)
3. Migrer contexts (theme, language)
4. Migrer composants UI (shadcn)

### Phase 3 : Pages Statiques 📄
1. Home (`app/page.tsx`)
2. About (`app/about/page.tsx`)
3. Privacy (`app/privacy/page.tsx`)
4. Cookies (`app/cookies/page.tsx`)
5. 404 (`app/not-found.tsx`)

### Phase 4 : Pages Dynamiques (Strapi) 🌐
1. Services listing + detail
2. Projects listing + detail
3. FAQ
4. Blog listing (avec Ncmaz adapté)
5. Blog post detail

### Phase 5 : Formulaires & Interactivité 📝
1. Contact form
2. Book appointment form
3. Cookie consent

### Phase 6 : Optimisations & Tests ⚡
1. Image optimization (next/image)
2. Font optimization (next/font)
3. SEO metadata par page
4. Performance audit
5. Tests de tous les endpoints Strapi

---

## 🔌 Configuration Strapi

### Variables d'environnement (.env.local) :
```bash
# Strapi API
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="EM Software System"
```

### Client API Strapi (`lib/strapi.ts`) :
```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchAPI(endpoint: string, options = {}) {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
    next: { revalidate: 60 }, // ISR 1 minute
  });
  
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
```

---

## 🎨 Migration des Styles

### Tailwind config :
- ✅ Copier votre `tailwind.config.ts` actuel
- ✅ Garder tous les plugins (@tailwindcss/typography, forms, etc.)
- ✅ Garder toutes les couleurs custom (background, foreground, etc.)

### Global CSS :
- ✅ Copier votre `index.css` → `app/globals.css`
- ✅ Garder toutes les variables CSS (--background, --primary, etc.)

### Composants shadcn/ui :
- ✅ Copier tous les composants de `client/src/components/ui/`
- ✅ Adapter les imports si nécessaire

---

## 🚀 Commandes Next.js

```bash
# Development
npm run dev          # Lance sur http://localhost:3000

# Build
npm run build        # Build production optimisé
npm run start        # Lance le build en prod

# Analyse
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

---

## 📦 Dépendances à installer

### Déjà présentes (à copier) :
- ✅ @tanstack/react-query
- ✅ framer-motion
- ✅ lucide-react
- ✅ tailwindcss + plugins
- ✅ @radix-ui/* (shadcn)
- ✅ react-hook-form + zod
- ✅ clsx, tailwind-merge

### Nouvelles (Next.js specific) :
```bash
npm install next@latest react@latest react-dom@latest
```

---

## 🎯 Avantages de la Migration

### Performance :
- ✅ SSR/SSG pour meilleur SEO
- ✅ Automatic code splitting
- ✅ Image optimization native
- ✅ Font optimization
- ✅ Streaming HTML

### DX (Developer Experience) :
- ✅ File-based routing (plus simple)
- ✅ Server Components (moins de JS client)
- ✅ Built-in TypeScript support
- ✅ Hot reload ultra-rapide

### Ncmaz Integration :
- ✅ Compatible 100% avec le thème
- ✅ Mêmes patterns (App Router)
- ✅ Plus besoin d'adapter les composants !

---

## ⚠️ Points d'Attention

### À GARDER IDENTIQUE :
1. ❗ **Design visuel** - Exactement le même
2. ❗ **Routes** - Toutes les URLs identiques
3. ❗ **Endpoints Strapi** - Aucun changement côté CMS
4. ❗ **Fonctionnalités** - Tout doit marcher pareil

### À ADAPTER :
1. 🔄 Wouter → Next.js routing
2. 🔄 `import.meta.env` → `process.env.NEXT_PUBLIC_*`
3. 🔄 Vite aliases → Next.js aliases (tsconfig paths)
4. 🔄 Client-side fetch → Server Components fetch

---

## 📋 Checklist de Migration

### Setup :
- [ ] Créer projet Next.js 15
- [ ] Installer dépendances
- [ ] Configurer Tailwind
- [ ] Setup environnement

### Infrastructure :
- [ ] Root layout
- [ ] Providers (Query, Theme, Language)
- [ ] Navigation
- [ ] Footer
- [ ] Strapi client

### Pages (15 total) :
- [ ] Home
- [ ] About
- [ ] Services (listing + detail)
- [ ] Projects (listing + detail)
- [ ] Blog (listing + detail) avec Ncmaz
- [ ] FAQ
- [ ] Contact
- [ ] Book Appointment
- [ ] Privacy
- [ ] Cookies
- [ ] 404

### Composants :
- [ ] shadcn/ui components
- [ ] Ncmaz adapted components
- [ ] CookieConsent
- [ ] ErrorBoundary

### Optimisations :
- [ ] SEO metadata
- [ ] Images next/image
- [ ] Fonts next/font
- [ ] Performance check

### Tests :
- [ ] Toutes les routes
- [ ] Tous les formulaires
- [ ] Strapi endpoints
- [ ] Dark mode
- [ ] i18n (FR/EN)
- [ ] Responsive

---

## 🎉 Résultat Final

Un site Next.js 15 **visuellement identique** au site Vite actuel, mais avec :
- ✅ Meilleur SEO (SSR/SSG)
- ✅ Meilleures performances
- ✅ Thème Ncmaz utilisable TEL QUEL
- ✅ Architecture moderne et maintenable
- ✅ Même design, mêmes fonctionnalités
- ✅ Strapi inchangé

---

## 🚀 Prêt à commencer la migration ?

**Temps estimé** : 1-2 jours de travail

**Ordre d'exécution** :
1. Phase 1 : Setup (30 min)
2. Phase 2 : Infrastructure (2h)
3. Phase 3 : Pages statiques (2h)
4. Phase 4 : Pages dynamiques (4h)
5. Phase 5 : Formulaires (2h)
6. Phase 6 : Tests & optimisations (2h)

**Total** : ~12 heures de dev

Voulez-vous que je commence ? 🚀
