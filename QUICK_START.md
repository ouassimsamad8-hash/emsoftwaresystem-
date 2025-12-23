# 🎯 Guide Rapide - Migration vers Strapi

## ✅ Ce qui a été fait

J'ai préparé tout le nécessaire pour migrer vos **Services** et **Projects** vers Strapi:

### 📦 Fichiers créés:

1. **`/client/src/hooks/use-services.ts`** - Hook pour récupérer les services depuis Strapi
2. **`/client/src/hooks/use-projects.ts`** - Hook pour récupérer les projets depuis Strapi
3. **`/scripts/migrate-to-strapi.ts`** - Script de migration automatique
4. **`/scripts/test-strapi.sh`** - Script de test de connexion
5. **`/MIGRATION_GUIDE.md`** - Guide complet (à lire!)

### 🔧 Modifications:

- **`package.json`** - Ajout des commandes:
  - `npm run migrate` - Lance la migration
  - `npm run strapi` - Démarre Strapi

---

## 🚀 Comment migrer (5 étapes simples)

### Étape 1: Démarrer Strapi

```bash
npm run strapi
```

Attendez que vous voyiez: **"Strapi started successfully"**

---

### Étape 2: Créer un Token API

1. Ouvrez: http://localhost:1337/admin
2. Connectez-vous
3. **Settings** → **API Tokens** → **Create new API Token**
4. Nom: `Migration Token`
5. Token type: **Full access**
6. **Save** et **COPIEZ LE TOKEN** immédiatement!

---

### Étape 3: Configurer le Token

Créez/modifiez `.env` à la racine du projet:

```bash
STRAPI_API_TOKEN=collez-votre-token-ici
STRAPI_URL=http://localhost:1337
VITE_STRAPI_URL=http://localhost:1337
```

---

### Étape 4: Configurer les Permissions Publiques

Dans Strapi Admin:

1. **Settings** → **Roles** → **Public**
2. **Service**: ✅ find, ✅ findOne
3. **Project**: ✅ find, ✅ findOne
4. **Upload**: ✅ find, ✅ findOne
5. **Save**

---

### Étape 5: Lancer la Migration

```bash
npm run migrate
```

Vous devriez voir:

```
🚀 Starting Strapi data migration...
✅ Migrated service: Web Development
✅ Migrated service: Mobile Development
...
✅ Migrated project: E-Commerce Platform
...
✅ Migration completed successfully!
```

---

## 🧪 Tester

```bash
# Test automatique
./scripts/test-strapi.sh

# Test manuel dans le navigateur
# Services: http://localhost:1337/api/services
# Projects: http://localhost:1337/api/projects
```

---

## 📊 Résultat

Après la migration, vous aurez:

- ✅ **6 Services** dans Strapi (identiques à ceux dans content.ts)
- ✅ **12 Projects** dans Strapi (avec toutes les images)
- ✅ **Interface Admin** pour modifier le contenu facilement
- ✅ **API REST** automatique
- ✅ **Hooks React** prêts à utiliser

---

## 🔄 Utiliser les nouvelles données

Le code est déjà prêt! Les hooks sont créés:

```tsx
// Dans vos components
import { useServices } from '@/hooks/use-services';
import { useProjects } from '@/hooks/use-projects';

// Récupérer tous les services
const { data: services } = useServices();

// Récupérer tous les projets
const { data: projects } = useProjects();

// Récupérer un service spécifique
const { data: service } = useService('web-development');

// Récupérer un projet spécifique
const { data: project } = useProject('ecommerce-platform');
```

---

## ⚠️ Important

**NE PAS SUPPRIMER** `content.ts` pour l'instant! 

Gardez-le comme backup jusqu'à ce que vous ayez vérifié que tout fonctionne avec Strapi.

---

## 🆘 En cas de problème

### Erreur: "STRAPI_API_TOKEN is required"
→ Vous avez oublié de créer le token ou de l'ajouter dans `.env`

### Erreur: "Failed to fetch services"
→ Vérifiez les permissions dans Strapi (Settings > Roles > Public)

### Les images ne s'affichent pas
→ Vérifiez que les images sont bien dans `client/public/`

### La migration échoue
→ Consultez le guide complet: `MIGRATION_GUIDE.md`

---

## 📞 Support

Lisez le guide complet pour plus de détails:
```bash
cat MIGRATION_GUIDE.md
```

**Bon courage! 🚀**

Vos données seront exactement les mêmes qu'avant, mais maintenant vous pourrez les modifier depuis l'interface Strapi sans toucher au code!
