# Configuration OpenAI GPT Actions pour E&M Software Blog

Ce fichier contient la configuration pour intégrer le blog E&M Software avec ChatGPT via **GPT Actions**.

## 🔧 OpenAPI Schema pour GPT Actions

Copiez ce schema dans la section "Actions" de votre Custom GPT :

```yaml
openapi: 3.1.0
info:
  title: E&M Software Blog API
  description: API pour accéder aux articles, auteurs et statistiques du blog E&M Software
  version: 1.0.0
servers:
  - url: http://localhost:1337/api
    description: Serveur Strapi local
  - url: https://your-domain.com/api
    description: Serveur de production

paths:
  /blog-posts:
    get:
      operationId: listBlogPosts
      summary: Liste tous les articles du blog
      description: Récupère une liste paginée d'articles avec auteurs et métadonnées
      parameters:
        - name: populate
          in: query
          schema:
            type: string
            default: author
        - name: sort
          in: query
          schema:
            type: string
            default: publishedAt:desc
        - name: pagination[page]
          in: query
          schema:
            type: integer
            default: 1
        - name: pagination[pageSize]
          in: query
          schema:
            type: integer
            default: 10
      responses:
        '200':
          description: Liste des articles
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/BlogPost'

  /authors:
    get:
      operationId: listAuthors
      summary: Liste tous les auteurs
      description: Récupère la liste complète des auteurs avec leurs profils
      parameters:
        - name: populate
          in: query
          schema:
            type: string
            default: "*"
      responses:
        '200':
          description: Liste des auteurs
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Author'

components:
  schemas:
    BlogPost:
      type: object
      properties:
        documentId:
          type: string
        title_fr:
          type: string
        content_fr:
          type: string
        excerpt_fr:
          type: string
        slug:
          type: string
        category:
          type: string
        categoryLabel_fr:
          type: string
        author:
          $ref: '#/components/schemas/Author'
        publishedAt:
          type: string
          format: date-time
        readTime:
          type: integer
        
    Author:
      type: object
      properties:
        documentId:
          type: string
        name:
          type: string
        slug:
          type: string
        role:
          type: string
        bio:
          type: string
        email:
          type: string
```

## 📝 Instructions pour Custom GPT

### 1. Créer un Custom GPT

1. Aller sur https://chat.openai.com/gpts/editor
2. Cliquer sur "Create a GPT"
3. Nom: **"E&M Software Blog Assistant"**
4. Description: **"Assistant pour le blog E&M Software - recherche d'articles, consultation d'auteurs, statistiques"**

### 2. Configuration des Instructions

Copiez ces instructions dans le champ "Instructions" :

```
Tu es un assistant spécialisé pour le blog E&M Software. 

Tu as accès à une API Strapi qui contient:
- Des articles de blog sur la technologie, le développement web, l'IA, le cloud
- Des profils d'auteurs avec leurs expertises
- Des catégories d'articles

CAPACITÉS:
- Rechercher des articles par mots-clés
- Lister les articles récents
- Trouver des articles par catégorie
- Afficher les profils des auteurs
- Donner des statistiques sur le blog

STYLE DE RÉPONSE:
- Être précis et professionnel
- Citer les sources (titre d'article, auteur)
- Donner des résumés clairs
- Proposer des articles similaires

EXEMPLE D'UTILISATION:
"Trouve-moi les articles sur l'Intelligence Artificielle"
"Qui est Youssef Idrissi ?"
"Quels sont les derniers articles de Ouassim Samad ?"
"Montre-moi les articles sur le développement web"
```

### 3. Ajouter les Actions

1. Dans l'onglet "Actions"
2. Cliquer sur "Create new action"
3. **Import from URL** (si votre API est en ligne) ou **Schema** (copier le schema OpenAPI ci-dessus)
4. Pour local: utiliser un tunnel (ngrok, cloudflare tunnel)

### 4. Authentification

Si votre Strapi nécessite un token:

```yaml
Authentication: API Key
Header Name: Authorization
Value: Bearer YOUR_STRAPI_TOKEN
```

## 🌐 Exposer votre API locale avec Ngrok

Pour que ChatGPT accède à votre Strapi local:

```bash
# Installer ngrok
brew install ngrok

# Créer un tunnel vers Strapi
ngrok http 1337

# Copier l'URL HTTPS fournie (ex: https://abc123.ngrok.io)
# Utiliser cette URL comme server dans le schema OpenAPI
```

## 🔐 Sécurité pour Production

Pour la production, créez un token API dans Strapi:

1. http://localhost:1337/admin
2. Settings → API Tokens
3. Create new API Token
4. Name: "ChatGPT Custom GPT"
5. Token type: **Read Only**
6. Token duration: **Unlimited**
7. Copier le token

Puis dans votre Custom GPT:
- Authentication: **API Key**
- Auth Type: **Bearer**
- API Key: `YOUR_STRAPI_TOKEN`

## 💡 Exemples de Prompts

Une fois configuré, vous pouvez demander à ChatGPT:

- "Montre-moi les 5 derniers articles du blog E&M Software"
- "Recherche des articles sur React et TypeScript"
- "Qui sont les auteurs du blog ?"
- "Donne-moi tous les articles de la catégorie Intelligence Artificielle"
- "Résume l'article avec le slug transformation-digitale-2025"

## 🚀 Avantages du Custom GPT

✅ Interface conversationnelle naturelle
✅ Compréhension contextuelle avancée
✅ Suggestions intelligentes
✅ Résumés automatiques
✅ Multilangue (français/anglais)
✅ Accessible depuis mobile et web
✅ Partageable avec votre équipe

## 📊 Alternative: ChatGPT Plugins (Deprecated)

Les plugins ChatGPT sont maintenant remplacés par les GPT Actions. Utilisez la méthode Custom GPT ci-dessus.

## 🔗 Ressources

- [Documentation GPT Actions](https://platform.openai.com/docs/actions)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Ngrok Documentation](https://ngrok.com/docs)
