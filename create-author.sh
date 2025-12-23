#!/bin/bash

STRAPI_URL="http://localhost:1337"

echo "👤 Création de l'auteur Ouassim Samad..."

# Créer l'auteur
curl -X POST "${STRAPI_URL}/api/authors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Ouassim Samad",
      "slug": "ouassim-samad",
      "role": "CEO & Fondateur",
      "bio": "Expert en développement logiciel et transformation digitale. Plus de 10 ans d'\''expérience dans la création de solutions innovantes pour les entreprises.",
      "email": "contact@emsoftware.ma",
      "expertise": ["Développement Web", "Cloud Computing", "Intelligence Artificielle", "Cybersécurité"],
      "verified": true
    }
  }' | python3 -m json.tool

echo ""
echo "✅ Auteur créé! Maintenant:"
echo "   1. Allez sur http://localhost:1337/admin"
echo "   2. Content Manager → Author → Ouassim Samad"
echo "   3. Uploadez une photo dans le champ 'Avatar'"
echo "   4. Save"
echo ""
echo "   Puis relancez: ./fix-authors.sh"
