 <div align="center">
 <h1>BuyFast API 🛒</h1>
 <p>Uma API REST robusta para e-commerce construída com Node.js, TypeScript, Express.js e PostgreSQL</p>
</div>

<div align="center">

[![Node.js](https://img.shields.io/badge/nodedotjs-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white&logoSize=auto)](https://nodejs.org)&nbsp;
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&logoSize=auto)](https://www.typescriptlang.org/)&nbsp;
[![ExpressJS](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white&logoSize=auto)](https://expressjs.com)&nbsp;
[![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white&logoSize=auto)](https://www.postgresql.org/)&nbsp;
[![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white&logoSize=auto)](https://www.postgresql.org/)&nbsp;

</div>

## Índice

- [Sobre o Projecto](#sobre-o-projecto)
  - [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
  - [Backend](#backend)
  - [Desenvolvimento](#desenvolvimento)
- [Documentações](#documentações)
- [Estrutura do Projecto](#estrutura-do-projecto)
- [Instalação e Configuração](#instalação-e-configuração)
  - [Pré-requisitos](#pré-requisitos)
  - [Passos de Instalação](#passos-de-instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Contribuição](#contribuição)
  - [Diretrizes de Contribuição](#diretrizes-de-contribuição)
- [Licença](#licença)

## Sobre o Projecto

Esta é uma API REST completa para e-commerce que fornece todas as funcionalidades essenciais para uma loja online, incluindo gestão de produtos, utilizadores, pedidos, carrinho de compras e autenticação segura.

### Funcionalidades

- **✅ Implementado:**

  - [x] Autenticação JWT com refresh tokens
  - [x] Gestão de utilizadores (registo, login, perfil)
  - [x] Gestão de produtos (CRUD completo)
  - [x] Categorias de produtos
  - [x] Pesquisa e filtros avançados
  - [x] Paginação em todas as listagens
  - [x] Validação de dados robusta
  - [x] Middleware de autenticação e autorização
  - [x] Middleware de tratamento de erro global

- **🔄 Em Desenvolvimento:**

  - [] Carrinho de compras funcional
  - [] Sistema de pedidos com diferentes estados

- **📋 Próximos Passos:**
  - [] Documentação completa da API
  - [] Integração de pagamentos
  - [] Sistema de notificações por email
  - [] Sistema de reviews e avaliações
  - [] Dashboard administrativo
  - [] Relatórios e analytics
  - [] Sistema de cupões de desconto
  - [] API para aplicação móvel

## Tecnologias

### Backend

<div>

[![Node.js](https://img.shields.io/badge/nodedotjs-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white&logoSize=auto)](https://nodejs.org)&nbsp;
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&logoSize=auto)](https://www.typescriptlang.org/)&nbsp;
[![ExpressJS](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white&logoSize=auto)](https://expressjs.com)&nbsp;
[![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white&logoSize=auto)](https://www.postgresql.org/)&nbsp;
[![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white&logoSize=auto)](https://www.postgresql.org/)&nbsp;

</div>

### Desenvolvimento

<div>

[![Prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white&logoSize=auto)](https://prettier.io/)&nbsp;
[![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white&logoSize=auto)](https://git-scm.com/)&nbsp;
[![VS Code](https://img.shields.io/badge/vscode-2F80ED?style=for-the-badge&logo=vscode&logoColor=white&logoSize=auto)](https://code.visualstudio.com/)&nbsp;
[![Insomnia](https://img.shields.io/badge/insomnia-4000BF?style=for-the-badge&logo=insomnia&logoColor=white&logoSize=auto)](https://insomnia.rest/)&nbsp;

</div>

## Documentações

- 🗂️ [Modelo de Dados](docs/ERD.md)
- 🔗 [Endpoints da API](docs/API.md)
- 📋 [Casos de Uso](docs/USE-CASES.md)
- ✅ [Critérios de Aceitação](docs/CRITERIA.md)
- 📅 [Cronograma de Desenvolvimento](docs/CALENDAR.md)

## Estrutura do Projecto

```txt
buyfast-backend/
├── 📁 docs/                     # Documentação do projecto
├── 📁 prisma/                   # Configuração da base de dados
│   ├── 📁 seeds/                # Scripts de população
├── 📁 src/                      # Código fonte
│   ├── 📁 config/               # Configurações da aplicação
│   ├── 📁 controllers/          # Controladores das rotas
│   ├── 📁 dtos/                 # Data Transfer Objects
│   ├── 📁 middlewares/          # Middlewares personalizados
│   ├── 📁 routes/               # Definição das rotas
│   ├── 📁 services/             # Lógica de negócio
│   ├── 📁 types/                # Definições de tipos TypeScript
│   ├── 📁 utils/                # Utilitários e helpers
```

## Instalação e Configuração

### Pré-requisitos

Certifica-te de que tens as seguintes ferramentas instaladas:

- [**Node.js**](https://nodejs.org) (versão 20.11.1 ou superior)
- [**Git**](https://git-scm.com/) (versão 2.34.1 ou superior)
- [**PostgreSQL**](https://www.postgresql.org/) (versão 15 ou superior)
- [**Terminal Linux**](https://www.gnu.org/software/bash/) com Shell Bash (ou equivalente)

### Passos de Instalação

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/alberto-rj/buyfast-backend.git
   cd buyfast-backend
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Edita o arquivo `.env` com as tuas configurações (ver [Variáveis de Ambiente](#variáveis-de-ambiente))

4. **Configurar a base de dados**

   Certifica-te de que o PostgreSQL está em execução e cria uma base de dados:

   ```sql
   CREATE DATABASE buyfast_db;
   ```

5. **Executar migrações**

   ```bash
   npm run db:migrate
   ```

6. **Popular a base de dados (opcional)**

   ```bash
   npm run db:seed
   ```

7. **Compilar o projecto**

   ```bash
   npm run build
   ```

8. **Iniciar o servidor**

   ```bash
   npm start
   ```

🎉 **Pronto!** A API estará disponível em [http://localhost:3000](http://localhost:3000)

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev             # Inicia o servidor em modo desenvolvimento
npm run build           # Compila o TypeScript para JavaScript
npm start               # Inicia o servidor em produção

# Base de dados
npm run db:migrate      # Executa as migrações da base de dados
npm run db:seed         # Popula a base de dados com dados iniciais
```

## Variáveis de Ambiente

Cria um arquivo `.env` na raiz do projecto com as seguintes variáveis:

```bash
# Database
DATABASE_URL="postgresql://<user>:<password>@<hostname>:<port>/buyfast_db?schema=public"

# Frontend
CLIENT_BASE_URL="http://localhost:5173"

# Server
NODE_ENV="development"
PORT="3000"

# Authentication
JWT_ACCESS_SECRET="super-secret-access-key-here"
JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES="15"
JWT_REFRESH_SECRET="super-secret-refresh-key-here"
JWT_REFRESH_SECRET_EXPIRES_IN_DAYS="14"
BCRYPT_SALT="10"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
CLOUDINARY_FOLDER_NAME="buyfast-uploads"

# Product Image Upload
PRODUCT_UPLOAD_PATH="uploads/products"
PRODUCT_MAX_FILE_SIZE="2"
PRODUCT_MAX_FILE_COUNT="5"
PRODUCT_ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp"
```

> ⚠️ **Importante**: Nunca commits o arquivo `.env` para o repositório. Usa senhas seguras em produção!

<details>

<summary>Mais detalhes</summary>

- **Banco de Dados**

  - `DATABASE_URL`: Conexão com banco PostgreSQL.

- **Frontend:**

  - `CLIENT_BASE_URL`: URL do frontend (ex.: `http://localhost:5173`).

- **Servidor**

  - `NODE_ENV`: Ambiente da aplicação (`development`, `production`, `test`).
  - `PORT`: Porta do servidor backend.

- **Autenticação:**

  - `JWT_ACCESS_SECRET`: Chave secreta para tokens de acesso.
  - `JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES`: Expiração do token de acesso (minutos).
  - `JWT_REFRESH_SECRET`: Chave secreta para tokens de refresh.
  - `JWT_REFRESH_SECRET_EXPIRES_IN_DAYS`: Expiração do token de refresh (dias).
  - `BCRYPT_SALT`: Número de rounds usados no hash de senha.

- **Cloudinary:**

  - `CLOUDINARY_CLOUD_NAME`: Nome da conta no Cloudinary.
  - `CLOUDINARY_API_KEY`: Chave da API do Cloudinary.
  - `CLOUDINARY_API_SECRET`: Segredo da API do Cloudinary.
  - `CLOUDINARY_FOLDER_NAME`: Pasta no Cloudinary (opcional).

- **Upload de Produtos:**
  - `PRODUCT_UPLOAD_PATH`: Caminho local para uploads temporários.
  - `PRODUCT_MAX_FILE_SIZE`: Tamanho máximo do arquivo (MB).
  - `PRODUCT_MAX_FILE_COUNT`: Número máximo de arquivos por upload.
  - `PRODUCT_ALLOWED_FILE_TYPES`: Tipos de arquivos aceitos.

</details>

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. 🍴 Faz fork do projecto
2. 🌟 Cria uma branch para a tua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit as tuas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abre um Pull Request

### Diretrizes de Contribuição

- Segue os padrões de código existentes
- Adiciona testes para novas funcionalidades
- Atualiza a documentação quando necessário
- Usa mensagens de commit descritivas

## Licença

Este projecto está licenciado sob a Licença MIT - vê o arquivo [LICENSE](LICENSE) para detalhes.

## Autores

### Alberto José

- GitHub: [@alberto-rj](https://github.com/alberto-rj)
- LinkedIn: [Alberto José](https://www.linkedin.com/in/alberto-rj)

---

⭐ **Se este projecto te ajudou, considera dar uma estrela no repositório!**
