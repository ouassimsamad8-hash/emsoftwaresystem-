# 🚀 Migration Services & Projects vers Strapi

## 📋 Vue d'ensemble

Ce guide vous aide à migrer vos Services et Projects du fichier `content.ts` vers Strapi CMS, tout en gardant les mêmes données et images.

---

## 🎯 Étapes de Migration

### Étape 1: Vérifier Strapi

```bash
# Démarrer Strapi
cd strapi-cms
npm run develop
```

✅ **Vérifiez que Strapi tourne sur** `http://localhost:1337`

---

### Étape 2: Créer un Token API

1. Ouvrez l'admin Strapi: `http://localhost:1337/admin`
2. Allez dans **Settings** → **API Tokens**
3. Cliquez sur **Create new API Token**
4. Remplissez:
   - **Name**: Migration Token
   - **Token duration**: Unlimited
   - **Token type**: Full access
5. Cliquez sur **Save**
6. **Copiez le token** (vous ne le verrez qu'une fois!)

---

### Étape 3: Configurer les Variables d'Environnement

Créez ou modifiez `.env` à la racine:

```bash
# Strapi Configuration
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=votre-token-copié-ici
VITE_STRAPI_URL=http://localhost:1337
```

---

### Étape 4: Vérifier les Content Types Strapi

Les content types suivants doivent exister dans Strapi:

#### 📦 **Service** (`api::service.service`)
- slug (Text, Unique)
- icon (Text)
- title_en (Text)
- title_fr (Text)
- shortDescription_en (Text)
- shortDescription_fr (Text)
- fullDescription_en (Rich Text)
- fullDescription_fr (Rich Text)
- features (JSON)
- benefits (JSON)

#### 📦 **Project** (`api::project.project`)
- slug (Text, Unique)
- title_en (Text)
- title_fr (Text)
- category (Text)
- categoryLabel_en (Text)
- categoryLabel_fr (Text)
- description_en (Text)
- description_fr (Text)
- image (Media, Single)
- screenshots (Media, Multiple)
- technologies (JSON)
- challenge_en (Rich Text)
- challenge_fr (Rich Text)
- solution_en (Rich Text)
- solution_fr (Rich Text)
- results (JSON)

---

### Étape 5: Configurer les Permissions

Dans Strapi Admin:

1. **Settings** → **Roles** → **Public**
2. Activez les permissions suivantes:

**Service:**
- ✅ find
- ✅ findOne

**Project:**
- ✅ find
- ✅ findOne

3. Cliquez sur **Save**

---

### Étape 6: Lancer la Migration

```bash
# Depuis la racine du projet
npm run migrate

# ou
npx tsx scripts/migrate-to-strapi.ts
```

Vous devriez voir:

```
🚀 Starting Strapi data migration...
📍 Strapi URL: http://localhost:1337

📦 Migrating Services...
✅ Migrated service: Web Development
✅ Migrated service: Mobile Development
...

📦 Migrating Projects...
✅ Uploaded image: Ecommerce_platform_interface_1b61c289.png
✅ Migrated project: E-Commerce Platform
...

✅ Migration completed successfully!
```

---

### Étape 7: Vérifier les Données

1. Ouvrez Strapi Admin: `http://localhost:1337/admin`
2. Allez dans **Content Manager**
3. Vérifiez:
   - **Services** (6 entrées)
   - **Projects** (12 entrées)
4. Vérifiez que les images sont bien uploadées

---

### Étape 8: Activer le Nouveau Système

Le code a déjà été préparé! Les hooks sont créés:
- `useServices()` - Récupère tous les services
- `useService(slug)` - Récupère un service par slug
- `useProjects()` - Récupère tous les projets
- `useProject(slug)` - Récupère un projet par slug

---

## 🧪 Tests

### Test des Services

```bash
# Test API Strapi directement
curl http://localhost:1337/api/services?populate=*

# Test API Strapi pour un service spécifique
curl http://localhost:1337/api/services?filters[slug][$eq]=web-development&populate=*
```

### Test des Projects

```bash
# Test API Strapi directement
curl http://localhost:1337/api/projects?populate=*

# Test API Strapi pour un projet spécifique
curl http://localhost:1337/api/projects?filters[slug][$eq]=ecommerce-platform&populate=*
```

---

## 🔄 Utilisation dans le Code

### Exemple: Page Services

```tsx
import { useServices } from '@/hooks/use-services';

export default function Services() {
  const { data: services, isLoading, error } = useServices();
  
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  
  return (
    <div>
      {services?.map(service => (
        <div key={service.id}>
          <h2>{service.title.fr}</h2>
          <p>{service.shortDescription.fr}</p>
        </div>
      ))}
    </div>
  );
}
```

### Exemple: Page Projet Détail

```tsx
import { useProject } from '@/hooks/use-projects';
import { useParams } from 'wouter';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, isLoading } = useProject(slug!);
  
  if (isLoading) return <div>Chargement...</div>;
  if (!project) return <div>Projet non trouvé</div>;
  
  return (
    <div>
      <h1>{project.title.fr}</h1>
      <img src={project.image} alt={project.title.fr} />
      <p>{project.description.fr}</p>
    </div>
  );
}
```

---

## 🐛 Dépannage

### Erreur: "Failed to fetch services"

**Solution:**
1. Vérifiez que Strapi tourne
2. Vérifiez les permissions (Public → Service → find/findOne)
3. Vérifiez `VITE_STRAPI_URL` dans `.env`

### Erreur: "STRAPI_API_TOKEN is required"

**Solution:**
1. Créez un token dans Strapi Admin
2. Ajoutez-le dans `.env`: `STRAPI_API_TOKEN=votre-token`
3. Relancez le script de migration

### Images ne s'affichent pas

**Solution:**
1. Vérifiez que les images sont dans `client/public/`
2. Vérifiez les permissions Upload dans Strapi
3. Les URLs d'images doivent inclure le domaine Strapi

### Erreur 401 Unauthorized

**Solution:**
1. Vérifiez que le token API est valide
2. Vérifiez que le token a "Full access"
3. Créez un nouveau token si nécessaire

---

## 📊 Comparaison Avant/Après

### ❌ Avant (Fichier Local)

```tsx
import { services } from '@/data/content';

// Données hardcodées
const myServices = services;
```

**Inconvénients:**
- ❌ Modifier le code pour changer le contenu
- ❌ Pas d'interface admin
- ❌ Difficile à maintenir

### ✅ Après (Strapi CMS)

```tsx
import { useServices } from '@/hooks/use-services';

// Données dynamiques de Strapi
const { data: services } = useServices();
```

**Avantages:**
- ✅ Interface admin intuitive
- ✅ Modification du contenu sans code
- ✅ Multi-langues facile
- ✅ Gestion des médias
- ✅ API automatique
- ✅ Cache et performance

---

## 🎉 Résultat Final

Après la migration, vous aurez:

✅ **6 Services** dans Strapi avec toutes leurs données
✅ **12 Projects** dans Strapi avec images et screenshots
✅ **Interface Admin** pour gérer le contenu
✅ **API REST** automatique et performante
✅ **Hooks React** prêts à l'emploi
✅ **Même affichage** qu'avant (zéro différence visuelle!)

---

## 🔗 Liens Utiles

- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API Docs**: http://localhost:1337/documentation
- **Services API**: http://localhost:1337/api/services
- **Projects API**: http://localhost:1337/api/projects

---

## 💡 Prochaines Étapes

Après avoir vérifié que tout fonctionne:

1. ✅ Testez toutes les pages (Home, Services, Projects)
2. ✅ Vérifiez l'affichage des images
3. ✅ Testez en français et anglais
4. 📝 Optionnel: Supprimer l'ancien fichier `content.ts` (garder comme backup!)

---

## 🆘 Besoin d'Aide?

Si vous rencontrez des problèmes:
1. Vérifiez les logs Strapi dans le terminal
2. Vérifiez la console du navigateur (F12)
3. Consultez la documentation Strapi: https://docs.strapi.io

**Bon courage! 🚀**
