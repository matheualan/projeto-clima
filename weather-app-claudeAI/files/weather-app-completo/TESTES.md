# 🧪 Casos de Teste - Weather App

Este documento descreve todos os casos de teste para garantir a qualidade e robustez do aplicativo.

---

## 📋 Índice

- [Testes Unitários (Backend)](#testes-unitários-backend)
- [Testes de Integração](#testes-de-integração)
- [Testes de Frontend](#testes-de-frontend)
- [Testes E2E](#testes-e2e)
- [Testes de Performance](#testes-de-performance)
- [Testes de Segurança](#testes-de-segurança)

---

## ✅ Testes Unitários (Backend)

### WeatherService

#### Teste 1: Busca bem-sucedida

**Descrição:** Verifica se o serviço retorna dados climáticos corretos quando a cidade é válida.

**Entrada:**
- Cidade: "São Paulo"

**Mocks:**
- Geocoding API retorna coordenadas válidas
- Weather API retorna dados climáticos válidos

**Resultado Esperado:**
```typescript
{
  city: "São Paulo",
  coordinates: { latitude: -23.5505, longitude: -46.6333 },
  current: {
    temperature: 25.5,
    windSpeed: 12.3,
    humidity: 65,
    weatherCode: 0,
    time: "2024-01-15T14:30:00"
  },
  timezone: "America/Sao_Paulo",
  units: { temperature: "°C", windSpeed: "km/h", humidity: "%" }
}
```

**Status:** ✅ Implementado

---

#### Teste 2: Cidade não encontrada

**Descrição:** Verifica se lança `NotFoundException` quando cidade não existe.

**Entrada:**
- Cidade: "CidadeInexistente123"

**Mocks:**
- Geocoding API retorna `{ results: [] }`

**Resultado Esperado:**
- Exceção: `NotFoundException`
- Mensagem: "Cidade \"CidadeInexistente123\" não encontrada..."

**Status:** ✅ Implementado

---

#### Teste 3: Timeout na Geocoding API

**Descrição:** Verifica tratamento de timeout na busca de coordenadas.

**Entrada:**
- Cidade: "São Paulo"

**Mocks:**
- Geocoding API simula erro de timeout (`ECONNABORTED`)

**Resultado Esperado:**
- Exceção: `RequestTimeoutException`
- Mensagem: "A busca por coordenadas demorou muito..."

**Status:** ✅ Implementado

---

#### Teste 4: Timeout na Weather API

**Descrição:** Verifica tratamento de timeout na busca de dados climáticos.

**Entrada:**
- Cidade: "São Paulo"

**Mocks:**
- Geocoding API: sucesso
- Weather API: timeout

**Resultado Esperado:**
- Exceção: `RequestTimeoutException`
- Mensagem: "A busca por dados climáticos demorou muito..."

**Status:** ✅ Implementado

---

#### Teste 5: Erro genérico na Geocoding API

**Descrição:** Verifica tratamento de erros de rede na Geocoding API.

**Entrada:**
- Cidade: "São Paulo"

**Mocks:**
- Geocoding API: erro de rede genérico

**Resultado Esperado:**
- Exceção: `BadGatewayException`
- Mensagem: "Erro ao comunicar com o serviço de geocodificação..."

**Status:** ✅ Implementado

---

#### Teste 6: Erro genérico na Weather API

**Descrição:** Verifica tratamento de erros de rede na Weather API.

**Entrada:**
- Cidade: "São Paulo"

**Mocks:**
- Geocoding API: sucesso
- Weather API: erro de rede

**Resultado Esperado:**
- Exceção: `BadGatewayException`
- Mensagem: "Erro ao comunicar com o serviço meteorológico..."

**Status:** ✅ Implementado

---

### WeatherController

#### Teste 7: Validação de query parameter vazio

**Descrição:** Verifica se retorna erro quando `city` está vazio.

**Requisição:**
```
GET /weather?city=
```

**Resultado Esperado:**
- Status: `400 Bad Request`
- Corpo:
```json
{
  "statusCode": 400,
  "message": "O nome da cidade é obrigatório",
  "error": "Bad Request"
}
```

**Status:** 🔄 A implementar (E2E)

---

#### Teste 8: Validação de cidade muito curta

**Descrição:** Verifica se rejeita cidades com menos de 2 caracteres.

**Requisição:**
```
GET /weather?city=A
```

**Resultado Esperado:**
- Status: `400 Bad Request`
- Mensagem: "O nome da cidade deve ter no mínimo 2 caracteres"

**Status:** 🔄 A implementar (E2E)

---

#### Teste 9: Validação de cidade muito longa

**Descrição:** Verifica se rejeita cidades com mais de 100 caracteres.

**Requisição:**
```
GET /weather?city=[string com 101+ caracteres]
```

**Resultado Esperado:**
- Status: `400 Bad Request`
- Mensagem: "O nome da cidade deve ter no máximo 100 caracteres"

**Status:** 🔄 A implementar (E2E)

---

#### Teste 10: Health check

**Descrição:** Verifica se endpoint de health check funciona.

**Requisição:**
```
GET /weather/health
```

**Resultado Esperado:**
- Status: `200 OK`
- Corpo:
```json
{
  "status": "ok",
  "timestamp": "[ISO timestamp]"
}
```

**Status:** 🔄 A implementar (E2E)

---

## 🔗 Testes de Integração

### Teste 11: Fluxo completo - Cidade válida

**Descrição:** Testa fluxo completo da aplicação com APIs reais.

**Entrada:**
- Cidade: "São Paulo"

**Etapas:**
1. Requisição ao backend
2. Backend consulta Geocoding API (real)
3. Backend consulta Weather API (real)
4. Backend retorna resposta formatada

**Resultado Esperado:**
- Status: `200 OK`
- Dados válidos com coordenadas e clima de São Paulo

**Status:** 🔄 A implementar

---

### Teste 12: Cidades com caracteres especiais

**Descrição:** Testa nomes de cidades com acentos e caracteres especiais.

**Entradas:**
- "São Paulo"
- "Rio de Janeiro"
- "Düsseldorf"
- "北京" (Pequim)

**Resultado Esperado:**
- Todas devem retornar dados válidos

**Status:** 🔄 A implementar

---

### Teste 13: Requisições simultâneas

**Descrição:** Verifica comportamento sob carga.

**Ação:**
- Enviar 10 requisições simultâneas para cidades diferentes

**Resultado Esperado:**
- Todas retornam com sucesso
- Sem race conditions ou erros

**Status:** 🔄 A implementar

---

## 🎨 Testes de Frontend

### Teste 14: Renderização inicial

**Descrição:** Verifica se componentes renderizam corretamente.

**Verificações:**
- Título "Previsão do Tempo" está presente
- Input de cidade está visível
- Botão "Buscar Previsão" está visível
- Mensagem de boas-vindas é exibida

**Status:** 🔄 A implementar (Jest + React Testing Library)

---

### Teste 15: Validação local - Campo vazio

**Descrição:** Verifica validação no frontend antes de enviar requisição.

**Ação:**
1. Clicar em "Buscar" sem digitar nada

**Resultado Esperado:**
- Mensagem de erro: "Por favor, digite o nome de uma cidade"
- Requisição NÃO é enviada ao backend

**Status:** 🔄 A implementar

---

### Teste 16: Validação local - Cidade muito curta

**Ação:**
1. Digitar "A"
2. Clicar em "Buscar"

**Resultado Esperado:**
- Mensagem de erro: "O nome da cidade deve ter entre 2 e 100 caracteres"
- Requisição NÃO é enviada

**Status:** 🔄 A implementar

---

### Teste 17: Estado de loading

**Ação:**
1. Digitar cidade válida
2. Clicar em "Buscar"
3. Verificar estado durante requisição

**Resultado Esperado:**
- Botão mostra "Buscando..." com spinner
- Botão está desabilitado
- LoadingSpinner é exibido
- Input está desabilitado

**Status:** 🔄 A implementar

---

### Teste 18: Exibição de dados de sucesso

**Ação:**
1. Buscar por "São Paulo"
2. Aguardar resposta

**Resultado Esperado:**
- WeatherCard é exibido
- Temperatura é mostrada
- Umidade é mostrada
- Velocidade do vento é mostrada
- Ícone do clima é exibido
- Coordenadas são mostradas

**Status:** 🔄 A implementar

---

### Teste 19: Exibição de erro

**Ação:**
1. Buscar por "CidadeInexistente999"
2. Aguardar resposta de erro

**Resultado Esperado:**
- ErrorMessage é exibido
- Mensagem de erro da API é mostrada
- Botão "Tentar novamente" está presente

**Status:** 🔄 A implementar

---

### Teste 20: Botão de retry

**Ação:**
1. Provocar erro
2. Clicar em "Tentar novamente"

**Resultado Esperado:**
- Estado volta para "idle"
- Mensagem de erro desaparece
- Formulário fica pronto para nova busca

**Status:** 🔄 A implementar

---

## 🚀 Testes E2E (End-to-End)

### Teste 21: Fluxo de usuário completo - Sucesso

**Ferramenta:** Cypress ou Playwright

**Cenário:**
1. Abrir aplicação
2. Digitar "São Paulo" no campo
3. Clicar em "Buscar Previsão"
4. Aguardar resultado
5. Verificar card de clima exibido

**Validações:**
- Todos os elementos esperados estão presentes
- Dados climáticos são válidos (temperatura > -50 e < 60)
- Não há erros no console

**Status:** 🔄 A implementar

---

### Teste 22: Fluxo de usuário - Cidade não encontrada

**Cenário:**
1. Abrir aplicação
2. Digitar "XYZ123INVALIDA"
3. Clicar em "Buscar"
4. Verificar mensagem de erro

**Validações:**
- Mensagem de erro é exibida
- Botão de retry está presente
- Não há crash da aplicação

**Status:** 🔄 A implementar

---

### Teste 23: Múltiplas buscas consecutivas

**Cenário:**
1. Buscar "São Paulo"
2. Aguardar resultado
3. Buscar "Rio de Janeiro"
4. Aguardar resultado
5. Buscar "Brasília"
6. Aguardar resultado

**Validações:**
- Todas as buscas retornam dados corretos
- Não há memória/vazamento de dados
- Performance se mantém consistente

**Status:** 🔄 A implementar

---

## ⚡ Testes de Performance

### Teste 24: Tempo de resposta médio

**Descrição:** Medir tempo de resposta do backend.

**Método:**
- Enviar 100 requisições para cidades diversas
- Calcular tempo médio de resposta

**Resultado Esperado:**
- Tempo médio < 2 segundos
- 95% das requisições < 3 segundos

**Status:** 🔄 A implementar

---

### Teste 25: Carga (Load Testing)

**Descrição:** Testar comportamento sob carga.

**Método:**
- Simular 50 usuários simultâneos
- Cada um faz 10 requisições

**Resultado Esperado:**
- Taxa de erro < 1%
- Tempo de resposta médio < 3 segundos
- Sem crashes do servidor

**Status:** 🔄 A implementar (Artillery ou k6)

---

### Teste 26: Bundle size do frontend

**Descrição:** Verificar tamanho do JavaScript gerado.

**Método:**
```bash
npm run build
```

**Resultado Esperado:**
- Bundle principal < 200KB (gzipped)
- Lighthouse score > 90

**Status:** 🔄 A implementar

---

## 🔒 Testes de Segurança

### Teste 27: SQL Injection (preventivo)

**Descrição:** Verificar que entrada não permite SQL injection.

**Entrada:**
```
city=' OR '1'='1
```

**Resultado Esperado:**
- Entrada é tratada como string literal
- Nenhum comportamento inesperado

**Status:** ✅ Protegido (validação com class-validator)

---

### Teste 28: XSS (Cross-Site Scripting)

**Descrição:** Verificar proteção contra XSS.

**Entrada:**
```
city=<script>alert('XSS')</script>
```

**Resultado Esperado:**
- Script não é executado
- React escapa automaticamente

**Status:** ✅ Protegido (React sanitiza por padrão)

---

### Teste 29: CORS

**Descrição:** Verificar configuração CORS.

**Ação:**
- Tentar acessar API de origem não autorizada

**Resultado Esperado:**
- Requisição bloqueada pelo navegador
- Apenas origins em `CORS_ORIGINS` têm acesso

**Status:** ✅ Implementado

---

### Teste 30: Rate Limiting

**Descrição:** Verificar proteção contra abuso.

**Ação:**
- Enviar 1000 requisições em 1 minuto

**Resultado Esperado:**
- Requisições são limitadas após threshold
- Retorna `429 Too Many Requests`

**Status:** 🔄 A implementar (NestJS Throttler)

---

## 📊 Cobertura de Testes

### Meta de Cobertura

- **Testes Unitários:** > 80%
- **Testes de Integração:** > 60%
- **Testes E2E:** Fluxos principais cobertos

### Executar Coverage

```bash
cd weather-app-backend
npm run test:cov
```

**Saída esperada:**

```
----------|---------|----------|---------|---------|
File      | % Stmts | % Branch | % Funcs | % Lines |
----------|---------|----------|---------|---------|
All files |   85.71 |    78.57 |   90.00 |   85.00 |
----------|---------|----------|---------|---------|
```

---

## 🛠️ Ferramentas Recomendadas

### Backend
- **Jest**: Framework de testes
- **Supertest**: Testes de API REST
- **Artillery**: Testes de carga

### Frontend
- **Jest**: Testes unitários
- **React Testing Library**: Testes de componentes
- **Cypress**: Testes E2E
- **Playwright**: Testes E2E (alternativa)

### Performance
- **Lighthouse**: Análise de performance
- **k6**: Testes de carga
- **WebPageTest**: Análise de carregamento

---

## ✅ Checklist de Testes

Antes de fazer deploy em produção, certifique-se de que:

- [ ] Todos os testes unitários passam
- [ ] Cobertura de testes > 80%
- [ ] Testes de integração com API real passam
- [ ] Validações de entrada funcionam corretamente
- [ ] Tratamento de erros está adequado
- [ ] Performance atende requisitos (< 2s resposta)
- [ ] Bundle size está otimizado (< 200KB)
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente em produção configuradas
- [ ] Health check endpoint funciona
- [ ] Logs estão funcionando
- [ ] Não há console.log em produção
- [ ] Documentação está atualizada

---

**🎯 Próximos Passos:** Implementar testes E2E com Cypress e configurar CI/CD com GitHub Actions para executar testes automaticamente.
