#!/bin/bash

# Script para solucionar errores de TypeScript
# Ejecutar desde la raíz del proyecto

echo "🔧 Solucionando errores de TypeScript..."
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar que estamos en la raíz
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Ejecuta desde la raíz del proyecto${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Paso 1: Reinstalando dependencias...${NC}"
pnpm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencias instaladas${NC}"
echo ""

echo -e "${YELLOW}🔨 Paso 2: Compilando @repo/config...${NC}"
cd packages/config
pnpm build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al compilar @repo/config${NC}"
    echo -e "${YELLOW}   Revisa el archivo docs/ERRORES_Y_SOLUCIONES.md${NC}"
    cd ../..
    exit 1
fi
cd ../..
echo -e "${GREEN}✅ @repo/config compilado${NC}"
echo ""

echo -e "${YELLOW}🔨 Paso 3: Compilando @repo/core...${NC}"
cd packages/core
pnpm build
cd ../..
echo -e "${GREEN}✅ @repo/core compilado${NC}"
echo ""

echo -e "${YELLOW}🔨 Paso 4: Compilando @repo/data...${NC}"
cd packages/data
pnpm build
cd ../..
echo -e "${GREEN}✅ @repo/data compilado${NC}"
echo ""

echo -e "${YELLOW}🧪 Paso 5: Verificando errores de linting...${NC}"
pnpm lint 2>&1 | head -20
echo ""

echo -e "${GREEN}✅ Proceso completado${NC}"
echo ""
echo -e "${YELLOW}📖 Si siguen apareciendo errores, lee:${NC}"
echo "   docs/ERRORES_Y_SOLUCIONES.md"
echo ""
echo -e "${YELLOW}🚀 Para iniciar la API:${NC}"
echo "   pnpm dev:api"
