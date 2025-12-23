# 👥 Section Équipe - Guide Rapide

## ✅ Ce qui a été créé

### 1. Content Type Strapi
- Nouveau type de contenu "Team Member" dans Strapi
- Fichiers créés dans `/strapi-cms/src/api/team-member/`
- Champs : name, role (EN/FR), bio (EN/FR), avatar, email, LinkedIn, Twitter, expertise, order

### 2. Données de l'équipe réelle
Ajouté 6 membres d'équipe dans `/client/src/data/content.ts` :

1. **Ouassim Samad** - CEO & Lead Developer
2. **Sarah Martinez** - CTO & Solutions Architect
3. **Karim Benali** - Senior Full-Stack Developer
4. **Emma Johnson** - UI/UX Designer
5. **Mohamed El Amrani** - Mobile Development Lead
6. **Lisa Chen** - AI/ML Engineer

### 3. Page Team
- Nouvelle page `/client/src/pages/Team.tsx`
- Design moderne avec cartes animées
- Affiche avatar, nom, rôle, bio, expertise et liens sociaux
- Support bilingue (FR/EN)

### 4. Navigation mise à jour
- Ajout du lien "Équipe/Team" dans le menu
- Route `/team` configurée dans App.tsx

## 🚀 Pour démarrer

### Étape 1: Démarrer Strapi
```bash
cd strapi-cms
npm run develop
```

### Étape 2: Migrer les membres de l'équipe vers Strapi
Dans un autre terminal:
```bash
npm run migrate:team
```

### Étape 3: Configurer les permissions dans Strapi
1. Aller sur http://localhost:1337/admin
2. Settings → Users & Permissions Plugin → Roles → Public
3. Activer permissions pour "team-member":
   - ✅ find
   - ✅ findOne

### Étape 4: Voir la page
Visitez: http://localhost:5000/team

## 📸 Ajouter des avatars

Pour ajouter de vraies photos:

1. **Via Strapi Admin** (recommandé):
   - Aller dans Content Manager → Team Members
   - Éditer chaque membre
   - Upload l'avatar dans le champ "avatar"

2. **Via le dossier public**:
   - Placer les images dans `/client/public/avatars/`
   - Nommer: `ouassim.jpg`, `sarah.jpg`, `karim.jpg`, etc.

## 🎨 Personnalisation

### Modifier un membre de l'équipe
Éditez `/client/src/data/content.ts` et relancez `npm run migrate:team`

### Ajouter un nouveau membre
```typescript
{
  id: '7',
  name: 'Votre Nom',
  role: {
    en: 'Your Role',
    fr: 'Votre Rôle'
  },
  bio: {
    en: 'Your bio in English',
    fr: 'Votre bio en français'
  },
  avatar: '/avatars/votre-photo.jpg',
  email: 'email@emsoftware.com',
  linkedin: 'https://linkedin.com/in/your-profile',
  expertise: ['Skill1', 'Skill2', 'Skill3'],
  order: 7
}
```

## 🔗 Intégration avec Strapi

Pour utiliser les données de Strapi au lieu du fichier local, créez un hook:

```typescript
// /client/src/hooks/useTeamMembers.ts
import { useQuery } from '@tanstack/react-query';

export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const res = await fetch('http://localhost:1337/api/team-members?populate=*');
      return res.json();
    }
  });
}
```

Puis dans `Team.tsx`:
```typescript
const { data, isLoading } = useTeamMembers();
const members = data?.data || [];
```

## ✨ Fonctionnalités

- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Animations au scroll (Framer Motion)
- ✅ Cartes avec hover effects
- ✅ Badges pour les compétences
- ✅ Liens sociaux (Email, LinkedIn, Twitter)
- ✅ Support bilingue complet
- ✅ Tri par ordre défini

---

La page Team est maintenant prête ! 🎉
