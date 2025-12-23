#!/bin/bash

echo "🚀 Ajout des auteurs dans Strapi..."

# Auteur 1 - Ouassim Samad (Fondateur)
curl -X POST "http://localhost:1337/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Ouassim Samad",
      "slug": "ouassim-samad",
      "role": "Fondateur & Architecte Logiciel",
      "bio": "Expert en architecture logicielle et transformation digitale avec plus de 10 ans d'\''expérience.",
      "fullBio": "Passionné par l'\''innovation technologique, je guide les entreprises dans leur transformation digitale. Expert en Cloud, IA et architecture microservices.",
      "email": "ouassim@emsoftware.ma",
      "verified": true,
      "expertise": ["Architecture", "Cloud Computing", "IA", "DevOps", "Transformation Digitale"],
      "social": {
        "linkedin": "https://www.linkedin.com/in/ouassim-samad-0941672b2",
        "twitter": "https://twitter.com/ouassimsamad",
        "github": "https://github.com/ouassimsamad",
        "website": "https://emsoftware.ma"
      },
      "joinedDate": "2020-01-15",
      "totalViews": 15000,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' && echo "" && echo "✅ Ouassim Samad ajouté"

# Auteur 2 - Sarah El Amrani (Développeuse Frontend)
curl -X POST "http://localhost:1337/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Sarah El Amrani",
      "slug": "sarah-el-amrani",
      "role": "Lead Developer Frontend",
      "bio": "Spécialiste React et UX/UI, créatrice d'\''expériences web modernes et performantes.",
      "fullBio": "Développeuse passionnée par les interfaces utilisateur et l'\''expérience utilisateur. Expert en React, Next.js, TypeScript et design systems.",
      "email": "sarah@emsoftware.ma",
      "verified": true,
      "expertise": ["React", "Next.js", "TypeScript", "UI/UX", "Design Systems"],
      "social": {
        "linkedin": "https://linkedin.com/in/sarah-elamrani",
        "twitter": "https://twitter.com/sarahdev",
        "github": "https://github.com/sarahelamrani"
      },
      "joinedDate": "2021-03-20",
      "totalViews": 8500,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' && echo "" && echo "✅ Sarah El Amrani ajoutée"

# Auteur 3 - Karim Bennani (Expert Backend)
curl -X POST "http://localhost:1337/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Karim Bennani",
      "slug": "karim-bennani",
      "role": "Architecte Backend & DevOps",
      "bio": "Expert en systèmes distribués, APIs et infrastructure cloud scalable.",
      "fullBio": "Architecte backend avec une passion pour les systèmes distribués et l'\''optimisation de performance. Spécialiste Node.js, Python et Kubernetes.",
      "email": "karim@emsoftware.ma",
      "verified": true,
      "expertise": ["Node.js", "Python", "Microservices", "Kubernetes", "AWS"],
      "social": {
        "linkedin": "https://linkedin.com/in/karim-bennani",
        "github": "https://github.com/karimbennani"
      },
      "joinedDate": "2020-09-10",
      "totalViews": 12000,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' && echo "" && echo "✅ Karim Bennani ajouté"

# Auteur 4 - Leila Mansouri (Data Scientist)
curl -X POST "http://localhost:1337/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Leila Mansouri",
      "slug": "leila-mansouri",
      "role": "Data Scientist & IA",
      "bio": "Spécialiste en Machine Learning et Intelligence Artificielle appliquée au business.",
      "fullBio": "Passionnée par l'\''IA et le Machine Learning, je transforme les données en insights actionnables pour les entreprises. Expert en Python, TensorFlow et analyse prédictive.",
      "email": "leila@emsoftware.ma",
      "verified": true,
      "expertise": ["Machine Learning", "Python", "TensorFlow", "Data Analytics", "IA"],
      "social": {
        "linkedin": "https://linkedin.com/in/leila-mansouri",
        "twitter": "https://twitter.com/leilaml"
      },
      "joinedDate": "2021-06-15",
      "totalViews": 9500,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' && echo "" && echo "✅ Leila Mansouri ajoutée"

# Auteur 5 - Youssef Idrissi (Mobile Developer)
curl -X POST "http://localhost:1337/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Youssef Idrissi",
      "slug": "youssef-idrissi",
      "role": "Lead Mobile Developer",
      "bio": "Expert en développement mobile cross-platform avec React Native et Flutter.",
      "fullBio": "Développeur mobile passionné créant des applications mobiles performantes et élégantes. Spécialiste React Native, Flutter et architecture mobile.",
      "email": "youssef@emsoftware.ma",
      "verified": true,
      "expertise": ["React Native", "Flutter", "iOS", "Android", "Mobile UX"],
      "social": {
        "linkedin": "https://linkedin.com/in/youssef-idrissi",
        "github": "https://github.com/youssefidrissi"
      },
      "joinedDate": "2021-11-01",
      "totalViews": 7200,
      "publishedAt": "2025-11-16T00:00:00.000Z"
    }
  }' && echo "" && echo "✅ Youssef Idrissi ajouté"

echo ""
echo "✨ Tous les auteurs ont été ajoutés avec succès!"
echo "📊 Vérification..."
sleep 2

curl -s "http://localhost:1337/api/authors" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    authors = data.get('data', [])
    print(f'\n✅ {len(authors)} auteurs dans la base:')
    for author in authors:
        print(f'  - {author[\"name\"]} ({author[\"role\"]}) - slug: {author[\"slug\"]}')
except:
    print('⚠️  Impossible de vérifier les auteurs')
"
