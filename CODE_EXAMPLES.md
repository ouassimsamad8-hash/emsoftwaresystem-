# 🔄 Exemples de Code - Avant/Après Migration

## 📖 Introduction

Ce document montre comment utiliser les nouvelles fonctions après la migration vers Strapi.

---

## 📦 Page Services - AVANT

```tsx
import { services } from '@/data/content';
import { useLanguage } from '@/lib/language-context';

export default function Services() {
  const { language } = useLanguage();
  
  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <h2>{service.title[language]}</h2>
          <p>{service.shortDescription[language]}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## ✨ Page Services - APRÈS (avec Strapi)

```tsx
import { useServices } from '@/hooks/use-services';
import { useLanguage } from '@/lib/language-context';

export default function Services() {
  const { language } = useLanguage();
  const { data: services, isLoading, error } = useServices();
  
  // Afficher un loader pendant le chargement
  if (isLoading) {
    return <div className="text-center py-20">Chargement...</div>;
  }
  
  // Gérer les erreurs
  if (error) {
    return <div className="text-center py-20 text-red-500">
      Erreur: {error.message}
    </div>;
  }
  
  // Afficher les services
  return (
    <div>
      {services?.map(service => (
        <div key={service.id}>
          <h2>{service.title[language]}</h2>
          <p>{service.shortDescription[language]}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 📦 Page Service Detail - AVANT

```tsx
import { services } from '@/data/content';
import { useParams } from 'wouter';
import { useLanguage } from '@/lib/language-context';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { language } = useLanguage();
  
  const service = services.find(s => s.slug === slug);
  
  if (!service) {
    return <div>Service non trouvé</div>;
  }
  
  return (
    <div>
      <h1>{service.title[language]}</h1>
      <p>{service.fullDescription[language]}</p>
      
      <h2>Fonctionnalités</h2>
      <ul>
        {service.features.map((feature, i) => (
          <li key={i}>{feature[language]}</li>
        ))}
      </ul>
      
      <h2>Avantages</h2>
      <ul>
        {service.benefits.map((benefit, i) => (
          <li key={i}>{benefit[language]}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ✨ Page Service Detail - APRÈS (avec Strapi)

```tsx
import { useService } from '@/hooks/use-services';
import { useParams } from 'wouter';
import { useLanguage } from '@/lib/language-context';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const { data: service, isLoading, error } = useService(slug!);
  
  if (isLoading) {
    return <div className="text-center py-20">Chargement...</div>;
  }
  
  if (error) {
    return <div className="text-center py-20 text-red-500">
      Erreur: {error.message}
    </div>;
  }
  
  if (!service) {
    return <div className="text-center py-20">
      Service non trouvé
    </div>;
  }
  
  return (
    <div>
      <h1>{service.title[language]}</h1>
      <p>{service.fullDescription[language]}</p>
      
      <h2>Fonctionnalités</h2>
      <ul>
        {service.features.map((feature, i) => (
          <li key={i}>{feature[language]}</li>
        ))}
      </ul>
      
      <h2>Avantages</h2>
      <ul>
        {service.benefits.map((benefit, i) => (
          <li key={i}>{benefit[language]}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 📦 Page Projects - AVANT

```tsx
import { projects } from '@/data/content';
import { useLanguage } from '@/lib/language-context';
import { Link } from 'wouter';

export default function Projects() {
  const { language } = useLanguage();
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <Link key={project.id} href={`/projects/${project.slug}`}>
          <div>
            <img src={`/${project.image}`} alt={project.title[language]} />
            <h3>{project.title[language]}</h3>
            <p>{project.description[language]}</p>
            <div className="flex gap-2">
              {project.technologies.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

---

## ✨ Page Projects - APRÈS (avec Strapi)

```tsx
import { useProjects } from '@/hooks/use-projects';
import { useLanguage } from '@/lib/language-context';
import { Link } from 'wouter';

export default function Projects() {
  const { language } = useLanguage();
  const { data: projects, isLoading, error } = useProjects();
  
  if (isLoading) {
    return <div className="text-center py-20">Chargement des projets...</div>;
  }
  
  if (error) {
    return <div className="text-center py-20 text-red-500">
      Erreur: {error.message}
    </div>;
  }
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map(project => (
        <Link key={project.id} href={`/projects/${project.slug}`}>
          <div>
            {/* L'URL de l'image vient maintenant de Strapi */}
            <img src={project.image} alt={project.title[language]} />
            <h3>{project.title[language]}</h3>
            <p>{project.description[language]}</p>
            <div className="flex gap-2">
              {project.technologies.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

---

## 📦 Page Project Detail - AVANT

```tsx
import { projects } from '@/data/content';
import { useParams } from 'wouter';
import { useLanguage } from '@/lib/language-context';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { language } = useLanguage();
  
  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    return <div>Projet non trouvé</div>;
  }
  
  return (
    <div>
      <img src={`/${project.image}`} alt={project.title[language]} />
      <h1>{project.title[language]}</h1>
      <p>{project.description[language]}</p>
      
      <h2>Technologies</h2>
      <div className="flex gap-2">
        {project.technologies.map(tech => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      
      <h2>Le Défi</h2>
      <p>{project.challenge[language]}</p>
      
      <h2>Notre Solution</h2>
      <p>{project.solution[language]}</p>
      
      <h2>Résultats</h2>
      <ul>
        {project.results.map((result, i) => (
          <li key={i}>{result[language]}</li>
        ))}
      </ul>
      
      <h2>Screenshots</h2>
      <div className="grid grid-cols-2 gap-4">
        {project.screenshots?.map((screenshot, i) => (
          <img key={i} src={`/${screenshot}`} alt={`Screenshot ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
```

---

## ✨ Page Project Detail - APRÈS (avec Strapi)

```tsx
import { useProject } from '@/hooks/use-projects';
import { useParams } from 'wouter';
import { useLanguage } from '@/lib/language-context';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const { data: project, isLoading, error } = useProject(slug!);
  
  if (isLoading) {
    return <div className="text-center py-20">Chargement du projet...</div>;
  }
  
  if (error) {
    return <div className="text-center py-20 text-red-500">
      Erreur: {error.message}
    </div>;
  }
  
  if (!project) {
    return <div className="text-center py-20">
      Projet non trouvé
    </div>;
  }
  
  return (
    <div>
      {/* Les URLs d'images viennent directement de Strapi */}
      <img src={project.image} alt={project.title[language]} />
      <h1>{project.title[language]}</h1>
      <p>{project.description[language]}</p>
      
      <h2>Technologies</h2>
      <div className="flex gap-2">
        {project.technologies.map(tech => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      
      <h2>Le Défi</h2>
      <p>{project.challenge[language]}</p>
      
      <h2>Notre Solution</h2>
      <p>{project.solution[language]}</p>
      
      <h2>Résultats</h2>
      <ul>
        {project.results.map((result, i) => (
          <li key={i}>{result[language]}</li>
        ))}
      </ul>
      
      <h2>Screenshots</h2>
      <div className="grid grid-cols-2 gap-4">
        {project.screenshots?.map((screenshot, i) => (
          <img key={i} src={screenshot} alt={`Screenshot ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 Page Home (aperçu services et projects) - APRÈS

```tsx
import { useServices } from '@/hooks/use-services';
import { useProjects } from '@/hooks/use-projects';
import { useLanguage } from '@/lib/language-context';
import { Link } from 'wouter';

export default function Home() {
  const { language } = useLanguage();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  
  // Prendre seulement les 3 premiers de chaque
  const featuredServices = services?.slice(0, 3);
  const featuredProjects = projects?.slice(0, 6);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Bienvenue sur E&M Software System</h1>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <h2>Nos Services</h2>
        
        {servicesLoading ? (
          <div>Chargement des services...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices?.map(service => (
              <Link key={service.id} href={`/services/${service.slug}`}>
                <div>
                  <h3>{service.title[language]}</h3>
                  <p>{service.shortDescription[language]}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <Link href="/services">
          <button>Voir tous les services</button>
        </Link>
      </section>
      
      {/* Projects Section */}
      <section className="py-20">
        <h2>Nos Projets</h2>
        
        {projectsLoading ? (
          <div>Chargement des projets...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects?.map(project => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <div>
                  <img src={project.image} alt={project.title[language]} />
                  <h3>{project.title[language]}</h3>
                  <p>{project.description[language]}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <Link href="/projects">
          <button>Voir tous les projets</button>
        </Link>
      </section>
    </div>
  );
}
```

---

## 🎁 Bonus: Filtrer les Projets par Catégorie

```tsx
import { useProjects } from '@/hooks/use-projects';
import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';

export default function ProjectsWithFilter() {
  const { language } = useLanguage();
  const { data: allProjects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Filtrer les projets
  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects?.filter(p => p.category === selectedCategory);
  
  // Obtenir les catégories uniques
  const categories = ['all', ...new Set(allProjects?.map(p => p.category) || [])];
  
  return (
    <div>
      {/* Filtres */}
      <div className="flex gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category === 'all' ? 'Tous' : category}
          </button>
        ))}
      </div>
      
      {/* Projets */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredProjects?.map(project => (
          <div key={project.id}>
            <img src={project.image} alt={project.title[language]} />
            <span className="badge">{project.categoryLabel[language]}</span>
            <h3>{project.title[language]}</h3>
            <p>{project.description[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📊 Comparaison des Avantages

| Fonctionnalité | Avant (fichier local) | Après (Strapi) |
|----------------|----------------------|----------------|
| **Modifier le contenu** | ❌ Éditer le code | ✅ Interface admin |
| **Ajouter un service** | ❌ Modifier content.ts | ✅ Cliquer sur "Create" |
| **Uploader des images** | ❌ Via FTP/Git | ✅ Drag & drop |
| **Multi-langue** | ⚠️ Manuel dans le code | ✅ Champs séparés |
| **API REST** | ❌ Pas d'API | ✅ Automatique |
| **Cache** | ❌ Aucun | ✅ TanStack Query |
| **Loading states** | ❌ Données instantanées | ✅ Gestion du loading |
| **Error handling** | ❌ Pas d'erreurs possibles | ✅ Gestion des erreurs |
| **Permissions** | ❌ Tout public | ✅ Contrôle fin |
| **Versioning** | ⚠️ Via Git | ✅ Historique Strapi |

---

## 🎉 Conclusion

Après la migration:

1. **Même affichage** - L'interface reste identique pour les utilisateurs
2. **Mêmes données** - Tout est copié exactement
3. **Mêmes fonctionnalités** - Aucune perte de fonctionnalité
4. **BONUS**: Interface admin pour gérer le contenu facilement!

---

**Questions? Consultez `MIGRATION_GUIDE.md` ou `QUICK_START.md` !**
