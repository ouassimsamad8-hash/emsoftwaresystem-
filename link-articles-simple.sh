#!/bin/bash

# Script pour lier tous les articles à Ouassim Samad

echo "🔗 Liaison des articles à Ouassim Samad..."
echo ""

# DocumentId de Ouassim Samad (relation author)
AUTHOR_DOC_ID="o7qfuxcewtjcltwxjwljygnj"

# Récupérer tous les articles
echo "📝 Récupération des articles..."
ARTICLES=$(curl -s 'http://localhost:1337/api/blog-posts?pagination[limit]=100')

# Compter les articles
ARTICLE_COUNT=$(echo "$ARTICLES" | python3 -c "import sys, json; d=json.load(sys.stdin); print(len(d.get('data', [])))" 2>/dev/null)
echo "✅ $ARTICLE_COUNT articles trouvés"
echo ""

# Mettre à jour chaque article
COUNTER=0
echo "$ARTICLES" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for article in data.get('data', []):
    print(article['documentId'])
" | while read -r DOC_ID; do
    COUNTER=$((COUNTER + 1))
    
    # Mettre à jour l'article avec l'auteur
    RESPONSE=$(curl -s -X PUT "http://localhost:1337/api/blog-posts/$DOC_ID" \
      -H "Content-Type: application/json" \
      -d "{\"data\": {\"author\": \"$AUTHOR_DOC_ID\"}}")
    
    # Vérifier si la mise à jour a réussi
    if echo "$RESPONSE" | grep -q "documentId"; then
        TITLE=$(echo "$RESPONSE" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('data', {}).get('title_fr', 'Sans titre')[:50])" 2>/dev/null)
        echo "  $COUNTER. ✅ $TITLE"
    else
        echo "  $COUNTER. ❌ Erreur"
    fi
done

echo ""
echo "✨ Terminé!"
echo ""

# Vérification
echo "📊 Vérification..."
sleep 2
VERIFICATION=$(curl -s 'http://localhost:1337/api/blog-posts?populate=author&pagination[limit]=3')
echo "$VERIFICATION" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    articles = data.get('data', [])
    print(f'✅ Exemples d\'articles mis à jour:')
    for article in articles[:3]:
        author = article.get('author')
        if author:
            author_name = author.get('name', 'Inconnu')
            print(f'  - {article.get(\"title_fr\", \"Sans titre\")[:50]}: {author_name}')
        else:
            print(f'  - {article.get(\"title_fr\", \"Sans titre\")[:50]}: Aucun auteur')
except:
    pass
"

echo ""
echo "🎉 Allez sur http://localhost:5000/blog et testez!"
