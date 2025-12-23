#!/bin/bash

# Script pour ajouter des articles de blog dans Strapi via l'API
STRAPI_URL="http://localhost:1337"

echo "🚀 Ajout des articles de blog dans Strapi..."
echo ""

# Article 1: Intelligence Artificielle
echo "📝 Ajout de l'article: Intelligence Artificielle..."
curl -X POST "${STRAPI_URL}/api/blog-posts" \
  -H "Content-Type: application/json" \
  -d '{
  "data": {
    "title_fr": "L'\''Intelligence Artificielle au Service de Votre Entreprise: Guide Complet 2025",
    "slug": "intelligence-artificielle-entreprise-2025",
    "category": "ai-ml",
    "categoryLabel_fr": "Intelligence Artificielle",
    "author": "Ouassim Samad",
    "readTime": 8,
    "excerpt_fr": "L'\''intelligence artificielle n'\''est plus une technologie futuriste - c'\''est une réalité qui transforme déjà la façon dont les entreprises opèrent. En 2025, l'\''IA est devenue un outil stratégique essentiel pour rester compétitif.",
    "content_fr": "<h2>Pourquoi l'\''IA est Cruciale pour Votre Entreprise</h2><p>Les entreprises qui adoptent l'\''IA voient des améliorations significatives:</p><ul><li><strong>Augmentation de 40% de la productivité</strong> grâce à l'\''automatisation</li><li><strong>Réduction de 30% des coûts</strong> via l'\''optimisation</li><li><strong>Amélioration de 50% de l'\''expérience client</strong></li></ul><h2>Comment Commencer</h2><p>Chez E&M Software System, nous accompagnons les entreprises dans leur transformation IA de A à Z.</p>",
    "seoTitle": "IA en Entreprise 2025 | Guide Complet par E&M Software System",
    "seoDescription": "Découvrez comment l'\''intelligence artificielle transforme les entreprises en 2025. Stratégies, outils et conseils pratiques.",
    "seoKeywords": "intelligence artificielle, IA entreprise, transformation digitale, automatisation, machine learning"
  }
}' 2>&1 | grep -q "documentId" && echo "✅ Article IA ajouté" || echo "❌ Erreur lors de l'ajout"

sleep 1

# Article 2: Développement Web
echo "📝 Ajout de l'article: Développement Web..."
curl -X POST "${STRAPI_URL}/api/blog-posts" \
  -H "Content-Type: application/json" \
  -d '{
  "data": {
    "title_fr": "Développement Web Moderne: Les 10 Tendances Incontournables de 2025",
    "slug": "developpement-web-tendances-2025",
    "category": "web-dev",
    "categoryLabel_fr": "Développement Web",
    "author": "Ouassim Samad",
    "readTime": 10,
    "excerpt_fr": "Le développement web évolue à une vitesse fulgurante. En 2025, de nouvelles technologies redéfinissent la façon dont nous créons des applications web.",
    "content_fr": "<h2>1. React Server Components</h2><p>Les RSC changent la donne avec un rendu hybride ultra-performant.</p><h2>2. Edge Computing</h2><p>Déployer au plus près des utilisateurs. Latence divisée par 3.</p><h2>3. TypeScript Standard</h2><p>85% des projets utilisent TypeScript en 2025.</p><h2>Conclusion</h2><p>Chez E&M Software System, nous maîtrisons ces technologies de pointe.</p>",
    "seoTitle": "Développement Web 2025 | Top 10 Tendances par E&M Software",
    "seoDescription": "Découvrez les 10 tendances du développement web en 2025: React Server Components, Edge Computing, Web3, et plus.",
    "seoKeywords": "développement web 2025, tendances web, React, Next.js, edge computing, TypeScript"
  }
}' 2>&1 | grep -q "documentId" && echo "✅ Article Web ajouté" || echo "❌ Erreur lors de l'ajout"

sleep 1

# Article 3: Cybersécurité
echo "📝 Ajout de l'article: Cybersécurité..."
curl -X POST "${STRAPI_URL}/api/blog-posts" \
  -H "Content-Type: application/json" \
  -d '{
  "data": {
    "title_fr": "Cybersécurité en 2025: Guide Complet pour Protéger Votre Entreprise",
    "slug": "cybersecurite-entreprise-guide-2025",
    "category": "security",
    "categoryLabel_fr": "Sécurité & DevOps",
    "author": "Ouassim Samad",
    "readTime": 12,
    "excerpt_fr": "En 2025, une entreprise sur trois sera victime d'\''une cyberattaque. La cybersécurité n'\''est plus optionnelle - c'\''est une question de survie.",
    "content_fr": "<h2>Les 10 Piliers de la Cybersécurité</h2><h3>1. Authentification Multi-Facteurs</h3><p>Le MFA réduit le risque de 99.9%.</p><h3>2. Chiffrement des Données</h3><p>TLS 1.3 minimum, AES-256 au repos.</p><h3>3. Mises à Jour</h3><p>80% des attaques exploitent des vulnérabilités connues.</p><h2>Conclusion</h2><p>E&M Software System offre des audits de sécurité complets.</p>",
    "seoTitle": "Cybersécurité Entreprise 2025 | Guide Pratique par E&M Software",
    "seoDescription": "Protégez votre entreprise des cyberattaques en 2025. Stratégies, outils et bonnes pratiques de cybersécurité.",
    "seoKeywords": "cybersécurité, protection données, ransomware, RGPD, sécurité cloud, pentesting"
  }
}' 2>&1 | grep -q "documentId" && echo "✅ Article Cybersécurité ajouté" || echo "❌ Erreur lors de l'ajout"

echo ""
echo "✨ Terminé!"
echo "📝 Vérifiez vos articles sur: http://localhost:1337/admin"
echo "🌐 Voir le site: http://localhost:5000/blog"
