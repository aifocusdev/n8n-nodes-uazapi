# 🔧 Correções Rápidas - n8n-nodes-uazapi

## ✅ Erro Corrigido: `Cannot find type definition file for 'node'`

### O Problema
O TypeScript estava reclamando que não encontrava as definições de tipos do Node.js.

### A Solução
Adicionei `@types/node` ao `package.json`.

---

## 🚀 Como Instalar e Compilar Agora

### Passo 1: Instalar Dependências

```bash
cd /mnt/c/Users/pauly/Documents/n8n-nodes-uazapi

# Instalar todas as dependências (incluindo @types/node)
npm install
```

Isso vai instalar:
- `@types/node` ✅ (tipos do Node.js)
- `typescript` ✅ (compilador)
- `n8n-workflow` ✅ (tipos do n8n)
- `eslint` + `prettier` ✅ (linting)
- `gulp` ✅ (build)
- E todas as outras dependências

### Passo 2: Compilar o Projeto

```bash
# Build completo
npm run build
```

Ou em modo watch (recompila automaticamente):

```bash
npm run dev
```

### Passo 3: Verificar se Compilou

Se tudo der certo, você verá:
```
✓ Compilação concluída sem erros
✓ Pasta dist/ criada
✓ Arquivos .js e .d.ts gerados
```

---

## 📦 Estrutura Após Build

```
n8n-nodes-uazapi/
├── dist/                           ← GERADO PELO BUILD
│   ├── credentials/
│   │   ├── UazApiApi.credentials.js
│   │   └── UazApiApi.credentials.d.ts
│   └── nodes/
│       └── UazApi/
│           ├── UazApi.node.js
│           ├── UazApi.node.d.ts
│           └── uazapi.svg
├── credentials/                    ← CÓDIGO FONTE
│   └── UazApiApi.credentials.ts
├── nodes/                          ← CÓDIGO FONTE
│   └── UazApi/
│       ├── UazApi.node.ts
│       └── uazapi.svg
└── package.json
```

---

## 🧪 Testar Localmente

### Método 1: npm link (Recomendado)

```bash
# No diretório do projeto
npm link

# No diretório do n8n
cd ~/.n8n/custom-nodes  # Ou onde seu n8n está
npm link n8n-nodes-uazapi

# Reiniciar n8n
n8n restart
```

### Método 2: Instalação Manual

```bash
# Empacotar
npm pack
# Isso cria: n8n-nodes-uazapi-1.0.0.tgz

# Instalar no n8n
cd ~/.n8n
npm install /caminho/para/n8n-nodes-uazapi-1.0.0.tgz

# Reiniciar n8n
n8n restart
```

---

## ❌ Outros Erros Comuns

### Erro: `Cannot find module 'n8n-workflow'`

**Solução:**
```bash
npm install n8n-workflow@latest --save-dev
```

### Erro: `eslint-plugin-n8n-nodes-base not found`

**Solução:**
```bash
npm install eslint-plugin-n8n-nodes-base --save-dev
```

### Erro: `gulp: command not found`

**Solução:**
```bash
npm install -g gulp-cli
# Ou use npx:
npx gulp build:icons
```

### Erro: TypeScript muito lento

**Solução:**
Adicione ao `tsconfig.json`:
```json
{
  "compilerOptions": {
    "incremental": true,
    "skipLibCheck": true
  }
}
```

---

## 🎯 Checklist de Verificação

Antes de publicar, verifique:

- [ ] `npm install` sem erros
- [ ] `npm run build` compila com sucesso
- [ ] Pasta `dist/` foi criada
- [ ] `npm run lint` sem erros críticos
- [ ] Testou localmente com `npm link`
- [ ] Node aparece no n8n
- [ ] Consegue criar credenciais
- [ ] Consegue executar uma operação

---

## 🚀 Comandos Úteis

```bash
# Limpar e reconstruir
rm -rf dist/ node_modules/
npm install
npm run build

# Verificar dependências
npm list --depth=0

# Verificar versões
npm view n8n-workflow version
npm view typescript version

# Atualizar dependências
npm update

# Ver tamanho do pacote
npm pack --dry-run
```

---

## 📝 Status Atual

✅ **Erro corrigido!**
✅ **@types/node adicionado**
✅ **Pronto para instalar dependências**
✅ **Pronto para compilar**

---

## 🎉 Próximo Passo

Execute agora:

```bash
cd /mnt/c/Users/pauly/Documents/n8n-nodes-uazapi
npm install
```

Isso deve instalar tudo e você poderá compilar sem erros! 🚀