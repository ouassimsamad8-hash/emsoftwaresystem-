# Guide Rapide: Ajouter les Articles de Blog dans Strapi

## Étape 1: Accéder à Strapi
- Ouvrez: http://localhost:1337/admin
- Connectez-vous avec vos identifiants

## Étape 2: Créer un Nouvel Article
1. Dans le menu de gauche: **Content Manager** → **Blog Post**
2. Cliquez sur **Create new entry** (bouton bleu en haut à droite)

## Étape 3: Remplir les Champs

### Informations de Base
- **title_fr**: Copiez le titre de l'article depuis `BLOG_POSTS_SEO.md`
- **slug**: Généré automatiquement depuis le titre
- **category**: Choisissez parmi:
  - `ai-ml` pour Intelligence Artificielle
  - `web-dev` pour Développement Web
  - `security` pour Cybersécurité
  - `mobile` pour Applications Mobiles
  - `cloud` pour Cloud Computing
  
- **categoryLabel_fr**: Écrivez le label correspondant (ex: "Intelligence Artificielle")

### Contenu Principal
- **excerpt_fr**: Copiez les 2-3 premières phrases du contenu
- **content_fr**: Copiez tout le contenu de l'article (formatage Markdown supporté)

### Métadonnées
- **author**: `Ouassim Samad`
- **readTime**: Nombre indiqué dans l'article (8, 10, 12, 9, ou 11 minutes)
- **publishedAt**: Date d'aujourd'hui ou planifiée

### SEO (NOUVEAUX CHAMPS)
- **seoTitle**: Copiez depuis "Titre SEO" dans le fichier
- **seoDescription**: Copiez depuis "Meta Description"
- **seoKeywords**: Copiez tous les mots-clés (séparés par virgules)

### Images (Optionnel)
- **featuredImage**: Uploadez une image pertinente
- **authorAvatar**: Photo d'Ouassim ou avatar par défaut

## Étape 4: Publier
1. Vérifiez tous les champs
2. Cliquez sur **Save** (en haut à droite)
3. Cliquez sur **Publish** pour rendre l'article visible

## Articles Disponibles

### 📝 Article 1: Intelligence Artificielle (AI & Machine Learning)
- **Titre**: L'Intelligence Artificielle au Service de Votre Entreprise: Guide Complet 2025
- **Slug**: `intelligence-artificielle-entreprise-2025`
- **Temps de lecture**: 8 minutes
- **Focus**: Transformation IA, automatisation, ROI

### 📝 Article 2: Développement Web (Développement Web)
- **Titre**: Développement Web Moderne: Les 10 Tendances Incontournables de 2025
- **Slug**: `developpement-web-tendances-2025`
- **Temps de lecture**: 10 minutes
- **Focus**: React Server Components, Edge Computing, TypeScript

### 📝 Article 3: Cybersécurité (Sécurité & DevOps)
- **Titre**: Cybersécurité en 2025: Guide Complet pour Protéger Votre Entreprise
- **Slug**: `cybersecurite-entreprise-guide-2025`
- **Temps de lecture**: 12 minutes
- **Focus**: Protection, ransomware, RGPD, DevSecOps

### 📝 Article 4: Applications Mobiles (Développement Mobile)
- **Titre**: Applications Mobiles 2025: Native, React Native ou Flutter? Le Guide Complet
- **Slug**: `applications-mobiles-native-vs-cross-platform-2025`
- **Temps de lecture**: 9 minutes
- **Focus**: Comparatif technologies mobile, coûts, performances

### 📝 Article 5: Cloud Computing (Cloud & Infrastructure)
- **Titre**: Cloud Computing 2025: AWS vs Azure vs GCP - Comparatif Complet
- **Slug**: `cloud-computing-aws-azure-gcp-comparatif-2025`
- **Temps de lecture**: 11 minutes
- **Focus**: Comparatif clouds, migration, optimisation coûts

## Conseils

✅ **Ordre recommandé**: Commencez par l'article le plus pertinent pour votre audience
✅ **Images**: Utilisez des images haute qualité (1200x630px minimum)
✅ **Formatage**: Strapi supporte le Markdown - conservez les titres, listes, gras
✅ **SEO**: Tous les champs SEO sont pré-optimisés, copiez-les exactement
✅ **Publication**: Vous pouvez sauvegarder en brouillon et publier plus tard

## Vérification

Après publication, vérifiez sur votre site:
- http://localhost:5000/blog (liste des articles)
- http://localhost:5000/blog/[slug] (article individuel)

## Support

Si un article ne s'affiche pas:
1. Vérifiez que les permissions Public sont activées (Settings → Users & Permissions Plugin → Roles → Public → Blog-post → find + findOne)
2. Rafraîchissez la page avec Cmd/Ctrl + Shift + R
3. Vérifiez la console navigateur pour les erreurs

---

**Tous les articles sont prêts dans le fichier `BLOG_POSTS_SEO.md`**
