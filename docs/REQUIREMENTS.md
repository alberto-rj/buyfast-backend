# Sistema E-commerce - Documento de Requisitos

## 1. Introdução

### 1.1 Propósito

Este documento descreve os requisitos para o desenvolvimento de um sistema de e-commerce completo.

### 1.2 Escopo

O sistema permitirá aos usuários navegarem, pesquisarem e comprarem produtos online, enquanto administradores poderão gerenciar produtos, pedidos e usuários.

### 1.3 Definições

- **Cliente**: Usuário que realiza compras
- **Admin**: Usuário com privilégios administrativos
- **SKU**: Stock Keeping Unit (código único do produto)

## 2. Requisitos Funcionais

### 2.1 Autenticação e Autorização

- [x] RF01: O sistema deve permitir registro de novos usuários
- [x] RF02: O sistema deve permitir login/logout de usuários
- [ ] RF03: O sistema deve permitir recuperação de senha
- [x] RF04: O sistema deve ter diferentes níveis de acesso

### 2.2 Gestão de Produtos

- [ ] RF05: Administradores devem poder criar produtos
- [ ] RF06: Administradores devem poder editar produtos
- [ ] RF07: Usuários devem poder visualizar produtos
- [ ] RF08: Produtos devem ter categorias

### 2.3 Carrinho de Compras

- [ ] RF09: Usuários devem poder adicionar produtos ao carrinho
- [ ] RF10: Usuários devem poder modificar quantidades
- [ ] RF11: O sistema deve calcular totais automaticamente

### 2.4 Processamento de Pedidos

- [ ] RF12: Usuários devem poder criar pedidos
- [ ] RF13: Pedidos devem ter status de acompanhamento
- [ ] RF14: Administradores devem poder gerenciar pedidos

## 3. Requisitos Não-Funcionais

### 3.1 Segurança

- [x] RNF01: Senhas devem ser criptografadas
- [x] RNF02: Autenticação deve usar JWT
- [x] RNF03: Dados de entrada devem ser validados

### 3.2 Performance

- [ ] RNF04: API deve responder em < 2 segundos
- [ ] RNF05: Suporte a 100+ usuários simultâneos

### 3.3 Manutenibilidade

- [ ] RNF06: Código deve ter 80%+ de cobertura de testes
- [ ] RNF07: API deve ter documentação completa
