# 📦 Guide d'intégration Ncmaz

## ✅ Ce qui a été copié :

### Composants (202 fichiers)
📍 Location: `/client/src/ncmaz-components/`

**Composants de Blog principaux :**
- `Card3/` - Card article standard
- `Card11/` - Card article avec layout horizontal  
- `CardLarge1/` - Grande card pour article vedette
- `Card2/`, `Card4/`, `Card5/`, etc. - Variantes de cards

**Composants UI :**
- `Avatar/` - Avatars d'auteurs
- `Badge/` - Badges de catégories
- `Button/` - Boutons stylisés
- `PostCardMeta/` - Métadonnées d'articles
- `CategoryBadgeList/` - Liste de badges
- `PostFeaturedMedia/` - Images d'articles
- `Heading/` - Titres stylisés

**Composants de Layout :**
- `Header/` - En-tête
- `Footer/` - Pied de page
- `Navigation/` - Navigation
- `SectionHero/` - Sections hero

### Styles
📍 Location: `/client/src/ncmaz-styles/`

### Utils & Constants
📍 Location: `/client/src/ncmaz-utils/` et `/client/src/ncmaz-contains/`

## 🔧 Prochaines étapes :

### 1. Adapter les imports
Les composants Ncmaz utilisent :
- Next.js → Il faut remplacer par Wouter
- WordPress GraphQL → Il faut connecter à Strapi
- `@/` imports → Mettre à jour les chemins

### 2. Tester les composants
Commencer par les plus simples :
```tsx
// Exemple d'utilisation
import Card3 from '@/ncmaz-components/Card3/Card3';
import Badge from '@/ncmaz-components/Badge/Badge';
import Avatar from '@/ncmaz-components/Avatar/Avatar';
```

### 3. Adapter progressivement
- Remplacer les données WordPress par Strapi
- Adapter le routing Next.js vers Wouter
- Corriger les imports cassés

## 📝 Composants prioritaires pour le blog :

1. **Card3** - Card article principale ✅
2. **CardLarge1** - Article vedette
3. **PostCardMeta** - Métadonnées
4. **CategoryBadgeList** - Catégories
5. **Avatar** - Auteur
6. **Badge** - Tags/Catégories

## 🚀 Commande pour tester :

```bash
npm run dev
```

Puis aller sur `/blog` pour voir les changements.

## ⚠️ Notes importantes :

- **Ne pas supprimer** les composants existants avant de tester
- **Garder une copie** de votre code actuel
- **Tester un composant à la fois**
- Les erreurs d'import sont normales au début, on les corrigera progressivement

## 🎯 Objectif final :

Avoir le design complet de Ncmaz dans votre section blog, tout en gardant :
- Votre architecture Vite + React
- Votre Strapi comme CMS
- Votre routing Wouter
