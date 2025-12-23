#!/bin/bash

# Script pour exposer l'API Strapi locale via Ngrok pour ChatGPT

echo "🚀 Configuration Ngrok pour ChatGPT Custom GPT"
echo "=============================================="
echo ""

# Vérifier si ngrok est installé
if ! command -v ngrok &> /dev/null; then
    echo "❌ Ngrok n'est pas installé"
    echo ""
    echo "Installation via Homebrew:"
    echo "  brew install ngrok"
    echo ""
    echo "Ou télécharger depuis: https://ngrok.com/download"
    exit 1
fi

# Vérifier si Strapi tourne
if ! lsof -ti:1337 > /dev/null; then
    echo "⚠️  Strapi ne semble pas actif sur le port 1337"
    echo ""
    echo "Démarrez Strapi avec:"
    echo "  cd strapi-cms && npm run develop"
    echo ""
    read -p "Voulez-vous continuer quand même? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "📡 Démarrage du tunnel Ngrok..."
echo "   Port: 1337 (Strapi)"
echo ""
echo "Une fois le tunnel créé:"
echo "  1. Copiez l'URL HTTPS (ex: https://abc123.ngrok.io)"
echo "  2. Utilisez cette URL dans votre Custom GPT"
echo "  3. Remplacez 'http://localhost:1337' par l'URL Ngrok"
echo ""
echo "Pour arrêter: Ctrl+C"
echo ""
echo "=============================================="
echo ""

# Démarrer ngrok
ngrok http 1337
