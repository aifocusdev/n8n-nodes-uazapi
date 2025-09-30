# 🚀 Guia de Instalação Rápida - n8n-nodes-uazapi

## 📦 Pré-requisitos

- Node.js 18+ instalado
- n8n instalado e rodando
- Conta na UazAPI (https://focus.uazapi.com)

## 🔧 Instalação

### Método 1: Via Interface do n8n (RECOMENDADO)

1. Acesse seu n8n (http://localhost:5678)
2. Vá em **Settings** (⚙️) → **Community Nodes**
3. Clique em **Install**
4. Digite: `n8n-nodes-uazapi`
5. Clique em **Install**
6. Aguarde a instalação
7. Reinicie o n8n

### Método 2: Via NPM (Manual)

```bash
# Se instalou n8n globalmente
npm install -g n8n-nodes-uazapi

# Se instalou n8n localmente
cd ~/.n8n
npm install n8n-nodes-uazapi

# Reiniciar n8n
n8n restart
```

### Método 3: Docker

Edite seu `docker-compose.yml`:

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
    volumes:
      - ~/.n8n:/home/node/.n8n
    command: /bin/sh -c "cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-uazapi && n8n start"
```

## 🔐 Configurar Credenciais

### Passo 1: Obter Tokens da UazAPI

1. Acesse https://focus.uazapi.com
2. Faça login ou crie uma conta
3. Copie seu **Admin Token** (Settings → API Keys)
4. Crie uma instância e copie o **Instance Token**

### Passo 2: Configurar no n8n

1. Crie um novo workflow
2. Adicione o node **UazAPI**
3. Clique em **Select Credentials** → **Create New**
4. Preencha:
   ```
   Base URL: https://focus.uazapi.com
   Admin Token: seu-admin-token-aqui
   Instance Token: seu-instance-token-aqui
   ```
5. Clique em **Save**

## ✅ Testar Instalação

### Teste 1: Verificar Node Disponível

1. Crie novo workflow
2. Clique em **Add Node** (+)
3. Busque por "UazAPI"
4. ✅ Se aparecer, instalação OK!

### Teste 2: Listar Instâncias

1. Adicione node **UazAPI**
2. Configure credenciais
3. Selecione:
   ```
   Resource: Instance
   Operation: List All
   ```
4. Clique em **Execute Node**
5. ✅ Se retornar lista, está funcionando!

### Teste 3: Enviar Mensagem Teste

1. Adicione node **UazAPI**
2. Selecione:
   ```
   Resource: Message
   Operation: Send Text
   Number: seu-numero-teste
   Text: Teste do n8n-nodes-uazapi funcionando!
   ```
3. Execute
4. ✅ Verifique se recebeu a mensagem!

## 🐛 Problemas Comuns

### ❌ "Node not found"

**Solução:**
```bash
# Limpar cache do n8n
rm -rf ~/.n8n/cache/

# Reinstalar
npm install -g n8n-nodes-uazapi

# Reiniciar n8n
n8n restart
```

### ❌ "Credenciais inválidas"

**Verificar:**
- ✅ Admin Token está correto
- ✅ Instance Token está correto
- ✅ URL base é `https://focus.uazapi.com`

### ❌ "Cannot connect to API"

**Verificar:**
- ✅ Firewall não está bloqueando
- ✅ Internet funcionando
- ✅ API UazAPI está online (status.uazapi.com)

### ❌ Node não aparece após instalação

**Solução:**
```bash
# Verificar se foi instalado
npm list -g n8n-nodes-uazapi

# Se não aparecer, instalar novamente
npm install -g n8n-nodes-uazapi --force

# Reiniciar n8n completamente
killall node
n8n start
```

## 🔄 Atualizar para Nova Versão

```bash
# Via npm
npm update -g n8n-nodes-uazapi

# Via n8n UI
Settings → Community Nodes → n8n-nodes-uazapi → Update

# Reiniciar
n8n restart
```

## 🚀 Próximos Passos

1. ✅ Instalação completa
2. 📖 Ler [README.md](README.md) para exemplos
3. 🎯 Criar seu primeiro workflow
4. 🤖 Explorar recursos de chatbot IA
5. 📊 Configurar campanhas em massa

## 💬 Suporte

- **Problemas:** https://github.com/seu-usuario/n8n-nodes-uazapi/issues
- **Documentação:** https://github.com/seu-usuario/n8n-nodes-uazapi
- **Email:** seu@email.com

---

**Instalação bem-sucedida?** Comece criando seu primeiro workflow! 🎉