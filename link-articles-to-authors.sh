#!/bin/bash

# Script pour lier automatiquement les articles aux auteurs dans Strapi

echo "🔗 Liaison des articles aux auteurs..."
echo ""

# D'abord, récupérer l'ID de l'auteur Ouassim Samad
AUTHOR_RESPONSE=$(curl -s 'http://localhost:1337/api/authors?filters[slug][$eq]=ouassim-samad')
AUTHOR_ID=$(echo "$AUTHOR_RESPONSE" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d['data'][0]['id'] if d.get('data') and len(d['data']) > 0 else '')" 2>/dev/null)

if [ -z "$AUTHOR_ID" ]; then
  echo "❌ Erreur: Auteur 'Ouassim Samad' non trouvé"
  exit 1
fi

echo "✅ Auteur trouvé: Ouassim Samad (ID: $AUTHOR_ID)"
echo ""

# Récupérer tous les articles
ARTICLES=$(curl -s 'http://localhost:1337/api/blog-posts?pagination[limit]=100')

# Parser et mettre à jour chaque article
echo "$ARTICLES" | python3 << 'PYTHON_SCRIPT'
import sys
import json
import urllib.request
import urllib.error

data = json.load(sys.stdin)
articles = data.get('data', [])

print(f"📝 {len(articles)} articles à mettre à jour...")
print()

for i, article in enumerate(articles, 1):
    article_id = article['id']
    article_doc_id = article['documentId']
    title = article.get('title_fr', 'Sans titre')
    
    # Lire l'AUTHOR_ID depuis l'environnement
    import os
    author_id = os.environ.get('AUTHOR_ID')
    
    # Préparer les données de mise à jour
    update_data = {
        "data": {
            "author": author_id
        }
    }
    
    # Envoyer la requête PUT
    url = f'http://localhost:1337/api/blog-posts/{article_doc_id}'
    req = urllib.request.Request(
        url,
        data=json.dumps(update_data).encode('utf-8'),
        headers={
            'Content-Type': 'application/json'
        },
        method='PUT'
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read())
            print(f"  {i}. ✅ {title[:60]}")
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"  {i}. ❌ Erreur pour '{title}': {e.code}")
        print(f"     {error_body[:200]}")
    except Exception as e:
        print(f"  {i}. ❌ Erreur pour '{title}': {str(e)}")

print()
print("✨ Mise à jour terminée!")
PYTHON_SCRIPT

# Vérification
echo ""
echo "📊 Vérification des résultats..."
sleep 2

VERIFICATION=$(curl -s 'http://localhost:1337/api/blog-posts?populate=author&pagination[limit]=5')
echo "$VERIFICATION" | python3 -c "
import sys, json
data = json.load(sys.stdin)
articles = data.get('data', [])
linked = sum(1 for a in articles if a.get('author'))
print(f'✅ {linked}/{len(articles)} des 5 premiers articles ont un auteur lié')
for article in articles[:3]:
    author = article.get('author')
    author_name = author.get('name', 'Aucun') if author else 'Aucun'
    print(f\"  - {article.get('title_fr', 'Sans titre')[:50]}: {author_name}\")
" 2>/dev/null

echo ""
echo "🎉 Terminé! Allez sur http://localhost:5000/blog et cliquez sur un auteur"
