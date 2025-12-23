#!/bin/bash

# Script pour uploader des avatars pour les auteurs via l'API Strapi

STRAPI_URL="http://localhost:1337"

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Upload d'avatars pour les auteurs${NC}"
echo "========================================"

# Créer un avatar SVG générique pour chaque auteur
create_avatar_svg() {
    local name="$1"
    local color="$2"
    local output_file="$3"
    
    # Extraire les initiales
    local initials=$(echo "$name" | awk '{print toupper(substr($1,1,1) substr($2,1,1))}')
    
    cat > "$output_file" << EOF
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="grad-$color" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:$color;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color}dd;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="200" cy="200" r="200" fill="url(#grad-$color)"/>
  
  <!-- Initiales -->
  <text x="200" y="240" font-family="Arial, sans-serif" font-size="140" font-weight="bold" 
        fill="white" text-anchor="middle">$initials</text>
</svg>
EOF
}

# Fonction pour uploader un fichier et l'associer à un auteur
upload_and_associate_avatar() {
    local author_name="$1"
    local author_slug="$2"
    local color="$3"
    
    echo -e "\n${BLUE}📸 Traitement de $author_name...${NC}"
    
    # Créer l'avatar SVG
    local temp_file="/tmp/avatar-${author_slug}.svg"
    create_avatar_svg "$author_name" "$color" "$temp_file"
    
    # 1. Uploader le fichier
    echo "  ⬆️  Upload du fichier..."
    local upload_response=$(curl -s -X POST "${STRAPI_URL}/api/upload" \
        -F "files=@${temp_file}")
    
    local file_id=$(echo "$upload_response" | python3 -c "import sys, json; data=json.loads(sys.stdin.read()); print(data[0]['id'])" 2>/dev/null)
    
    if [ -z "$file_id" ]; then
        echo -e "${RED}  ❌ Échec upload fichier${NC}"
        return 1
    fi
    
    echo -e "${GREEN}  ✅ Fichier uploadé (ID: $file_id)${NC}"
    
    # 2. Récupérer l'ID de l'auteur
    local author_response=$(curl -s "${STRAPI_URL}/api/authors?filters[slug][\$eq]=${author_slug}")
    local author_id=$(echo "$author_response" | python3 -c "import sys, json; data=json.loads(sys.stdin.read()); print(data['data'][0]['id'] if data.get('data') else '')" 2>/dev/null)
    
    if [ -z "$author_id" ]; then
        echo -e "${RED}  ❌ Auteur non trouvé${NC}"
        return 1
    fi
    
    echo "  👤 Auteur trouvé (ID: $author_id)"
    
    # 3. Associer l'avatar à l'auteur
    echo "  🔗 Association avatar..."
    local update_response=$(curl -s -X PUT "${STRAPI_URL}/api/authors/${author_id}" \
        -H "Content-Type: application/json" \
        -d "{
            \"data\": {
                \"avatar\": $file_id
            }
        }")
    
    if echo "$update_response" | grep -q '"id"'; then
        echo -e "${GREEN}  ✅ Avatar associé avec succès !${NC}"
    else
        echo -e "${RED}  ❌ Échec association${NC}"
        echo "  Réponse: $update_response"
    fi
    
    # Nettoyer
    rm -f "$temp_file"
}

# Upload avatars pour chaque auteur
echo ""
upload_and_associate_avatar "Sarah El Amrani" "sarah-el-amrani" "#e74c3c"
upload_and_associate_avatar "Karim Bennani" "karim-bennani" "#3498db"
upload_and_associate_avatar "Youssef Idrissi" "youssef-idrissi" "#2ecc71"
upload_and_associate_avatar "Leila Mansouri" "leila-mansouri" "#9b59b6"
upload_and_associate_avatar "Ouassim Samad" "ouassim-samad" "#667eea"

echo ""
echo -e "${GREEN}✅ Upload des avatars terminé !${NC}"
echo ""
echo "🔍 Vérification via API:"
curl -s "${STRAPI_URL}/api/authors?populate=avatar" | python3 -c "
import sys, json
data = json.loads(sys.stdin.read())
for author in data.get('data', []):
    name = author.get('name', 'N/A')
    avatar = author.get('avatar')
    has_avatar = '✅' if avatar else '❌'
    print(f'{has_avatar} {name}')
"
