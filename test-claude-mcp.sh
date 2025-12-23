#!/bin/bash
echo "🔍 Diagnostic Claude Desktop MCP"
echo "================================"
echo ""

echo "1. Configuration Claude Desktop:"
if [ -f ~/Library/Application\ Support/Claude/claude_desktop_config.json ]; then
    echo "✅ Fichier de configuration trouvé"
    cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
else
    echo "❌ Fichier de configuration manquant"
fi

echo ""
echo "2. Serveur MCP compilé:"
if [ -f /Users/asf/emsoftwaresystem-/mcp-server/build/index.js ]; then
    echo "✅ Serveur MCP compilé ($(ls -lh /Users/asf/emsoftwaresystem-/mcp-server/build/index.js | awk '{print $5}'))"
else
    echo "❌ Serveur MCP non compilé"
fi

echo ""
echo "3. Test du serveur MCP:"
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | \
    STRAPI_URL=http://localhost:1337 node /Users/asf/emsoftwaresystem-/mcp-server/build/index.js 2>&1 | \
    python3 -c "import sys, json; d=json.load(sys.stdin); print(f'✅ {len(d.get(\"result\", {}).get(\"tools\", []))} outils MCP disponibles')" 2>/dev/null || echo "❌ Erreur lors du test"

echo ""
echo "4. Strapi actif:"
if lsof -ti:1337 > /dev/null 2>&1; then
    echo "✅ Strapi actif sur port 1337"
else
    echo "❌ Strapi n'est pas actif"
fi

echo ""
echo "5. Logs Claude Desktop (dernières lignes):"
if [ -d ~/Library/Logs/Claude ]; then
    echo "✅ Dossier de logs trouvé"
    ls -lt ~/Library/Logs/Claude | head -5
else
    echo "⚠️ Aucun log Claude Desktop trouvé"
fi

echo ""
echo "================================"
echo "📋 Instructions:"
echo "1. Redémarrez Claude Desktop (Cmd+Q puis relancer)"
echo "2. Testez: 'Combien d'articles dans le blog ?'"
echo "3. Si erreur, vérifiez: tail -50 ~/Library/Logs/Claude/mcp*.log"
