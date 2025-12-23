#!/bin/bash

# Script pour démarrer Strapi et exécuter la migration
# Usage: ./scripts/migrate-with-strapi.sh

echo "🚀 Démarrage de Strapi..."

# Démarrer Strapi en arrière-plan
cd strapi-cms
npm run develop &
STRAPI_PID=$!

# Attendre que Strapi soit prêt
echo "⏳ Attente du démarrage de Strapi..."
sleep 15

# Vérifier si Strapi est prêt
for i in {1..10}; do
  if curl -s http://localhost:1337/_health > /dev/null; then
    echo "✅ Strapi est prêt!"
    break
  fi
  echo "   Tentative $i/10..."
  sleep 2
done

# Retourner au dossier racine
cd ..

# Lancer la migration
echo "📦 Lancement de la migration..."
npm run migrate

# Arrêter Strapi
echo "🛑 Arrêt de Strapi..."
kill $STRAPI_PID

echo "✅ Terminé!"
