# 🚀 Guide de Démarrage Rapide

## Démarrer Strapi et l'Application

### Méthode 1: Deux Terminaux (Recommandé)

**Terminal 1 - Strapi:**
```bash
cd /Users/asf/emsoftwaresystem-/strapi-cms
npm run develop
```
Attendez de voir: "Strapi started successfully"

**Terminal 2 - Application:**
```bash
cd /Users/asf/emsoftwaresystem-
npm run dev
```

### Méthode 2: Arrière-plan (tmux/screen)

```bash
# Démarrer Strapi en arrière-plan
cd /Users/asf/emsoftwaresystem-/strapi-cms && npm run develop &

# Attendre 10 secondes
sleep 10

# Démarrer l'application
cd /Users/asf/emsoftwaresystem- && npm run dev
```

## Ajouter les Articles de Blog Automatiquement

**Une fois Strapi démarré**, dans un nouveau terminal:

```bash
cd /Users/asf/emsoftwaresystem-
./add-blog-posts.sh
```

Cela ajoutera 3 articles SEO-optimisés:
- ✅ Intelligence Artificielle (8 min)
- ✅ Développement Web (10 min)  
- ✅ Cybersécurité (12 min)

## Vérifier

- **Strapi Admin:** http://localhost:1337/admin
- **Site Web:** http://localhost:5000
- **Blog:** http://localhost:5000/blog

## Activer les Permissions (Important!)

1. Ouvrez http://localhost:1337/admin
2. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Cochez dans **Blog-post**:
   - ✅ `find`
   - ✅ `findOne`
4. **Save**

Les articles apparaîtront immédiatement sur http://localhost:5000/blog

## Arrêter les Serveurs

```bash
# Trouver et arrêter les processus
lsof -ti:1337 | xargs kill  # Strapi
lsof -ti:5000 | xargs kill  # App
```

## Troubleshooting

**"Port already in use":**
```bash
lsof -ti:1337 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**"Permission denied" pour le script:**
```bash
chmod +x add-blog-posts.sh
```

**Articles n'apparaissent pas:**
- Vérifiez les permissions Public (voir ci-dessus)
- Rafraîchissez avec Cmd+Shift+R
- Vérifiez la console navigateur (F12)
