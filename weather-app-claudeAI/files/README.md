# 🌤️ Weather App - Aplicativo de Previsão do Tempo

Aplicativo full-stack profissional de previsão do tempo com **NestJS** (backend), **React** + **TypeScript** (frontend) e integração com a **Open-Meteo API**.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Stack Tecnológica](#-stack-tecnológica)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [API Endpoints](#-api-endpoints)
- [Exemplo de Uso](#-exemplo-de-uso)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Melhorias Futuras](#-melhorias-futuras)
- [Licença](#-licença)

---

## 🎯 Visão Geral

Este projeto é um aplicativo de previsão do tempo que permite aos usuários pesquisar informações climáticas de qualquer cidade do mundo. O sistema utiliza a API gratuita **Open-Meteo** para obter dados precisos e atualizados.

### Fluxo de Funcionamento

1. Usuário digita o nome de uma cidade no frontend
2. Frontend valida a entrada e envia requisição ao backend
3. Backend busca coordenadas geográficas via **Geocoding API**
4. Backend usa coordenadas para buscar dados climáticos via **Weather API**
5. Backend formata e retorna os dados ao frontend
6. Frontend exibe informações de forma clara e visual

---

## 🛠️ Stack Tecnológica

### Backend
- **NestJS** - Framework Node.js progressivo
- **TypeScript** - Superset JavaScript com tipagem estática
- **TypeORM** - ORM para banco de dados (preparado para uso futuro)
- **Axios** / **HttpModule** - Cliente HTTP
- **class-validator** + **class-transformer** - Validação de dados
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP

### API Externa
- **Open-Meteo** - API gratuita de dados meteorológicos
  - Geocoding API (conversão cidade → coordenadas)
  - Weather Forecast API (dados climáticos)

---

## ✨ Funcionalidades

### MVP (Minimum Viable Product)

✅ **Backend**
- Endpoint REST: `GET /weather?city=NomeDaCidade`
- Validação robusta de entrada com DTOs
- Tratamento completo de erros (cidade não encontrada, timeout, falhas de rede)
- Logging estruturado para debug
- Arquitetura em camadas (controller → service → external API)
- Health check endpoint

✅ **Frontend**
- Campo de busca com validação em tempo real
- Estados visuais claros: loading, success, error
- Card responsivo com dados climáticos
- Feedback amigável ao usuário
- Design moderno com Tailwind CSS
- Componentização reutilizável

✅ **Dados Exibidos**
- 🌡️ Temperatura atual
- 💨 Velocidade do vento
- 💧 Umidade relativa
- 🌤️ Condição climática (ícone e descrição)
- 📍 Coordenadas geográficas
- 🌍 Fuso horário
- 🕐 Data e hora da medição

---

## 📦 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

Verificar versões:

```bash
node --version  # v18.x ou superior
npm --version   # v9.x ou superior
```

---

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/weather-app.git
cd weather-app
```

### 2. Instalar Dependências do Backend

```bash
cd weather-app-backend
npm install
```

### 3. Instalar Dependências do Frontend

```bash
cd ../weather-app-frontend
npm install
```

### 4. Configurar Variáveis de Ambiente

**Backend:**

```bash
cd weather-app-backend
cp .env.example .env
```

Edite o arquivo `.env` se necessário (valores padrão funcionam localmente).

**Frontend:**

```bash
cd weather-app-frontend
cp .env.example .env
```

O arquivo `.env` contém:

```env
VITE_API_URL=http://localhost:3001
```

---

## ▶️ Como Executar

### Modo Desenvolvimento

**1. Iniciar o Backend** (Terminal 1)

```bash
cd weather-app-backend
npm run start:dev
```

✅ Backend rodando em: `http://localhost:3001`

**2. Iniciar o Frontend** (Terminal 2)

```bash
cd weather-app-frontend
npm run dev
```

✅ Frontend rodando em: `http://localhost:3000`

### Modo Produção

**Backend:**

```bash
cd weather-app-backend
npm run build
npm run start:prod
```

**Frontend:**

```bash
cd weather-app-frontend
npm run build
npm run preview
```

---

## 📁 Estrutura do Projeto

### Backend (NestJS)

```
weather-app-backend/
├── src/
│   ├── common/
│   │   └── filters/
│   │       └── http-exception.filter.ts    # Filtro global de exceções
│   ├── weather/
│   │   ├── dto/
│   │   │   ├── weather-query.dto.ts        # DTO de entrada (validação)
│   │   │   └── weather-response.dto.ts     # DTO de saída
│   │   ├── interfaces/
│   │   │   └── open-meteo.interface.ts     # Tipos da API externa
│   │   ├── weather.controller.ts           # Controller REST
│   │   ├── weather.service.ts              # Lógica de negócio
│   │   ├── weather.module.ts               # Módulo NestJS
│   │   └── weather.service.spec.ts         # Testes unitários
│   ├── app.module.ts                       # Módulo raiz
│   └── main.ts                             # Bootstrap da aplicação
├── .env.example                            # Template de variáveis
├── package.json
└── tsconfig.json
```

### Frontend (React)

```
weather-app-frontend/
├── src/
│   ├── components/
│   │   ├── Button.tsx                      # Botão reutilizável
│   │   ├── Input.tsx                       # Input reutilizável
│   │   ├── SearchForm.tsx                  # Formulário de busca
│   │   ├── WeatherCard.tsx                 # Card de dados climáticos
│   │   ├── LoadingSpinner.tsx              # Spinner de loading
│   │   └── ErrorMessage.tsx                # Mensagem de erro
│   ├── services/
│   │   └── weather.service.ts              # Cliente HTTP da API
│   ├── types/
│   │   └── weather.types.ts                # Tipos TypeScript
│   ├── utils/
│   │   └── weather.utils.ts                # Funções auxiliares
│   ├── App.tsx                             # Componente principal
│   ├── main.tsx                            # Entry point
│   └── index.css                           # Estilos globais
├── index.html
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🔐 Variáveis de Ambiente

### Backend (.env)

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3001` | Porta do servidor backend |
| `NODE_ENV` | `development` | Ambiente de execução |
| `GEOCODING_API_URL` | `https://geocoding-api.open-meteo.com/v1/search` | URL da Geocoding API |
| `WEATHER_API_URL` | `https://api.open-meteo.com/v1/forecast` | URL da Weather API |
| `API_TIMEOUT` | `5000` | Timeout das requisições (ms) |
| `CORS_ORIGINS` | `http://localhost:3000` | URLs permitidas pelo CORS |

### Frontend (.env)

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `VITE_API_URL` | `http://localhost:3001` | URL do backend |

---

## 🌐 API Endpoints

### GET /weather

Busca previsão do tempo por cidade.

**Query Parameters:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `city` | string | Sim | Nome da cidade (2-100 caracteres) |

**Exemplo de Requisição:**

```bash
GET http://localhost:3001/weather?city=São Paulo
```

**Resposta de Sucesso (200 OK):**

```json
{
  "city": "São Paulo",
  "coordinates": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "current": {
    "temperature": 25.5,
    "windSpeed": 12.3,
    "humidity": 65,
    "weatherCode": 0,
    "time": "2024-01-15T14:30:00"
  },
  "timezone": "America/Sao_Paulo",
  "units": {
    "temperature": "°C",
    "windSpeed": "km/h",
    "humidity": "%"
  }
}
```

### GET /weather/health

Health check do serviço.

**Resposta (200 OK):**

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T14:30:00.000Z"
}
```

---

## 💡 Exemplo de Uso

### cURL

```bash
# Buscar clima de São Paulo
curl "http://localhost:3001/weather?city=São Paulo"

# Buscar clima do Rio de Janeiro
curl "http://localhost:3001/weather?city=Rio de Janeiro"
```

### JavaScript (Fetch API)

```javascript
async function getWeather(city) {
  try {
    const response = await fetch(
      `http://localhost:3001/weather?city=${encodeURIComponent(city)}`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar clima');
    }
    
    const data = await response.json();
    console.log(`${data.city}: ${data.current.temperature}${data.units.temperature}`);
  } catch (error) {
    console.error(error.message);
  }
}

getWeather('São Paulo');
```

---

## ⚠️ Tratamento de Erros

### Erros do Backend

| Código | Erro | Descrição |
|--------|------|-----------|
| `400` | Bad Request | Parâmetros inválidos (cidade vazia, muito curta, etc.) |
| `404` | Not Found | Cidade não encontrada na API de geocodificação |
| `408` | Request Timeout | Timeout ao consultar APIs externas |
| `502` | Bad Gateway | Erro ao comunicar com APIs externas |
| `500` | Internal Server Error | Erro inesperado no servidor |

**Exemplo de Resposta de Erro:**

```json
{
  "statusCode": 404,
  "timestamp": "2024-01-15T14:30:00.000Z",
  "path": "/weather?city=CidadeInexistente",
  "message": "Cidade \"CidadeInexistente\" não encontrada. Verifique o nome e tente novamente.",
  "error": "Not Found"
}
```

### Mensagens de Erro Amigáveis (Frontend)

- ❌ **Cidade vazia**: "Por favor, digite o nome de uma cidade"
- ❌ **Cidade muito curta/longa**: "O nome da cidade deve ter entre 2 e 100 caracteres"
- ❌ **Cidade não encontrada**: Mensagem retornada pela API
- ❌ **Timeout**: "A requisição demorou muito. Verifique sua conexão e tente novamente."
- ❌ **Sem conexão**: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."

---

## 🧪 Testes

### Backend - Testes Unitários

O projeto inclui testes para o `WeatherService` cobrindo:

✅ Busca bem-sucedida de dados climáticos  
❌ Cidade não encontrada (404)  
❌ Timeout na API de geocodificação (408)  
❌ Timeout na API de clima (408)  
❌ Erro genérico nas APIs (502)

**Executar testes:**

```bash
cd weather-app-backend

# Executar todos os testes
npm test

# Executar com coverage
npm run test:cov

# Executar em modo watch
npm run test:watch
```

**Exemplo de saída:**

```
PASS  src/weather/weather.service.spec.ts
  WeatherService
    ✓ deve estar definido
    getWeatherByCity - Sucesso
      ✓ deve retornar dados climáticos quando cidade é válida
    getWeatherByCity - Cidade não encontrada
      ✓ deve lançar NotFoundException quando cidade não existe
    getWeatherByCity - Timeout Geocoding
      ✓ deve lançar RequestTimeoutException quando geocoding timeout
    ...

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

### Casos de Teste Sugeridos (E2E)

Para testes end-to-end completos, considere implementar:

1. **Teste de integração completo**
   - Requisição → Backend → API Externa → Resposta

2. **Teste de casos extremos**
   - Nomes de cidades com caracteres especiais (São Paulo, Düsseldorf, 北京)
   - Cidades com nomes muito longos
   - Múltiplas requisições simultâneas

3. **Teste de rate limiting**
   - Verificar comportamento sob carga
   - Simular limite de requisições da API externa

4. **Teste de timeout configurável**
   - Alterar timeout via .env e verificar comportamento

---

## 🚀 Deploy

### Backend (Opções)

**1. Railway.app** (Recomendado)

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Criar projeto
railway init

# Deploy
railway up
```

**2. Render.com**

- Conectar repositório GitHub
- Configurar como "Web Service"
- Build Command: `npm install && npm run build`
- Start Command: `npm run start:prod`

**3. Heroku**

```bash
heroku create weather-app-backend
git push heroku main
```

### Frontend (Opções)

**1. Vercel** (Recomendado para React)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
cd weather-app-frontend
vercel
```

**2. Netlify**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
cd weather-app-frontend
netlify deploy --prod
```

### Variáveis de Ambiente em Produção

**Backend:**
- Atualizar `CORS_ORIGINS` com URL do frontend em produção
- Ajustar `PORT` se necessário

**Frontend:**
- Atualizar `VITE_API_URL` com URL do backend em produção

---

## 🔮 Melhorias Futuras

### Funcionalidades

- [ ] **Previsão estendida**: Dados para múltiplos dias (7 dias)
- [ ] **Comparação de cidades**: Exibir clima de múltiplas cidades lado a lado
- [ ] **Histórico de buscas**: Salvar últimas cidades pesquisadas (LocalStorage)
- [ ] **Geolocalização**: Detectar localização automática do usuário
- [ ] **Gráficos**: Visualização de temperatura/umidade ao longo do dia
- [ ] **Unidades customizáveis**: Permitir trocar °C/°F, km/h/mph
- [ ] **Alertas climáticos**: Notificações de condições extremas
- [ ] **Modo offline**: Cache de dados com Service Workers

### Técnicas

- [ ] **Cache de requisições**: Redis ou cache in-memory para reduzir chamadas à API
- [ ] **Rate limiting**: Limitar requisições por IP
- [ ] **Autenticação**: Sistema de login para recursos premium
- [ ] **Internacionalização (i18n)**: Suporte a múltiplos idiomas
- [ ] **Dark mode**: Tema escuro no frontend
- [ ] **PWA**: Transformar em Progressive Web App
- [ ] **Testes E2E**: Cypress ou Playwright
- [ ] **CI/CD**: Pipeline automatizado (GitHub Actions)
- [ ] **Monitoramento**: Sentry para tracking de erros
- [ ] **Analytics**: Google Analytics ou Plausible

### Performance

- [ ] **Lazy loading**: Carregar componentes sob demanda
- [ ] **Image optimization**: Otimizar ícones e assets
- [ ] **Code splitting**: Dividir bundle para carregamento mais rápido
- [ ] **Server-side rendering**: Next.js para melhor SEO

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para demonstrar boas práticas de desenvolvimento full-stack.

- **GitHub**: [seu-usuario](https://github.com/seu-usuario)
- **LinkedIn**: [seu-perfil](https://linkedin.com/in/seu-perfil)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📞 Suporte

Encontrou um bug ou tem uma sugestão?

- Abra uma [issue](https://github.com/seu-usuario/weather-app/issues)
- Entre em contato: seu-email@example.com

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!**
