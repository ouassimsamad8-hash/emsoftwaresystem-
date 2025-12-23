#!/bin/bash

STRAPI_URL="http://localhost:1337"

echo "🔍 Récupération de l'auteur Ouassim Samad..."

# Récupérer l'ID de l'auteur
AUTHOR_RESPONSE=$(curl -s "${STRAPI_URL}/api/authors")
AUTHOR_ID=$(echo $AUTHOR_RESPONSE | python3 -c "import sys, json; d=json.load(sys.stdin); authors=[a for a in d.get('data', []) if a.get('slug') == 'ouassim-samad']; print(authors[0]['id'] if authors else '')" 2>/dev/null)

if [ -z "$AUTHOR_ID" ]; then
  echo "❌ Auteur 'ouassim-samad' non trouvé dans Strapi!"
  echo "📋 Veuillez d'abord créer l'auteur dans Strapi admin:"
  echo "   1. Aller sur http://localhost:1337/admin"
  echo "   2. Content Manager → Author → Create new entry"
  echo "   3. Remplir: name='Ouassim Samad', slug='ouassim-samad'"
  echo "   4. Uploader un avatar"
  echo "   5. Save"
  exit 1
fi

echo "✅ Auteur trouvé (ID: $AUTHOR_ID)"
echo ""
echo "📝 Récupération des articles sans auteur..."

# Récupérer tous les articles
ARTICLES=$(curl -s "${STRAPI_URL}/api/blog-posts?pagination[pageSize]=100")

# Compter les articles
TOTAL=$(echo $ARTICLES | python3 -c "import sys, json; d=json.load(sys.stdin); print(len(d.get('data', [])))")

echo "📚 $TOTAL articles trouvés"
echo ""

# Mettre à jour chaque article
echo $ARTICLES | python3 << EOF
import sys, json, subprocess

data = json.load(sys.stdin)
articles = data.get('data', [])
author_id = '$AUTHOR_ID'
strapi_url = '$STRAPI_URL'

updated = 0
for article in articles:
    doc_id = article.get('documentId')
    title = article.get('title_fr', 'N/A')[:50]
    
    # Préparer les données de mise à jour
    update_data = {
        'data': {
            'author': author_id
        }
    }
    
    # Envoyer la requête PUT
    cmd = [
        'curl', '-s', '-X', 'PUT',
        f'{strapi_url}/api/blog-posts/{doc_id}',
        '-H', 'Content-Type: application/json',
        '-d', json.dumps(update_data)
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        updated += 1
        print(f'✅ Article mis à jour: {title}...')
    else:
        print(f'❌ Erreur pour: {title}...')

print(f'\n🎉 {updated}/{len(articles)} articles mis à jour avec l\'auteur!')
EOF

echo ""
echo "✨ Terminé! Rechargez http://localhost:5173/blog pour voir les avatars."
