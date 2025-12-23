# 📋 Guide : Ajouter les FAQs à Strapi

## ✅ Les 6 FAQs sont prêtes à être ajoutées

Le script `/add-faqs.sh` est prêt avec les 6 questions fréquemment posées :

1. **Général** - Quels services offre E&M Software System ?
2. **Général** - Combien de temps prend un projet typique ?
3. **Services** - Offrez-vous un support et une maintenance continus ?
4. **Services** - Avec quelles technologies travaillez-vous ?
5. **Tarification** - Comment tarifiez-vous vos services ?
6. **Processus** - Quel est votre processus de développement ?

---

## 🔧 Méthode 1 : Configuration des permissions (Recommandée)

### Étape 1 : Ouvrir Strapi Admin
```
http://localhost:1337/admin
```

### Étape 2 : Configurer les permissions publiques
1. Dans le menu gauche, cliquez sur **Settings** (⚙️)
2. Sous **USERS & PERMISSIONS PLUGIN**, cliquez sur **Roles**
3. Cliquez sur **Public**
4. Faites défiler jusqu'à **FAQ**
5. **Cochez** les permissions suivantes :
   - ✅ `create`
   - ✅ `find`
   - ✅ `findOne`
6. Cliquez sur **Save** en haut à droite

### Étape 3 : Exécuter le script
```bash
./add-faqs.sh
```

Les 6 FAQs seront ajoutées automatiquement ! ✨

---

## 🔧 Méthode 2 : Ajout manuel dans Strapi Admin

### Si vous préférez ajouter manuellement :

1. Allez sur `http://localhost:1337/admin`
2. Dans le menu gauche, cliquez sur **Content Manager**
3. Cliquez sur **FAQ** dans la liste
4. Cliquez sur **Create new entry** (bouton bleu en haut à droite)

### FAQ 1 - Services offerts
- **Category FR** : `Général`
- **Question FR** : `Quels services offre E&M Software System ?`
- **Answer FR** : `Nous offrons des services complets de développement logiciel, notamment le développement web, le développement d'applications mobiles, les solutions logicielles personnalisées, les services cloud, la transformation digitale et le conseil informatique. Notre équipe travaille en étroite collaboration avec les clients pour fournir des solutions sur mesure qui répondent à leurs besoins commerciaux spécifiques.`
- **Order** : `1`
- Cliquez sur **Save** puis **Publish**

### FAQ 2 - Durée du projet
- **Category FR** : `Général`
- **Question FR** : `Combien de temps prend un projet typique ?`
- **Answer FR** : `Les délais du projet varient en fonction de la portée et de la complexité. Un site web simple peut prendre 4 à 6 semaines, tandis qu'une application d'entreprise complexe peut prendre 3 à 6 mois. Lors de notre consultation initiale, nous fournissons un calendrier détaillé spécifique aux exigences de votre projet.`
- **Order** : `2`
- Cliquez sur **Save** puis **Publish**

### FAQ 3 - Support et maintenance
- **Category FR** : `Services`
- **Question FR** : `Offrez-vous un support et une maintenance continus ?`
- **Answer FR** : `Oui, nous offrons des forfaits de support et de maintenance complets pour garantir que votre logiciel continue de fonctionner de manière optimale. Cela comprend les corrections de bugs, les mises à jour de sécurité, la surveillance des performances et les améliorations de fonctionnalités selon les besoins.`
- **Order** : `3`
- Cliquez sur **Save** puis **Publish**

### FAQ 4 - Technologies
- **Category FR** : `Services`
- **Question FR** : `Avec quelles technologies travaillez-vous ?`
- **Answer FR** : `Nous travaillons avec un large éventail de technologies modernes, notamment React, Vue.js, Angular pour le frontend ; Node.js, Python, Java pour le backend ; AWS, Azure, Google Cloud pour les services cloud ; et PostgreSQL, MongoDB pour les bases de données. Nous sélectionnons la meilleure pile technologique pour chaque projet en fonction des exigences spécifiques.`
- **Order** : `4`
- Cliquez sur **Save** puis **Publish**

### FAQ 5 - Tarification
- **Category FR** : `Tarification`
- **Question FR** : `Comment tarifiez-vous vos services ?`
- **Answer FR** : `Nous proposons des modèles de tarification flexibles, notamment des projets à prix fixe, du temps et des matériaux, et des arrangements d'équipe dédiée. Le meilleur modèle dépend de la portée de votre projet, du calendrier et du budget. Nous fournissons des devis détaillés après avoir compris vos besoins lors de la consultation initiale.`
- **Order** : `5`
- Cliquez sur **Save** puis **Publish**

### FAQ 6 - Processus de développement
- **Category FR** : `Processus`
- **Question FR** : `Quel est votre processus de développement ?`
- **Answer FR** : `Nous suivons une méthodologie de développement agile avec des sprints réguliers et des sessions de feedback client. Notre processus comprend : la découverte et la planification, la conception et le prototypage, le développement et les tests, le déploiement et le support continu. Nous maintenons une communication transparente tout au long du cycle de vie du projet.`
- **Order** : `6`
- Cliquez sur **Save** puis **Publish**

---

## ✅ Vérification

Une fois ajoutées, vérifiez que les FAQs apparaissent sur votre site :
```
http://localhost:5000/faq
```

Ou testez l'API :
```bash
curl -s 'http://localhost:1337/api/faqs?sort=order:asc' | python3 -m json.tool
```

---

## 📝 Notes importantes

- **Order** : L'ordre détermine comment les FAQs sont affichées (1 = premier)
- **Publish** : N'oubliez pas de publier chaque FAQ après l'avoir sauvegardée
- **Categories** : Les FAQs sont regroupées par catégorie (Général, Services, Tarification, Processus)

---

## 🚀 Une fois terminé

Votre page FAQ sera complète avec toutes les questions fréquemment posées, organisées par catégorie et prêtes à aider vos visiteurs !
