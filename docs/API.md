# BuyFast - Documentação da API

## Índice

- [Visão geral da API](#visão-geral-da-api)
  - [Autenticação](#autenticação)
  - [Usuários](#usuários)
  - [Categorias](#categorias)
  - [Produtos](#produtos)
  - [Carrinho](#carrinho)
  - [Pedidos](#pedidos)
  - [Relatórios (Admin)](#relatórios-admin)
  - [Health Check](#health-check)
  - [Parâmetros de Query Comuns](#parâmetros-de-query-comuns)
    - [Paginação](#paginação)
    - [Filtros](#paginação)
    - [Paginação](#paginação)
    - [Ordenação](#ordenação)
    - [Busca](#busca)
    - [Códigos de Status HTTP](#códigos-de-status-http)
    - [Formato de Resposta Padrão](#formato-de-resposta-padrão)
      - [Sucesso](#sucesso)
      - [Erro](#erro)
      - [Paginação](#paginação)

## Visão geral da API

### Autenticação

```http
POST   /api/auth/register               # Registrar novo usuário
POST   /api/auth/login                  # Login de usuário
POST   /api/auth/logout                 # Logout de usuário
POST   /api/auth/refresh                # Refresh token
POST   /api/auth/forgot-password        # Solicitar recuperação de senha
POST   /api/auth/reset-password         # Redefinir senha
```

### Usuários

```http
GET    /api/users/me                      # Obter perfil do usuário
PUT    /api/users/me                      # Atualizar perfil
GET    /api/users                         # Listar usuários (admin)
GET    /api/users/:id                     # Obter usuário específico (admin)
PUT    /api/users/:id                     # Atualizar usuário (admin)
DELETE /api/users/:id                     # Deletar usuário (admin)
```

### Categorias

```http
GET    /api/categories                    # Listar categorias
GET    /api/categories/:id                # Obter categoria específica
POST   /api/categories                    # Criar categoria (admin)
PUT    /api/categories/:id                # Atualizar categoria (admin)
DELETE /api/categories/:id                # Deletar categoria (admin)
```

### Produtos

```http
GET    /api/products                      # Listar produtos
GET    /api/products/:id                  # Obter produto específico
POST   /api/products                      # Criar produto (admin)
PUT    /api/products/:id                  # Atualizar produto (admin)
DELETE /api/products/:id                  # Deletar produto (admin)
POST   /api/products/:id/images           # Upload de imagens (admin)
DELETE /api/products/:id/images           # Deletar imagens do produto (admin)
DELETE /api/products/:id/images/:imageId  # Deletar imagem specífica do produto (admin)
```

### Carrinho

```http
GET    /api/cart                   # Obter carrinho do usuário
POST   /api/cart/items             # Adicionar item ao carrinho
PUT    /api/cart/items/:id         # Atualizar item no carrinho
DELETE /api/cart/items/:id         # Remover item do carrinho
DELETE /api/cart                   # Limpar carrinho
```

### Pedidos

```http
GET    /api/orders                 # Listar pedidos do usuário
GET    /api/orders/:id             # Obter pedido específico
POST   /api/orders                 # Criar pedido
PUT    /api/orders/:id/status      # Atualizar status (admin)
GET    /api/admin/orders           # Listar todos os pedidos (admin)
```

### Relatórios (Admin)

```http
GET    /api/admin/reports/sales    # Relatório de vendas
GET    /api/admin/reports/products # Produtos mais vendidos
GET    /api/admin/reports/users    # Estatísticas de usuários
GET    /api/admin/dashboard        # Dashboard geral
```

### Health Check

```http
GET    /api/health                 # Verificação de saúde da API
```

### Parâmetros de Query Comuns

#### Paginação

```url
?page=1&limit=10
```

#### Filtros

```url
?category=electronics&minPrice=100&maxPrice=500
```

#### Ordenação

```url
?sortBy=price&order=asc
```

#### Busca

```url
?search=smartphone
```

### Códigos de Status HTTP

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **400 Bad Request**: Dados inválidos
- **401 Unauthorized**: Não autenticado
- **403 Forbidden**: Sem permissão
- **404 Not Found**: Recurso não encontrado
- **409 Conflict**: Conflito (ex: email já existe)
- **422 Unprocessable Entity**: Erro de validação
- **500 Internal Server Error**: Erro interno do servidor

### Formato de Resposta Padrão

#### Sucesso

```json
{
  "success": true,
  "data": {
    "results": []
  }
}
```

#### Erro

```json
{
  "success": false,
  "data": {
    "error": {
      "name": "VALIDATION ERROR",
      "message": "Invalid data",
      "details": []
    }
  }
}
```

#### Paginação

```json
{
  "success": true,
  "data": {
    "results": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "length": 6,
      "pages": 10
    }
  }
}
```
