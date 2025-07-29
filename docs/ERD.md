# Modelo Entidade-Relacionamento (ERD)

```erDiagram
USERS {
  int id PK
  string email UK
  string username UK
  string password
  string first_name
  string last_name
  string phone
  enum role "Customer,Admin"
  timestamp created_at
  timestamp updated_at
  boolean is_active
}

CATEGORIES {
  int id PK
  string name UK
  string description
  string slug UK
  timestamp created_at
  timestamp updated_at
  boolean is_active
}

PRODUCTS {
  int id PK
  string name
  string description
  decimal price
  int quantity
  string sku UK
  int category_id FK
  timestamp created_at
  timestamp updated_at
  boolean is_active
  decimal weight
  string dimensions
}

PRODUCT_IMAGES {
  int id PK
  int product_id FK
  string url
  string alt_text
  boolean is_primary
  int order
  timestamp created_at
}

CARTS {
  int id PK
  int user_id FK
  timestamp created_at
  timestamp updated_at
}

CART_ITEMS {
  int id PK
  int cart_id FK
  int product_id FK
  int quantity
  decimal unit_price
  timestamp created_at
  timestamp updated_at
}

ORDERS {
    int id PK
    int user_id FK
    string order_number UK
    enum status "pending,processing,shipped,delivered,cancelled"
    decimal subtotal
    decimal tax_amount
    decimal shipping_cost
    decimal total_amount
    json shipping_address
    json billing_address
    timestamp created_at
    timestamp updated_at
}

ORDER_ITEMS {
    int id PK
    int order_id FK
    int product_id FK
    int quantity
    decimal unit_price
    decimal total_price
    timestamp created_at
}

USERS ||--o{ CARTS : "tem"
USERS ||--o{ ORDERS : "faz"
CATEGORIES ||--o{ PRODUCTS : "contém"
PRODUCTS ||--o{ PRODUCT_IMAGES : "tem"
PRODUCTS ||--o{ CART_ITEMS : "está em"
PRODUCTS ||--o{ ORDER_ITEMS : "está em"
CARTS ||--o{ CART_ITEMS : "contém"
ORDERS ||--o{ ORDER_ITEMS : "contém"
```
