# 🔑 Créer un Token API Strapi pour ChatGPT

## Étapes Détaillées

### 1. Ouvrir Strapi Admin
```
http://localhost:1337/admin
```

### 2. Aller dans les Paramètres
- Cliquez sur **Settings** (⚙️ en bas à gauche)
- Dans le menu de gauche, cherchez **API Tokens** sous la section "Global settings"

### 3. Créer un Nouveau Token
1. Cliquez sur **Create new API Token**

2. Remplissez le formulaire :
   - **Name** : `ChatGPT MCP Connector`
   - **Description** (optionnel) : `Token pour le connecteur MCP ChatGPT`
   - **Token duration** : `Unlimited` (recommandé)
   - **Token type** : 
     - **Read Only** : Si ChatGPT doit seulement LIRE (recommandé pour commencer)
     - **Full Access** : Si vous voulez que ChatGPT puisse CRÉER/MODIFIER des articles

3. **Permissions par Content-Type** (si vous voulez être plus précis) :
   - `blog-posts` : 
     - ✅ find (lister les articles)
     - ✅ findOne (voir un article)
     - ⬜ create (optionnel)
     - ⬜ update (optionnel)
   - `authors` :
     - ✅ find
     - ✅ findOne
   - `categories` :
     - ✅ find
     - ✅ findOne

4. Cliquez sur **Save**

### 4. Copier le Token
⚠️ **IMPORTANT** : Le token s'affiche **UNE SEULE FOIS** !

```
Exemple de token:
e5c8d7a9b2f1c4d6e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2
```

**Copiez-le et sauvegardez-le en lieu sûr !**

### 5. Tester le Token

```bash
# Remplacez YOUR_TOKEN par votre token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:1337/api/blog-posts

# Si ça marche, vous verrez les articles en JSON
```

## 🎯 Utilisation dans ChatGPT

### Si vous avez choisi "API Key" dans le formulaire :

1. **Authentication type** : `Bearer`
2. **API Key** : Collez votre token Strapi
3. **Header name** : `Authorization`
4. **Header value format** : `Bearer {api_key}`

## 🔒 Sécurité

### Pour Production (Recommandations) :

1. **Créez un token séparé** pour chaque utilisation (ChatGPT, Claude, etc.)
2. **Utilisez Read Only** sauf si nécessaire
3. **Limitez la durée** si possible (30/60/90 jours)
4. **Régénérez régulièrement** les tokens
5. **Ne partagez jamais** vos tokens publiquement

### Pour Développement Local (Avec Ngrok) :

- Utilisez un token **Read Only**
- Pensez à **révoquer le token** après les tests
- Ne commitez jamais le token dans Git

## 📝 Où Stocker le Token

### Option 1 : Fichier .env local (Non commité)
```bash
# Dans /Users/asf/emsoftwaresystem-/mcp-server/.env
STRAPI_API_TOKEN=votre_token_ici
```

### Option 2 : Dans ChatGPT directement
- Le token est stocké de manière sécurisée par OpenAI
- Accessible uniquement par votre Custom GPT

### Option 3 : Dans Claude Desktop config
```json
{
  "mcpServers": {
    "emsoftware-blog": {
      "command": "node",
      "args": ["/Users/asf/emsoftwaresystem-/mcp-server/build/index.js"],
      "env": {
        "STRAPI_URL": "http://localhost:1337",
        "STRAPI_API_TOKEN": "votre_token_ici"
      }
    }
  }
}
```

## ❌ Révoquer un Token

Si vous pensez qu'un token a été compromis :

1. Retournez dans **Settings → API Tokens**
2. Trouvez le token dans la liste
3. Cliquez sur l'icône **🗑️ Delete**
4. Confirmez la suppression
5. Créez un nouveau token si nécessaire

## ✅ Checklist

- [ ] Strapi Admin ouvert (`http://localhost:1337/admin`)
- [ ] Settings → API Tokens accessible
- [ ] Nouveau token créé avec un nom explicite
- [ ] Type de token choisi (Read Only ou Full Access)
- [ ] Token copié et sauvegardé en lieu sûr
- [ ] Token testé avec curl
- [ ] Token ajouté dans ChatGPT Custom GPT
- [ ] Ou token ajouté dans .env pour MCP server

## 🆘 Problèmes Courants

### "Unauthorized" ou 401
- Vérifiez que le token est correct
- Vérifiez le format : `Bearer YOUR_TOKEN`
- Vérifiez que le token n'a pas expiré

### "Forbidden" ou 403
- Le token n'a pas les permissions nécessaires
- Recréez un token avec les bonnes permissions

### Token ne s'affiche pas
- Actualisez la page Strapi Admin
- Vérifiez que vous êtes admin dans Strapi

## 📚 Ressources

- [Strapi API Tokens Documentation](https://docs.strapi.io/dev-docs/configurations/api-tokens)
- [ChatGPT Custom Actions Auth](https://platform.openai.com/docs/actions/authentication)
