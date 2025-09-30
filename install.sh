#!/bin/bash

# Script de instalação automática - n8n-nodes-uazapi
# Execute: bash install.sh

set -e  # Parar em caso de erro

echo "🚀 Instalando n8n-nodes-uazapi..."
echo ""

# Verificar Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js $NODE_VERSION detectado. Recomendamos Node.js 18+"
fi

echo "✅ Node.js $(node -v) detectado"
echo ""

# Verificar npm
echo "📦 Verificando npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado."
    exit 1
fi

echo "✅ npm $(npm -v) detectado"
echo ""

# Instalar dependências
echo "📥 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi
echo ""

# Build
echo "🔨 Compilando projeto..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
else
    echo "❌ Erro na compilação"
    exit 1
fi
echo ""

# Verificar dist
if [ -d "dist" ]; then
    echo "✅ Pasta dist/ criada"
    echo "   Arquivos gerados:"
    ls -lh dist/credentials/*.js dist/nodes/UazApi/*.js 2>/dev/null | awk '{print "   - "$9" ("$5")"}'
else
    echo "⚠️  Pasta dist/ não encontrada"
fi
echo ""

# Linkar (opcional)
echo "🔗 Deseja linkar o node localmente para testar? (s/n)"
read -r LINK

if [ "$LINK" = "s" ] || [ "$LINK" = "S" ]; then
    npm link
    echo "✅ Node linkado! Execute em outro terminal:"
    echo "   cd ~/.n8n"
    echo "   npm link n8n-nodes-uazapi"
    echo "   n8n restart"
fi
echo ""

# Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Próximos passos:"
echo "   1. Testar localmente: npm link"
echo "   2. Rodar em dev mode: npm run dev"
echo "   3. Publicar no NPM: npm publish"
echo ""
echo "📖 Leia NEXT_STEPS.md para mais informações"
echo ""