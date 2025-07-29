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

1. Clonar este repositório e acessar a pasta do projecto:

   ```bash
   git clone https://github.com/alberto-rj/e-commerce-api
   cd e-commerce-api
   ```

2. Instalar as dependências:

   ```bash
   npm install
   ```

3. Copiar o arquivo `.env.example` para `.env` e definir as variáves de ambiente com suas próprias configurações (_conforme esperado_):

   ```bash
   cp .env.example .env
   ```

   > Importante: Certifique-se de que seu servidor PostgreSQL está em execução antes de proceguir para os próximos passos.

4. Criar o banco de dados:

   ```bash
   npm run db:migrate
   ```

5. Popular o banco de dados:

   ```bash
   npm run db:seed
   ```

6. Iniciar o servidor:

   ```bash
   npm run dev
   ```
