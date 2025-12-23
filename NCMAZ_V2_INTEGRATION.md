# 🎨 Intégration Ncmaz v2 - Guide Complet

## ✅ Ce qui a été fait

### 1. **Migration vers Ncmaz v2 (Next.js pur)**
- ✅ Copié 166 composants de Ncmaz v2 (sans dépendances WordPress)
- ✅ Backup de l'ancienne version v1 → `ncmaz-v1-backup/`
- ✅ Copié data types, utils, styles, contains

**Avantage**: Ncmaz v2 utilise une structure de données simple (`PostDataType`) au lieu de WordPress GraphQL.

### 2. **Structure des fichiers copiés**

```
client/src/
├── ncmaz-components/        # 166 composants originaux Ncmaz v2
├── ncmaz-data/              # Types (PostDataType, TaxonomyType, etc.)
├── ncmaz-styles/            # Styles Ncmaz
├── ncmaz-utils/             # Utilitaires
├── ncmaz-contains/          # Constantes
├── ncmaz-v1-backup/         # Ancienne version (WordPress)
└── components/
    └── ncmaz-adapted/       # Composants adaptés pour Wouter + Strapi
```

### 3. **Composants adaptés créés**

#### Composants de base :
- ✅ **NcImage.tsx** - Image avec lazy loading (sans Next.js Image)
- ✅ **NcLink.tsx** - Link avec Wouter (au lieu de Next Link)
- ✅ **Avatar.tsx** - Avatar avec 12 couleurs, initials fallback
- ✅ **Badge.tsx** - Badges de catégorie avec 8 couleurs (dark mode)

#### Composants métier :
- ✅ **PostCardMeta.tsx** - Affiche auteur, date (français), temps lecture
- ✅ **CategoryBadgeList.tsx** - Liste de badges catégories
- ✅ **Card3.tsx** - Carte d'article horizontale (texte gauche, image droite)

#### Export centralisé :
- ✅ **index.ts** - Export de tous les composants adaptés

### 4. **Mapper Strapi → Ncmaz**

Créé : `lib/strapi-to-ncmaz-mapper.ts`

**Fonctions principales :**
```typescript
strapiPostToNcmaz(post)      // Convertit 1 post Strapi → PostDataType
strapiPostsToNcmaz(posts)    // Convertit tableau de posts
useNcmazBlogPosts()          // Hook React pour obtenir posts au format Ncmaz
```

**Mapping automatique :**
- Catégories → Couleurs automatiques (tech=blue, design=purple, etc.)
- Auteur Strapi → PostAuthorType complet
- Images relatives → URLs absolues avec baseUrl
- Dates → Format français

### 5. **Page Blog adaptée**

Créé : `pages/BlogNcmaz.tsx`

**Fonctionnalités :**
- ✅ Utilise `useNcmazBlogPosts()` pour data au format Ncmaz
- ✅ Affiche les articles avec `Card3` adapté
- ✅ Recherche et filtres par catégorie
- ✅ Hero section avec blur effects
- ✅ Newsletter CTA

**Route active :** `/blog` → BlogNcmaz (configuré dans App.tsx)

---

## 🎯 Prochaines étapes

### Composants à adapter (prioritaires) :

1. **CardLarge1** - Grande carte pour article featured
   - Layout: Image en haut, contenu en bas
   - Utilisé pour mettre en avant l'article principal

2. **Card11** - Carte avec overlay texte sur image
   - Effet glassmorphism
   - Texte superposé élégant

3. **Card2** - Carte verticale classique
   - Image en haut, texte en bas
   - Version alternative à Card3

4. **SectionHero** - Hero section pour page blog
   - Slider d'articles featured
   - Animations sophistiquées

### Optimisations :

1. **Images**
   - Ajouter placeholder pendant chargement
   - Optimiser les tailles d'image

2. **Performance**
   - Lazy load des composants Ncmaz
   - Code splitting par route

3. **Accessibilité**
   - Ajouter aria-labels
   - Améliorer navigation clavier

---

## 📊 Comparaison v1 vs v2

| Feature | Ncmaz v1 (WordPress) | Ncmaz v2 (Next.js) |
|---------|---------------------|-------------------|
| Dépendances | WordPress GraphQL | PostDataType simple |
| Complexité | 🔴 Élevée | 🟢 Faible |
| Adaptation | 🔴 Difficile | 🟢 Facile |
| Fichiers | 202 | 166 |
| Maintenance | 🔴 Complexe | 🟢 Simple |

---

## 🚀 Comment utiliser

### 1. Utiliser le hook dans vos pages :

```tsx
import { useNcmazBlogPosts } from '@/lib/strapi-to-ncmaz-mapper';

function MyBlogPage() {
  const { posts, isLoading, error } = useNcmazBlogPosts();
  
  return (
    <div>
      {posts.map(post => (
        <Card3 key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### 2. Utiliser les composants adaptés :

```tsx
import { Card3, Badge, Avatar, PostCardMeta } from '@/components/ncmaz-adapted';
```

### 3. Mapper manuellement un post :

```tsx
import { strapiPostToNcmaz } from '@/lib/strapi-to-ncmaz-mapper';

const strapiPost = await fetch('/api/blog-posts/1').then(r => r.json());
const ncmazPost = strapiPostToNcmaz(strapiPost);
```

---

## 🎨 Personnalisation

### Couleurs de catégories

Modifiez dans `strapi-to-ncmaz-mapper.ts` :

```typescript
const CATEGORY_COLORS: Record<string, string> = {
  'tech': 'blue',
  'design': 'purple',
  'business': 'green',
  // Ajoutez vos catégories...
};
```

### Styles des composants

Les composants utilisent Tailwind CSS avec les classes de votre projet. Vous pouvez :
- Modifier directement dans `ncmaz-adapted/*.tsx`
- Surcharger avec `className` prop
- Étendre dans votre `tailwind.config.ts`

---

## 🐛 Debugging

### Erreurs TypeScript dans IDE

Si vous voyez des erreurs "Cannot find module" dans Card3.tsx mais que l'app fonctionne :
- ✅ Ce sont des faux positifs de l'IDE
- ✅ Les fichiers existent et le build fonctionne
- ✅ Redémarrez VS Code si nécessaire

### Vérifier que tout fonctionne :

```bash
# 1. Démarrer l'app
npm run dev

# 2. Ouvrir http://localhost:5000/blog

# 3. Vous devriez voir les articles avec le design Ncmaz
```

---

## 📦 Composants disponibles (originaux)

Dans `/ncmaz-components/` vous avez accès à 166 composants :

**Cards :** Card2, Card3, Card4, Card5, Card10, Card11, Card12, Card13, Card14, Card15Podcast, Card16Podcast, Card17Podcast, Card18, Card19, CardLarge1, Card3Small

**UI :** Avatar, Badge, Button, ButtonClose, Input, Label, Select, Checkbox, Radio, Alert, Message, Skeleton

**Blog :** PostCardMeta, PostCardLikeAction, PostCardSaveAction, PostCardLikeAndComment, PostCardCommentBtn, CategoryBadgeList

**Layout :** Header, Footer, Navigation, Nav, MenuBar, Heading, BackgroundSection

**Media :** NcImage, NcPlayIcon, NcPlayIcon2, LoadingVideo, MusicPlayer

**Social :** LikeSaveBtns, FollowButton, SocialsList, HeartIcon

Et bien plus...

---

## ✨ Résultat

Vous avez maintenant :
- ✅ Un blog avec le design premium Ncmaz
- ✅ Des composants facilement adaptables
- ✅ Une architecture propre Strapi + Ncmaz
- ✅ Performance optimisée (pas de WordPress !)
- ✅ TypeScript full support

**Page active :** http://localhost:5000/blog

Profitez du design Ncmaz avec votre stack Vite + React + Strapi ! 🎉
