# ☁️ Aplicativo de Clima (NestJS + React)

## Visão Geral do Projeto

Este projeto é um aplicativo de clima simples que permite aos usuários buscar informações meteorológicas de uma cidade específica. Ele é construído como um **monorepo**, utilizando **NestJS** para o backend (API) e **React** para o frontend (interface do usuário). O objetivo é demonstrar uma arquitetura moderna e escalável para aplicações full-stack, com uma clara separação de responsabilidades e integração com uma API externa de dados meteorológicos.

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

- `backend/`: Contém a aplicação NestJS, responsável por expor uma API para buscar dados de clima e processar requisições.
- `frontend/`: Contém a aplicação React, que fornece a interface gráfica para o usuário interagir com o aplicativo.

Para uma descrição detalhada da estrutura de pastas, consulte o arquivo `weather-app-structure.md`.

## Funcionalidades

- **Busca de Clima por Cidade**: Permite ao usuário inserir o nome de uma cidade para obter dados meteorológicos.
- **Exibição de Dados Meteorológicos**: Apresenta informações como temperatura atual, umidade, velocidade do vento e condições gerais do tempo.
- **Interface de Usuário Intuitiva**: Desenvolvida com React para uma experiência de usuário fluida e responsiva.
- **API Backend com NestJS**: Fornece um endpoint robusto e escalável para consumir a API externa de clima.

## Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)
- [Git](https://git-scm.com/) (para clonar o repositório)

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd weather-app
```

### 2. Configurar o Backend (NestJS)

Navegue até a pasta `backend` e instale as dependências:

```bash
cd backend
npm install # ou yarn install
```

Crie um arquivo `.env` na raiz da pasta `backend` com as seguintes variáveis de ambiente:

```
OPEN_METEO_API_URL=https://api.open-meteo.com/v1/forecast
```

**Nota**: Para a API Open-Meteo, geralmente não é necessária uma chave de API para o uso básico, mas é uma boa prática manter a URL configurável.

### 3. Configurar o Frontend (React)

Navegue até a pasta `frontend` e instale as dependências:

```bash
cd ../frontend
npm install # ou yarn install
```

Crie um arquivo `.env` na raiz da pasta `frontend` com as seguintes variáveis de ambiente:

```
REACT_APP_API_BASE_URL=http://localhost:3000/api # ou a URL do seu backend NestJS
```

## Guia de Uso

### 1. Iniciar o Backend

Na pasta `backend`, execute o seguinte comando para iniciar o servidor NestJS:

```bash
npm run start:dev # ou yarn start:dev
```

O backend estará disponível em `http://localhost:3000` (ou a porta configurada).

### 2. Iniciar o Frontend

Na pasta `frontend`, execute o seguinte comando para iniciar a aplicação React:

```bash
npm start # ou yarn start
```

O frontend será aberto automaticamente em seu navegador padrão, geralmente em `http://localhost:3001`.

### Interagindo com o Aplicativo

1. No navegador, você verá um campo de entrada para digitar o nome da cidade.
2. Digite o nome de uma cidade (ex: 
"São Paulo") e pressione Enter ou clique no botão de busca.
3. Os dados meteorológicos da cidade serão exibidos na tela.

## Exemplo de Resultado

### Frontend (React)

```
+-----------------------------------+
|          ☀️ Clima em São Paulo    |
+-----------------------------------+
| Temperatura: 25°C                 |
| Umidade: 70%                      |
| Vento: 15 km/h                    |
| Condição: Ensolarado              |
+-----------------------------------+
```

### Backend (Resposta da API NestJS)

```json
{
  "city": "São Paulo",
  "temperature": 25,
  "humidity": 70,
  "windSpeed": 15,
  "condition": "Ensolarado"
}
```

## Tratamento de Erros

O aplicativo foi projetado para lidar com os seguintes cenários de erro:

- **Cidade Não Encontrada**: Se o nome da cidade inserido não for reconhecido pela API Open-Meteo, o frontend exibirá uma mensagem informando que a cidade não foi encontrada.
- **Erro de Conexão com a API Externa**: Caso haja problemas de comunicação com a API Open-Meteo, o backend retornará um erro apropriado, que será exibido no frontend.
- **Entrada Inválida**: O backend (NestJS) utiliza DTOs para validação de entrada. Se o usuário tentar buscar o clima sem fornecer o nome da cidade, por exemplo, um erro de validação será retornado.

## Informações da API

Este projeto utiliza a **Open-Meteo API** para obter dados meteorológicos. A API é gratuita e não requer chave de autenticação para o uso básico.

- **Endpoint Principal**: `https://api.open-meteo.com/v1/forecast`
- **Documentação**: [Open-Meteo API Documentation](https://open-meteo.com/en/docs)

O backend NestJS é responsável por fazer as requisições a esta API, processar a resposta e fornecer os dados relevantes ao frontend.

## Melhorias Futuras

- **Histórico de Buscas**: Armazenar as últimas cidades pesquisadas pelo usuário.
- **Localização Automática**: Detectar a localização do usuário para exibir o clima automaticamente.
- **Previsão de 7 Dias**: Estender a funcionalidade para mostrar a previsão do tempo para os próximos dias.
- **Unidades de Medida**: Permitir que o usuário altere as unidades de temperatura (Celsius/Fahrenheit) e velocidade do vento.
- **Autenticação de Usuários**: Implementar um sistema de autenticação para funcionalidades personalizadas.
- **Testes Abrangentes**: Adicionar mais testes unitários e de integração para garantir a robustez da aplicação.
- **Containerização**: Fornecer configurações Docker para facilitar a implantação.
