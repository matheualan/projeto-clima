# 🚀 Guia de Início Rápido - Weather App

## ⚡ Instalação e Execução em 5 Minutos

### Pré-requisitos
- Node.js 18+ instalado
- npm 9+ instalado

### Passo 1: Baixar o Projeto

Se você recebeu os arquivos compactados, extraia-os. Caso contrário, clone o repositório:

```bash
git clone <url-do-repositorio>
cd weather-app
```

### Passo 2: Configurar Backend

```bash
# Navegar para pasta do backend
cd weather-app-backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Iniciar servidor de desenvolvimento
npm run start:dev
```

✅ **Backend rodando em:** `http://localhost:3001`

### Passo 3: Configurar Frontend (em outro terminal)

```bash
# Navegar para pasta do frontend (a partir da raiz)
cd weather-app-frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Iniciar servidor de desenvolvimento
npm run dev
```

✅ **Frontend rodando em:** `http://localhost:3000`

### Passo 4: Testar a Aplicação

1. Abra o navegador em `http://localhost:3000`
2. Digite uma cidade (ex: "São Paulo")
3. Clique em "Buscar Previsão"
4. Veja os dados climáticos! 🌤️

---

## 🧪 Executar Testes

### Backend

```bash
cd weather-app-backend
npm test
```

---

## 🐛 Problemas Comuns

### Erro: "EADDRINUSE: address already in use"

**Causa:** Porta 3001 ou 3000 já está em uso.

**Solução:**
```bash
# Linux/Mac - matar processo na porta
lsof -ti:3001 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Windows - matar processo na porta
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Ou altere as portas:**
- Backend: edite `PORT` no arquivo `.env`
- Frontend: edite `vite.config.ts` (linha `port: 3000`)

---

### Erro: "Cannot find module"

**Causa:** Dependências não instaladas.

**Solução:**
```bash
# Deletar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

### Backend não conecta com APIs externas

**Causa:** Firewall ou proxy bloqueando requisições.

**Solução:**
1. Verifique sua conexão com internet
2. Tente desativar temporariamente firewall/antivírus
3. Configure proxy se necessário

---

### Frontend não consegue se conectar ao backend

**Causa:** URL incorreta ou backend não está rodando.

**Solução:**
1. Verifique se backend está rodando (`http://localhost:3001/weather/health`)
2. Confirme `VITE_API_URL` no arquivo `.env` do frontend
3. Verifique CORS no backend (arquivo `main.ts`)

---

## 📚 Próximos Passos

- Leia o [README.md](README.md) completo para documentação detalhada
- Veja os [Casos de Teste](TESTES.md) para entender a cobertura
- Explore melhorias futuras no README

---

## 💬 Suporte

Problemas não resolvidos? Abra uma issue no GitHub ou entre em contato.

**Bom desenvolvimento! 🚀**
