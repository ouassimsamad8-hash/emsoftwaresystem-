#!/bin/bash

# Script pour recréer les 6 FAQs via l'API Strapi

echo "🔄 Recréation des FAQs via l'API Strapi..."

# FAQ 1 - Général
curl -X POST 'http://localhost:1337/api/faqs' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "question_fr": "Quels services offre E&M Software System ?",
      "answer_fr": "Nous offrons des services complets de développement logiciel, notamment le développement web, le développement d'\''applications mobiles, les solutions logicielles personnalisées, les services cloud, la transformation digitale et le conseil informatique. Notre équipe travaille en étroite collaboration avec les clients pour fournir des solutions sur mesure qui répondent à leurs besoins commerciaux spécifiques.",
      "category": "Général",
      "order": 1
    }
  }' > /dev/null 2>&1
echo "✅ FAQ 1 créée"

# FAQ 2 - Général
curl -X POST 'http://localhost:1337/api/faqs' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "question_fr": "Combien de temps prend un projet typique ?",
      "answer_fr": "Les délais du projet varient en fonction de la portée et de la complexité. Un site web simple peut prendre 4 à 6 semaines, tandis qu'\''une application d'\''entreprise complexe peut prendre 3 à 6 mois. Lors de notre consultation initiale, nous fournissons un calendrier détaillé spécifique aux exigences de votre projet.",
      "category": "Général",
      "order": 2
    }
  }' > /dev/null 2>&1
echo "✅ FAQ 2 créée"

# FAQ 3 - Services
curl -X POST 'http://localhost:1337/api/faqs' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "question_fr": "Offrez-vous un support et une maintenance continus ?",
      "answer_fr": "Oui, nous offrons des forfaits de support et de maintenance complets pour garantir que votre logiciel continue de fonctionner de manière optimale. Cela comprend les corrections de bugs, les mises à jour de sécurité, la surveillance des performances et les améliorations de fonctionnalités selon les besoins.",
      "category": "Services",
      "order": 3
    }
  }' > /dev/null 2>&1
echo "✅ FAQ 3 créée"

# FAQ 4 - Services
curl -X POST 'http://localhost:1337/api/faqs' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "question_fr": "Avec quelles technologies travaillez-vous ?",
      "answer_fr": "Nous travaillons avec un large éventail de technologies modernes, notamment React, Vue.js, Angular pour le frontend ; Node.js, Python, Java pour le backend ; AWS, Azure, Google Cloud pour les services cloud ; et PostgreSQL, MongoDB pour les bases de données. Nous sélectionnons la meilleure pile technologique pour chaque projet en fonction des exigences spécifiques.",
      "category": "Services",
      "order": 4
    }
  }' > /dev/null 2>&1
echo "✅ FAQ 4 créée"

# FAQ 5 - Tarification
curl -X POST 'http://localhost:1337/api/faqs' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "question_fr": "Comment tarifiez-vous vos services ?",
      "answer_fr": "Nous proposons des modèles de tarification flexibles, notamment des projets à prix fixe, du temps et des matériaux, et des arrangements d'\''équipe dédiée. Le meilleur modèle dépend de la portée de votre projet, du calendrier et du budget. Nous fournissons des devis détaillés après avoir compris vos besoins lors de la consultation initiale.",
      "category": "Tarification",
      "order": 5
    }
  }' > /dev/null 2>&1
echo "✅ FAQ 5 créée"

# FAQ 6 - Processus
curl -X POST 'http://localhost:1337/api/faqs' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "question_fr": "Quel est votre processus de développement ?",
      "answer_fr": "Nous suivons une méthodologie de développement agile avec des sprints réguliers et des sessions de feedback client. Notre processus comprend : la découverte et la planification, la conception et le prototypage, le développement et les tests, le déploiement et le support continu. Nous maintenons une communication transparente tout au long du cycle de vie du projet.",
      "category": "Processus",
      "order": 6
    }
  }' > /dev/null 2>&1
echo "✅ FAQ 6 créée"

echo ""
echo "✅ Toutes les FAQs ont été recréées via l'API !"
echo "🔍 Vérification..."

sleep 2

curl -s 'http://localhost:1337/api/faqs?sort=order:asc&locale=fr' | python3 -c "import sys, json; d=json.load(sys.stdin); print(f'\n📊 Total: {d[\"meta\"][\"pagination\"][\"total\"]} FAQs'); [print(f'{f[\"order\"]}. [{f[\"category\"]}] {f[\"question_fr\"]}') for f in d['data']]"
