# 📝 Guide du Système d'Auteurs

## 🎯 Vue d'ensemble

Le système d'auteurs permet de gérer et afficher les profils des auteurs sur le blog. Il est intégré avec Strapi CMS pour une gestion centralisée.

## 🚀 Démarrage Rapide

### 1. Démarrer Strapi

```bash
cd /Users/asf/emsoftwaresystem-/strapi-cms
npm run develop
```

Strapi sera accessible sur : http://localhost:1337/admin

### 2. Ajouter des auteurs

Exécutez le script pour créer 5 auteurs de test :

```bash
cd /Users/asf/emsoftwaresystem-
./add-authors.sh
```

Les auteurs créés :
- **Ouassim Samad** (ouassim-samad) - Fondateur & Architecte Logiciel
- **Sarah El Amrani** (sarah-el-amrani) - Lead Developer Frontend  
- **Karim Bennani** (karim-bennani) - Architecte Backend & DevOps
- **Leila Mansouri** (leila-mansouri) - Data Scientist & IA
- **Youssef Idrissi** (youssef-idrissi) - Lead Mobile Developer

### 3. Démarrer l'application frontend

```bash
# Dans un autre terminal
cd /Users/asf/emsoftwaresystem-
npm run dev
```

L'application sera accessible sur : http://localhost:5000

## 📋 Content Type "Author" dans Strapi

### Structure des champs

| Champ | Type | Description |
|-------|------|-------------|
| `name` | String | Nom complet de l'auteur (requis) |
| `slug` | UID | URL-friendly identifier (généré depuis name) |
| `avatar` | Media | Photo de profil de l'auteur |
| `role` | String | Titre/Rôle (ex: "Lead Developer") |
| `bio` | Text | Biographie courte (300 caractères max) |
| `fullBio` | RichText | Biographie complète avec formatting |
| `email` | Email | Adresse email de contact |
| `verified` | Boolean | Badge "Vérifié" (true/false) |
| `expertise` | JSON | Array de tags d'expertise |
| `social` | JSON | Liens sociaux (linkedin, twitter, github, website) |
| `joinedDate` | Date | Date d'arrivée dans l'équipe |
| `totalViews` | Integer | Nombre total de vues des articles |
| `blog_posts` | Relation | Articles de l'auteur (oneToMany) |

### Format JSON pour expertise

```json
["React", "TypeScript", "Node.js", "AWS"]
```

### Format JSON pour social

```json
{
  "linkedin": "https://linkedin.com/in/username",
  "twitter": "https://twitter.com/username",
  "github": "https://github.com/username",
  "website": "https://website.com"
}
```

## 🔗 Relation Author ↔ Blog Post

### Dans Blog Post schema

```json
"author": {
  "type": "relation",
  "relation": "manyToOne",
  "target": "api::author.author",
  "inversedBy": "blog_posts"
}
```

### Comment lier un auteur à un article

1. Dans Strapi Admin, ouvrez un Blog Post
2. Cherchez le champ "Author"
3. Sélectionnez un auteur dans la liste
4. Sauvegardez

## 🎨 Composants Frontend

### 1. AuthorMeta
Affichage compact d'auteur pour les cartes d'articles.

**Utilisation :**
```tsx
<AuthorMeta 
  author={{
    name: "Sarah El Amrani",
    avatar: "/avatar.jpg",
    role: "Lead Developer",
    slug: "sarah-el-amrani"
  }}
  publishedAt="2025-11-16"
  readTime={8}
  size="medium"
  showRole={true}
/>
```

**Props :**
- `author`: Objet avec name, avatar, role, slug
- `publishedAt`: Date de publication
- `readTime`: Temps de lecture (minutes)
- `size`: 'small' | 'medium' | 'large'
- `showRole`: Afficher le rôle (boolean)

### 2. AuthorBio
Section biographie pour les pages d'articles.

**Utilisation :**
```tsx
<AuthorBio 
  author={{
    name: "Sarah El Amrani",
    avatar: "/avatar.jpg",
    role: "Lead Developer",
    bio: "Expert React...",
    slug: "sarah-el-amrani",
    social: {
      linkedin: "https://...",
      twitter: "https://..."
    }
  }}
  variant="compact"
/>
```

**Variants :**
- `compact`: Horizontal, pour top de page
- `expanded`: Vertical, pour section dédiée

### 3. AuthorArticles
Grille d'articles d'un auteur.

**Utilisation :**
```tsx
<AuthorArticles 
  authorSlug="sarah-el-amrani"
  authorName="Sarah El Amrani"
  articles={articlesList}
  limit={3}
  showViewAll={true}
/>
```

### 4. AuthorProfile (Page)
Page profil complète accessible via `/author/:slug`

**Sections :**
- Hero : Avatar, nom, bio, expertise, liens sociaux
- Statistiques : Articles, vues, années d'expérience  
- Articles : Grille complète avec tri (Récents/Populaires)

## 🌐 URLs et Navigation

### URLs des profils
```
http://localhost:5000/author/ouassim-samad
http://localhost:5000/author/sarah-el-amrani
http://localhost:5000/author/karim-bennani
http://localhost:5000/author/leila-mansouri
http://localhost:5000/author/youssef-idrissi
```

### Navigation
Les utilisateurs peuvent accéder aux profils via :
- Clic sur avatar/nom dans BlogCard
- Clic sur AuthorBio dans les articles
- Bouton "Voir le profil" dans AuthorCard
- Lien direct URL

## 🔌 API Strapi

### Récupérer tous les auteurs

```bash
GET http://localhost:1337/api/authors?populate=*
```

### Récupérer un auteur par slug

```bash
GET http://localhost:1337/api/authors?filters[slug][$eq]=ouassim-samad&populate=*
```

### Récupérer les articles d'un auteur

```bash
GET http://localhost:1337/api/blog-posts?filters[author][slug][$eq]=ouassim-samad&populate=*
```

### Créer un nouvel auteur (POST)

```bash
curl -X POST "http://localhost:1337/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Nouveau Auteur",
      "slug": "nouveau-auteur",
      "role": "Developer",
      "bio": "Description courte...",
      "verified": true,
      "expertise": ["Skill1", "Skill2"],
      "social": {
        "linkedin": "https://linkedin.com/in/username"
      },
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }'
```

## 🎯 Ajouter un Nouvel Auteur

### Via Strapi Admin (Interface)

1. **Accédez à Strapi**
   ```
   http://localhost:1337/admin
   ```

2. **Naviguez vers Authors**
   - Sidebar gauche → "Authors"
   - Cliquez sur "+ Create new entry"

3. **Remplissez les champs**
   - **Name** : Nom complet (requis)
   - **Slug** : Sera généré automatiquement
   - **Avatar** : Upload une image
   - **Role** : Titre professionnel
   - **Bio** : Courte description (300 char max)
   - **Full Bio** : Description détaillée (rich text)
   - **Email** : Email de contact
   - **Verified** : Cochez pour badge vérifié
   - **Expertise** : Format JSON
     ```json
     ["React", "TypeScript", "Node.js"]
     ```
   - **Social** : Format JSON
     ```json
     {
       "linkedin": "https://linkedin.com/in/username",
       "twitter": "https://twitter.com/username",
       "github": "https://github.com/username"
     }
     ```
   - **Joined Date** : Date d'arrivée
   - **Total Views** : Nombre initial (ex: 0)

4. **Publiez**
   - Cliquez sur "Save" puis "Publish"

### Via API (Script/cURL)

Ajoutez cette commande dans `add-authors.sh` ou exécutez directement :

```bash
curl -X POST "http://localhost:1337/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Votre Nom",
      "slug": "votre-nom",
      "role": "Votre Rôle",
      "bio": "Votre bio courte",
      "fullBio": "Votre bio complète détaillée",
      "email": "email@example.com",
      "verified": true,
      "expertise": ["Compétence 1", "Compétence 2", "Compétence 3"],
      "social": {
        "linkedin": "https://linkedin.com/in/votreprofil",
        "twitter": "https://twitter.com/votreprofil",
        "github": "https://github.com/votreprofil"
      },
      "joinedDate": "2025-11-16",
      "totalViews": 0,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }'
```

## 🔄 Lier un Auteur à un Article

### Via Strapi Admin

1. **Ouvrez un Blog Post**
   - Content Manager → Blog Posts
   - Sélectionnez un article

2. **Sélectionnez l'auteur**
   - Champ "Author" (relation)
   - Cliquez et sélectionnez dans la liste
   - L'auteur doit être publié pour apparaître

3. **Sauvegardez et Publiez**

### Migration d'articles existants

Si vous avez des articles avec `authorName` (string), vous pouvez :

1. Créer les auteurs correspondants dans Strapi
2. Manuellement lier chaque article à son auteur
3. Ou utiliser un script de migration

## ✅ Vérification

### Vérifier les auteurs dans Strapi

```bash
curl -s "http://localhost:1337/api/authors" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(f'✅ {len(data[\"data\"])} auteurs trouvés')
for author in data['data']:
    print(f'  - {author[\"name\"]} ({author[\"slug\"]})')
"
```

### Tester un profil

Ouvrez dans le navigateur :
```
http://localhost:5000/author/ouassim-samad
```

Vous devriez voir :
- ✅ Photo de profil avec badge vérifié
- ✅ Nom, rôle, bio complète
- ✅ Tags d'expertise
- ✅ Statistiques (articles, vues, années)
- ✅ Liens sociaux fonctionnels
- ✅ Liste des articles de l'auteur

## 🐛 Troubleshooting

### "Author not found"

**Problème** : Le profil affiche une 404

**Solutions** :
1. Vérifiez que l'auteur existe dans Strapi
2. Vérifiez que l'auteur est **publié** (pas en draft)
3. Vérifiez le slug dans l'URL
4. Vérifiez que Strapi tourne sur port 1337

### Pas d'articles affichés

**Problème** : Le profil s'affiche mais sans articles

**Solutions** :
1. Liez des articles à l'auteur dans Strapi
2. Vérifiez que les articles sont publiés
3. Vérifiez la relation dans Blog Post schema

### Avatar ne s'affiche pas

**Problème** : Image manquante

**Solutions** :
1. Uploadez un avatar dans Strapi
2. Vérifiez le champ `avatar` dans l'API response
3. Image par défaut : `/attached_assets/generated_images/default-avatar.jpg`

### Erreur CORS

**Problème** : Erreur CORS dans la console

**Solution** : Vérifiez la config Strapi dans `config/middlewares.ts`

## 📝 TODO / Améliorations Futures

- [ ] Upload d'avatar via interface dédiée
- [ ] Statistiques temps réel (vues, likes)
- [ ] Système de follow/abonnement aux auteurs
- [ ] Newsletter par auteur
- [ ] Tri avancé des articles (vues, commentaires)
- [ ] Pagination des articles sur profil
- [ ] SEO : Schema.org Person markup
- [ ] Page "Notre équipe" listant tous les auteurs
- [ ] Recherche d'auteurs

## 🎓 Ressources

- [Documentation Strapi Relations](https://docs.strapi.io/dev-docs/backend-customization/models#relations)
- [Wouter Routing](https://github.com/molefrog/wouter)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Créé le** : 16 novembre 2025  
**Version** : 1.0.0  
**Auteur** : EM Software
