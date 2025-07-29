# Sistema E-commerce - REST API

## Construído com

- TypeScript
- PostgreSQL
- Express.js
- Node.js
- Prisma
- Git
- ESLint
- Prettier
- VS Code
- Insomnia

## Como executar localmente

### Requisitos

- Node instalado (v20.11.1)
- Git instalado (2.34.1)
- Terminal Linux (Shell Bash)
- Servidor PostgreSQL

### Passos

1. Clonar este repositório e acessar o directório do projecto:

   ```bash
   git clone https://github.com/alberto-rj/e-commerce-api
   cd e-commerce-api
   ```

2. Criar o arquivo `.env` na raíz do projecto especificando as configurações conforme o exemplo em `.env.example`:

   ```bash
   # Database
   DATABASE_URL="postgresql://[user]:[password]@[hostname]:[port]/[db_name]?schema=public"

   # Frontend
   CLIENT_BASE_URL="http://localhost:5173"

   # Server
   NODE_ENV="development"
   PORT=3000

   # Authentication
   JWT_ACCESS_SECRET="super-secret-access-key-here"
   JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES=15
   JWT_REFRESH_SECRET="super-secret-refresh-key-here"
   JWT_REFRESH_SECRET_EXPIRES_IN_DAYS=14
   BCRYPT_SALT=10
   ```

   > Importante: Certifique-se de que seu servidor PostgreSQL está em execução, antes de proceguir para os próximos passos.

3. Instalar as dependências:

   ```bash
   npm install
   ```

4. Fazer o build da aplicação:

   ```bash
   npm run build
   ```

5. Criar o banco de dados:

   ```bash
   npm run db:migrate
   ```

6. Popular o banco de dados:

   ```bash
   npm run db:seed
   ```

7. Iniciar o servidor:

   ```bash
   npm start
   ```
