# 🎯 Guide de Test Complet

## 📋 Tests à Effectuer

### 1️⃣ Test des Auteurs Cliquables (Frontend)

#### Étapes:
1. **Ouvrir le blog**:
   ```
   http://localhost:5000/blog
   ```

2. **Actualiser la page** (Cmd+Shift+R) pour charger les nouveaux composants

3. **Tester les clics sur les auteurs** dans ces 3 zones:
   - ✅ **Article principal** (haut de page, grand format)
   - ✅ **Articles secondaires** (sidebar droite, 2 articles)
   - ✅ **Grille d'articles** (liste principale en bas)

4. **Vérifications**:
   - Cliquer sur **l'avatar de l'auteur** → Ouvre `/author/[slug]` ✅
   - Cliquer sur **le nom de l'auteur** → Ouvre `/author/[slug]` ✅
   - Cliquer sur **le titre/carte de l'article** → Ouvre l'article ✅
   - **Hover sur l'auteur** → Effet visuel (couleur primary, bordure) ✅

#### Résultat Attendu:
- 5 auteurs: Ouassim, Sarah, Karim, Leila, Youssef
- Chaque clic sur auteur → Profil de l'auteur (pas l'article)
- Chaque clic sur article → Page de l'article

---

### 2️⃣ Test du Serveur MCP (Claude Desktop)

#### Configuration:
1. **Copier la configuration Claude Desktop**:
   ```bash
   cp /Users/asf/emsoftwaresystem-/mcp-server/claude_desktop_config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. **Redémarrer Claude Desktop**

3. **Vérifier les outils MCP**:
   - Ouvrir Claude Desktop
   - Nouveau chat
   - Taper: "Quels outils as-tu disponibles?"
   - Devrait voir 9 outils: `get_articles`, `search_articles`, `get_article`, etc.

#### Tests à effectuer dans Claude:
```
1. "Combien d'articles avez-vous dans le blog?"
   → get_blog_stats → 8 articles, 5 auteurs

2. "Liste les 3 derniers articles"
   → get_articles (limit: 3, sort: newest)

3. "Recherche des articles sur React"
   → search_articles (query: "React")

4. "Montre-moi le profil de Ouassim"
   → get_authors → trouve Ouassim Samad

5. "Quels articles a écrit Sarah?"
   → get_author_articles (authorSlug: "sarah-martin")
```

#### Résultat Attendu:
- Claude accède aux données du blog
- Réponses en temps réel depuis Strapi
- 9 outils fonctionnels

---

### 3️⃣ Test du Custom GPT ChatGPT

#### Prérequis:
1. **Compte ChatGPT Plus** (requis pour Custom GPTs)
2. **Token API Strapi** (optionnel, pour lecture seule)

#### Étapes:

##### A. Créer le Token Strapi (optionnel):
1. Ouvrir: `http://localhost:1337/admin`
2. Settings → API Tokens → Create new API Token
3. Paramètres:
   - **Name**: "ChatGPT Custom GPT"
   - **Type**: **Read Only** (ou Full Access pour create/update)
   - **Duration**: Unlimited
4. **Copier le token** (s'affiche une seule fois!)

##### B. Configurer Ngrok:
```bash
# Si pas installé:
brew install ngrok

# Démarrer le tunnel:
cd /Users/asf/emsoftwaresystem-/mcp-server
./start-ngrok.sh

# Copier l'URL HTTPS affichée (ex: https://abc123.ngrok.io)
```

##### C. Créer le Custom GPT:
1. **Aller sur**: https://chat.openai.com/gpts/editor

2. **Configure > Name**:
   ```
   E&M Software Blog Assistant
   ```

3. **Configure > Description**:
   ```
   Assistant spécialisé pour le blog E&M Software (emsoftware.ma). 
   Accès aux articles, auteurs et statistiques du blog.
   ```

4. **Configure > Instructions**:
   - Copier le texte des Instructions depuis `/mcp-server/CHATGPT_CONFIG.md` (section "Instructions")

5. **Configure > Actions**:
   - Cliquer **Import from URL** ou **Import from file**
   - **Méthode 1 (URL)**: Mettre `https://[votre-url-ngrok]/api/openapi.json` (nécessite d'héberger le fichier)
   - **Méthode 2 (File)**: Importer `/mcp-server/openapi.json`
   - Ou **Méthode 3 (Schema)**: Copier/coller le YAML depuis CHATGPT_CONFIG.md

6. **Configure > Actions > Authentication**:
   - Type: **API Key**
   - Auth Type: **Bearer**
   - API Key: [Coller votre token Strapi]
   - OU laisser vide pour accès public (si autorisé)

7. **Modifier les servers dans le schema**:
   - Dans l'éditeur Actions, remplacer:
     ```yaml
     servers:
       - url: https://[VOTRE-URL-NGROK]
         description: Serveur Ngrok (développement local)
     ```

8. **Sauvegarder** et **Tester**

##### D. Tests dans le Custom GPT:
```
1. "Combien d'articles dans le blog?"
   → Devrait appeler get_blog_stats → 8 articles

2. "Liste les 5 derniers articles"
   → Devrait appeler GET /blog-posts?sort=publishedAt:desc&pagination[limit]=5

3. "Cherche des articles sur l'Intelligence Artificielle"
   → Devrait chercher dans titles/content → Article d'Ouassim

4. "Qui sont les auteurs du blog?"
   → Devrait appeler GET /authors → 5 auteurs

5. "Montre-moi des articles sur React ou Vue.js"
   → Devrait filtrer par mot-clé
```

#### Résultat Attendu:
- ChatGPT appelle l'API Strapi via Ngrok
- Réponses en français avec les données réelles
- Formatage naturel des réponses

---

## 🔧 Troubleshooting

### Problème: Auteurs non cliquables
**Solution**: Hard refresh (Cmd+Shift+R) ou vider le cache

### Problème: MCP tools non visibles dans Claude
**Solutions**:
1. Vérifier que `claude_desktop_config.json` est au bon endroit
2. Redémarrer Claude Desktop complètement
3. Vérifier les logs: `tail -f ~/Library/Logs/Claude/mcp*.log`

### Problème: Erreur TypeScript dans MCP server
**Solution**: Recompiler:
```bash
cd /Users/asf/emsoftwaresystem-/mcp-server
npm run build
```

### Problème: ChatGPT ne peut pas accéder à l'API
**Solutions**:
1. Vérifier que Ngrok tourne: `./start-ngrok.sh`
2. Vérifier que Strapi est actif: `lsof -i:1337`
3. Tester l'URL Ngrok dans le navigateur: `https://[url-ngrok]/api/blog-posts`
4. Vérifier le token API dans ChatGPT Actions > Authentication

### Problème: Token Strapi invalide
**Solutions**:
1. Regénérer le token dans Strapi Admin
2. Vérifier que le type est "Read Only" ou "Full Access"
3. Vérifier qu'il n'a pas expiré

### Problème: CORS errors avec Ngrok
**Solution**: Configurer CORS dans Strapi:
```javascript
// strapi-cms/config/middlewares.js
{
  name: 'strapi::cors',
  config: {
    origin: ['*'], // Ou spécifier l'URL Ngrok
  },
}
```

---

## ✅ Checklist de Vérification

### Frontend (Auteurs Cliquables)
- [ ] Blog ouvert sur `http://localhost:5000/blog`
- [ ] Page actualisée (Cmd+Shift+R)
- [ ] Avatar de l'auteur cliquable (article principal)
- [ ] Nom de l'auteur cliquable (article principal)
- [ ] Avatar cliquable (articles secondaires)
- [ ] Nom cliquable (articles secondaires)
- [ ] Avatar cliquable (grille d'articles)
- [ ] Nom cliquable (grille d'articles)
- [ ] Hover effects visibles (couleur primary)
- [ ] Clic sur auteur → Profil (pas l'article)
- [ ] Clic sur carte → Article (pas le profil)

### MCP Server (Claude Desktop)
- [ ] `claude_desktop_config.json` copié
- [ ] Claude Desktop redémarré
- [ ] 9 outils MCP visibles dans Claude
- [ ] Test: "Combien d'articles?" → 8 articles
- [ ] Test: "Liste les articles" → OK
- [ ] Test: "Recherche React" → Trouve articles
- [ ] Test: "Profil de Ouassim" → OK
- [ ] Pas d'erreurs dans les logs Claude

### ChatGPT Custom GPT
- [ ] Ngrok installé (`brew install ngrok`)
- [ ] Tunnel Ngrok actif (`./start-ngrok.sh`)
- [ ] URL HTTPS copiée (ex: https://abc123.ngrok.io)
- [ ] Token Strapi créé (Settings → API Tokens)
- [ ] Token copié et sauvegardé
- [ ] Custom GPT créé sur ChatGPT
- [ ] Instructions copiées depuis CHATGPT_CONFIG.md
- [ ] Schema OpenAPI importé (openapi.json)
- [ ] Server URL modifiée (URL Ngrok)
- [ ] Authentication configurée (Bearer token)
- [ ] Test: "Combien d'articles?" → 8 articles
- [ ] Test: "Liste les articles" → OK
- [ ] Test: "Cherche IA" → Trouve article d'Ouassim
- [ ] Réponses en français et formatées

---

## 📊 État Actuel du Système

### ✅ Terminé
- Frontend: Auteurs cliquables partout (3 composants modifiés)
- MCP Server: 9 outils fonctionnels, compilé, testé
- ChatGPT Config: OpenAPI 3.1.0 complet + documentation
- Documentation: README.md, CHATGPT_CONFIG.md, ce guide de test
- Scripts: start-ngrok.sh pour exposition locale

### ⏳ À Faire (Par Vous)
1. **Tester les auteurs cliquables** sur le frontend
2. **Configurer Claude Desktop** (optionnel) pour MCP
3. **Créer le Custom GPT ChatGPT** avec ngrok
4. **Créer un token Strapi** pour ChatGPT
5. **Tester les 3 interfaces** (Web + Claude + ChatGPT)

---

## 🎉 Résultat Final

Après tous les tests, vous devriez avoir:

1. **Interface Web**: Expérience utilisateur améliorée avec auteurs cliquables
2. **Claude Desktop**: Accès programmatique au blog via MCP (9 outils)
3. **ChatGPT Custom GPT**: Assistant conversationnel pour le blog

**3 façons d'accéder au même contenu**:
- 🌐 **Humains** → Interface web React
- 🤖 **Claude** → MCP Server (stdio)
- 💬 **ChatGPT** → OpenAPI Actions (REST)

Tout fonctionne avec le même backend Strapi! 🚀
