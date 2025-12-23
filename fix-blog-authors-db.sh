#!/bin/bash

# Script pour associer TOUS les articles à l'auteur Ouassim Samad (ID 3)

STRAPI_URL="http://localhost:1337"
AUTHOR_ID=3  # Ouassim Samad

echo "🔧 Récupération de tous les articles..."

# Récupérer tous les articles
ARTICLES=$(curl -s "${STRAPI_URL}/api/blog-posts?pagination[pageSize]=100")

# Extraire les documentIds
ARTICLE_IDS=$(echo "$ARTICLES" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    for article in data.get('data', []):
        print(article['documentId'])
except:
    pass
")

if [ -z "$ARTICLE_IDS" ]; then
    echo "❌ Aucun article trouvé ou erreur API"
    exit 1
fi

echo "📝 Articles trouvés : $(echo "$ARTICLE_IDS" | wc -l | tr -d ' ')"
echo ""

# Mettre à jour chaque article
SUCCESS=0
FAILED=0

for DOC_ID in $ARTICLE_IDS; do
    echo "📝 Mise à jour de l'article $DOC_ID..."
    
    RESPONSE=$(curl -s -X PUT "${STRAPI_URL}/api/blog-posts/${DOC_ID}" \
        -H "Content-Type: application/json" \
        -d "{
            \"data\": {
                \"author\": ${AUTHOR_ID}
            }
        }")
    
    # Vérifier si la requête a réussi
    if echo "$RESPONSE" | grep -q "\"documentId\""; then
        echo "  ✅ Succès"
        SUCCESS=$((SUCCESS + 1))
    else
        echo "  ❌ Échec: $RESPONSE"
        FAILED=$((FAILED + 1))
    fi
    
    sleep 0.5
done

echo ""
echo "✅ Terminé : $SUCCESS réussites, $FAILED échecs"
