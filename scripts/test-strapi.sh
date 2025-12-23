#!/bin/bash

echo "🧪 E&M Software System - Test Strapi Migration"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Strapi is running
echo "📡 Checking Strapi connection..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/services | grep -q "200\|403"; then
    echo -e "${GREEN}✅ Strapi is running${NC}"
else
    echo -e "${RED}❌ Strapi is not running${NC}"
    echo ""
    echo "Please start Strapi with:"
    echo "  npm run strapi"
    echo ""
    exit 1
fi

echo ""
echo "🔍 Testing Services API..."

# Test Services
SERVICES_COUNT=$(curl -s http://localhost:1337/api/services | grep -o '"data":\[' | wc -l)
if [ "$SERVICES_COUNT" -gt 0 ]; then
    TOTAL_SERVICES=$(curl -s 'http://localhost:1337/api/services?pagination[pageSize]=100' | grep -o '"id":' | wc -l)
    echo -e "${GREEN}✅ Services API working - Found $TOTAL_SERVICES services${NC}"
else
    echo -e "${RED}❌ Services API not working${NC}"
fi

echo ""
echo "🔍 Testing Projects API..."

# Test Projects
PROJECTS_COUNT=$(curl -s http://localhost:1337/api/projects | grep -o '"data":\[' | wc -l)
if [ "$PROJECTS_COUNT" -gt 0 ]; then
    TOTAL_PROJECTS=$(curl -s 'http://localhost:1337/api/projects?pagination[pageSize]=100' | grep -o '"id":' | wc -l)
    echo -e "${GREEN}✅ Projects API working - Found $TOTAL_PROJECTS projects${NC}"
else
    echo -e "${RED}❌ Projects API not working${NC}"
fi

echo ""
echo "🔍 Testing specific Service (web-development)..."

SERVICE_TEST=$(curl -s 'http://localhost:1337/api/services?filters[slug][$eq]=web-development' | grep -o '"slug":"web-development"')
if [ -n "$SERVICE_TEST" ]; then
    echo -e "${GREEN}✅ Service detail API working${NC}"
else
    echo -e "${YELLOW}⚠️  Service 'web-development' not found${NC}"
fi

echo ""
echo "🔍 Testing specific Project (ecommerce-platform)..."

PROJECT_TEST=$(curl -s 'http://localhost:1337/api/projects?filters[slug][$eq]=ecommerce-platform' | grep -o '"slug":"ecommerce-platform"')
if [ -n "$PROJECT_TEST" ]; then
    echo -e "${GREEN}✅ Project detail API working${NC}"
else
    echo -e "${YELLOW}⚠️  Project 'ecommerce-platform' not found${NC}"
fi

echo ""
echo "🔍 Testing Upload/Media API..."

UPLOAD_TEST=$(curl -s http://localhost:1337/api/upload/files | grep -o '"data":\[' | wc -l)
if [ "$UPLOAD_TEST" -gt 0 ]; then
    TOTAL_FILES=$(curl -s 'http://localhost:1337/api/upload/files?pagination[pageSize]=100' | grep -o '"id":' | wc -l)
    echo -e "${GREEN}✅ Upload API working - Found $TOTAL_FILES files${NC}"
else
    echo -e "${YELLOW}⚠️  No uploaded files found (migration may not have run yet)${NC}"
fi

echo ""
echo "=============================================="
echo "📊 Summary:"
echo ""

if [ "$SERVICES_COUNT" -gt 0 ] && [ "$PROJECTS_COUNT" -gt 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Your Strapi is configured correctly.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Check data in Strapi admin: http://localhost:1337/admin"
    echo "  2. If data is missing, run: npm run migrate"
    echo "  3. Test the frontend: npm run dev"
else
    echo -e "${YELLOW}⚠️  Some issues detected${NC}"
    echo ""
    echo "Possible solutions:"
    echo "  1. Check Strapi permissions (Settings > Roles > Public)"
    echo "  2. Run migration: npm run migrate"
    echo "  3. Check Strapi logs for errors"
fi

echo ""
