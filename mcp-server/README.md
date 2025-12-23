# E&M Software Blog MCP Server 📝

Un serveur **Model Context Protocol (MCP)** pour interagir avec le blog E&M Software via Strapi. Permet aux assistants IA (Claude Desktop, Cline, etc.) de lire, rechercher et gérer les articles du blog.

## 🚀 Fonctionnalités

### 📖 Outils de Lecture
- **get_articles** - Liste paginée des articles avec tri
- **search_articles** - Recherche par mots-clés dans titre/contenu
- **get_article** - Détails complets d'un article (slug)
- **get_authors** - Liste tous les auteurs avec profils
- **get_author_articles** - Articles d'un auteur spécifique
- **get_categories** - Catégories disponibles avec compteurs
- **get_blog_stats** - Statistiques globales du blog

### ✍️ Outils d'Écriture (Authentification requise)
- **create_article** - Créer un nouvel article
- **update_article** - Modifier un article existant

## 📦 Installation

```bash
cd mcp-server
npm install
npm run build
```

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` (optionnel) :

```bash
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here  # Requis pour create/update
```

Par défaut, le serveur se connecte à `http://localhost:1337` sans authentification (lecture seule).

### Obtenir un token Strapi (pour écriture)

1. Ouvrir http://localhost:1337/admin
2. Settings → API Tokens
3. Create new API Token
4. Type: **Full access** (ou Custom avec permissions blog-posts)
5. Copier le token et le mettre dans `STRAPI_API_TOKEN`

## 🔧 Configuration Claude Desktop

Ajoutez dans `~/Library/Application Support/Claude/claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "emsoftware-blog": {
      "command": "node",
      "args": [
        "/Users/asf/emsoftwaresystem-/mcp-server/build/index.js"
      ],
      "env": {
        "STRAPI_URL": "http://localhost:1337",
        "STRAPI_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

Redémarrer Claude Desktop après configuration.

## 🔧 Configuration Cline (VS Code)

Dans VS Code Settings (JSON), ajoutez :

```json
{
  "mcp.servers": {
    "emsoftware-blog": {
      "command": "node",
      "args": [
        "/Users/asf/emsoftwaresystem-/mcp-server/build/index.js"
      ],
      "env": {
        "STRAPI_URL": "http://localhost:1337"
      }
    }
  }
}
```

## 💡 Exemples d'Utilisation

### Avec Claude Desktop

Après configuration, vous pouvez dire à Claude :

- *"Liste-moi les 5 derniers articles du blog"*
- *"Recherche des articles sur l'IA"*
- *"Montre-moi tous les articles de Youssef Idrissi"*
- *"Quelles sont les statistiques du blog ?"*
- *"Crée un nouvel article sur React"* (avec token)

### Exemples de commandes

```typescript
// Liste des articles
get_articles({ page: 1, pageSize: 10, sort: "newest" })

// Recherche
search_articles({ 
  query: "Intelligence Artificielle", 
  category: "technology",
  limit: 5 
})

// Article complet
get_article({ slug: "transformation-digitale-2025-guide-complet-entreprise" })

// Auteurs
get_authors({ includeStats: true })

// Articles d'un auteur
get_author_articles({ 
  authorSlug: "youssef-idrissi", 
  limit: 10 
})

// Statistiques
get_blog_stats()

// Créer un article (nécessite token)
create_article({
  title_fr: "Mon nouvel article",
  content_fr: "Contenu de l'article...",
  excerpt_fr: "Résumé court",
  category: "technology",
  categoryLabel_fr: "Technologie",
  authorDocumentId: "o7qfuxcewtjcltwxjwljygnj",
  readTime: 5
})
```

## 🧪 Test du Serveur

### Test en ligne de commande

```bash
# Démarrer le serveur
npm run dev

# Dans un autre terminal, envoyer une requête
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node build/index.js
```

### Test avec npx

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

Ouvre un inspecteur web pour tester les outils interactivement.

## 📁 Structure du Projet

```
mcp-server/
├── src/
│   └── index.ts          # Serveur MCP principal
├── build/                # Code compilé (généré)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Sécurité

- **Lecture** : Accessible sans authentification (via API publique Strapi)
- **Écriture** : Nécessite `STRAPI_API_TOKEN` avec permissions appropriées
- Le serveur utilise le protocole stdio (communication locale sécurisée)
- Ne jamais exposer le token dans le code source

## 🐛 Dépannage

### Le serveur ne démarre pas

```bash
# Vérifier que Strapi tourne
curl http://localhost:1337/api/blog-posts

# Rebuild le serveur
npm run build

# Vérifier les logs
npm run dev
```

### Erreur "Cannot find module"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Claude Desktop ne voit pas le serveur

1. Vérifier le chemin absolu dans la config
2. Redémarrer complètement Claude Desktop
3. Vérifier les logs dans `~/Library/Logs/Claude/`

## 📊 Données Retournées

### Article

```typescript
{
  id: string              // Document ID
  slug: string           // URL slug
  title: string          // Titre
  content: string        // Contenu complet (Markdown)
  excerpt: string        // Résumé
  category: string       // Label catégorie
  categoryId: string     // ID catégorie
  author: {
    name: string
    slug: string
    role: string
    bio: string
    avatar: string
  }
  publishedAt: string    // ISO date
  readTime: number       // Minutes
  featuredImage: string  // URL image
  seo: {
    title: string
    description: string
    keywords: string
  }
}
```

## 🚀 Prochaines Étapes

- [ ] Ajouter support pour les images (upload)
- [ ] Implémenter la suppression d'articles
- [ ] Ajouter filtres avancés (date range, tags)
- [ ] Support multilingue (en/fr)
- [ ] Cache pour améliorer performances
- [ ] Webhooks pour notifications temps réel

## 📝 License

MIT © E&M Software

## 👥 Support

Pour toute question : contact@emsoftware.com
