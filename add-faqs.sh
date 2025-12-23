#!/bin/bash

# Script pour ajouter les FAQs à Strapi
echo "🔄 Ajout des FAQs à Strapi..."
echo "⏳ Attente que Strapi soit prêt..."

STRAPI_URL="http://localhost:1337"
MAX_RETRIES=30
RETRY_COUNT=0

# Attendre que Strapi soit prêt
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if curl -s "${STRAPI_URL}/api/faqs" > /dev/null 2>&1; then
    echo "✅ Strapi est prêt !"
    break
  fi
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "⏳ Tentative $RETRY_COUNT/$MAX_RETRIES..."
  sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "❌ Strapi n'est pas accessible. Assurez-vous qu'il est démarré sur le port 1337"
  exit 1
fi

echo ""
echo "📝 Ajout des 6 FAQs..."
echo ""

# FAQ 1
echo "Ajout FAQ 1/6..."
curl -s -X POST "${STRAPI_URL}/api/faqs" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "category_fr": "Général",
      "question_fr": "Quels services offre E&M Software System ?",
      "answer_fr": "Nous offrons des services complets de développement logiciel, notamment le développement web, le développement d'\''applications mobiles, les solutions logicielles personnalisées, les services cloud, la transformation digitale et le conseil informatique. Notre équipe travaille en étroite collaboration avec les clients pour fournir des solutions sur mesure qui répondent à leurs besoins commerciaux spécifiques.",
      "order": 1,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' > /dev/null && echo "✅ FAQ 1 ajoutée" || echo "❌ Erreur FAQ 1"

# FAQ 2
echo "Ajout FAQ 2/6..."
curl -s -X POST "${STRAPI_URL}/api/faqs" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "category_fr": "Général",
      "question_fr": "Combien de temps prend un projet typique ?",
      "answer_fr": "Les délais du projet varient en fonction de la portée et de la complexité. Un site web simple peut prendre 4 à 6 semaines, tandis qu'\''une application d'\''entreprise complexe peut prendre 3 à 6 mois. Lors de notre consultation initiale, nous fournissons un calendrier détaillé spécifique aux exigences de votre projet.",
      "order": 2,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' > /dev/null && echo "✅ FAQ 2 ajoutée" || echo "❌ Erreur FAQ 2"

# FAQ 3
echo "Ajout FAQ 3/6..."
curl -s -X POST "${STRAPI_URL}/api/faqs" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "category_fr": "Services",
      "question_fr": "Offrez-vous un support et une maintenance continus ?",
      "answer_fr": "Oui, nous offrons des forfaits de support et de maintenance complets pour garantir que votre logiciel continue de fonctionner de manière optimale. Cela comprend les corrections de bugs, les mises à jour de sécurité, la surveillance des performances et les améliorations de fonctionnalités selon les besoins.",
      "order": 3,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' > /dev/null && echo "✅ FAQ 3 ajoutée" || echo "❌ Erreur FAQ 3"

# FAQ 4
echo "Ajout FAQ 4/6..."
curl -s -X POST "${STRAPI_URL}/api/faqs" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "category_fr": "Services",
      "question_fr": "Avec quelles technologies travaillez-vous ?",
      "answer_fr": "Nous travaillons avec un large éventail de technologies modernes, notamment React, Vue.js, Angular pour le frontend ; Node.js, Python, Java pour le backend ; AWS, Azure, Google Cloud pour les services cloud ; et PostgreSQL, MongoDB pour les bases de données. Nous sélectionnons la meilleure pile technologique pour chaque projet en fonction des exigences spécifiques.",
      "order": 4,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' > /dev/null && echo "✅ FAQ 4 ajoutée" || echo "❌ Erreur FAQ 4"

# FAQ 5
echo "Ajout FAQ 5/6..."
curl -s -X POST "${STRAPI_URL}/api/faqs" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "category_fr": "Tarification",
      "question_fr": "Comment tarifiez-vous vos services ?",
      "answer_fr": "Nous proposons des modèles de tarification flexibles, notamment des projets à prix fixe, du temps et des matériaux, et des arrangements d'\''équipe dédiée. Le meilleur modèle dépend de la portée de votre projet, du calendrier et du budget. Nous fournissons des devis détaillés après avoir compris vos besoins lors de la consultation initiale.",
      "order": 5,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' > /dev/null && echo "✅ FAQ 5 ajoutée" || echo "❌ Erreur FAQ 5"

# FAQ 6
echo "Ajout FAQ 6/6..."
curl -s -X POST "${STRAPI_URL}/api/faqs" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "category_fr": "Processus",
      "question_fr": "Quel est votre processus de développement ?",
      "answer_fr": "Nous suivons une méthodologie de développement agile avec des sprints réguliers et des sessions de feedback client. Notre processus comprend : la découverte et la planification, la conception et le prototypage, le développement et les tests, le déploiement et le support continu. Nous maintenons une communication transparente tout au long du cycle de vie du projet.",
      "order": 6,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' > /dev/null && echo "✅ FAQ 6 ajoutée" || echo "❌ Erreur FAQ 6"

echo ""
echo "✨ Script terminé !"
echo "📊 Vérifiez les FAQs dans Strapi Admin : ${STRAPI_URL}/admin"
echo "🔗 API FAQs : ${STRAPI_URL}/api/faqs?sort=order:asc"
