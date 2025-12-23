#!/bin/bash

echo "🧪 Test de l'API Authors"
echo ""

# Test 1: Liste tous les auteurs
echo "📋 Test 1: Liste de tous les auteurs"
curl -s 'http://localhost:1337/api/authors' | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    authors = data.get('data', [])
    print(f'✅ {len(authors)} auteurs trouvés:')
    for author in authors:
        print(f'  - {author.get(\"name\"):<20} (slug: {author.get(\"slug\")})')
except Exception as e:
    print(f'❌ Erreur: {e}')
"
echo ""

# Test 2: Chercher Youssef Idrissi
echo "🔍 Test 2: Recherche de Youssef Idrissi"
curl -s 'http://localhost:1337/api/authors?filters[slug][$eq]=youssef-idrissi&populate=*' | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data.get('data') and len(data['data']) > 0:
        author = data['data'][0]
        print(f'✅ Youssef Idrissi trouvé:')
        print(f'  Name: {author.get(\"name\")}')
        print(f'  Slug: {author.get(\"slug\")}')
        print(f'  DocumentId: {author.get(\"documentId\")}')
        print(f'  Role: {author.get(\"role\")}')
    else:
        print('❌ Youssef Idrissi non trouvé')
        print(f'Réponse: {data}')
except Exception as e:
    print(f'❌ Erreur: {e}')
"
echo ""

# Test 3: Articles de Youssef
echo "📝 Test 3: Articles de Youssef Idrissi"
curl -s 'http://localhost:1337/api/blog-posts?populate=author' | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    articles = data.get('data', [])
    youssef_articles = [a for a in articles if a.get('author') and 'youssef' in a['author'].get('name', '').lower()]
    print(f'✅ {len(youssef_articles)} article(s) de Youssef:')
    for article in youssef_articles:
        print(f'  - {article.get(\"title_fr\", \"Sans titre\")[:60]}')
except Exception as e:
    print(f'❌ Erreur: {e}')
"
echo ""

echo "✨ Tests terminés!"
