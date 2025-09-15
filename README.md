# 🛒 Shopping API

A simple API for user management (register/login) with JWT authentication, and cart item operations.  
Built using **Node.js + Express + PostgreSQL + JWT + Supertest**.

---

## 📌 Features
- Register a new user.
- Login with JWT authentication.
- Protected routes that require Authorization header.
- Cart management (add, list, delete items).
- Order from item in cart.
- Unit/Integration tests with Supertest + Jasmine.

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mohamad-Adwan/shopping-api.git
   cd shopping-api
---

## 🛠 Tech Stack
- **Node.js** + **Express**
- **PostgreSQL**
- **TypeScript**
- **JWT (jsonwebtoken)**
- **bcrypt** for password hashing
- **Jasmine + Supertest** for testing

---
```
shopping-api/
├── src/
│ ├── spec/
│ │ ├── handlers/ # Handler (ts)
│ │ ├── models/ # Models (ts)
│ ├── db/ # Database connection
│ ├── handlers/ # 
│ ├── models.ts # Application entry point
│ └── middleware/ Middleware (e.g., JWT auth)
├── server.ts # Application entry point
├── spec/ 
│ ├── handlers/ # (empty)
│ ├── models/ # (empty)
│ └── support/ # jasmin.json
├── dist/ # Compiled output (TypeScript) , Test files (test will apply here)
├── package.json
├── tsconfig.json
├── scripts # (here will find tables)
├── .env 
└── README.md
```

---
## My SQl Table
### Users table
```
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
### Categories table
```
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
### Products table
```
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(100) UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
### Cart table
```
CREATE TABLE IF NOT EXISTS carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  checked_out TEXT NOT NULL DEFAULT 'active' CHECK (checked_out IN ('active','checked_out')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
### Cart items table
```
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
### Orders table
```
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  address_id INTEGER REFERENCES addresses(id),
  status VARCHAR(50) DEFAULT 'pending',
  total NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
### Order items table
```
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL
);
```
### Reviews table
```
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment VARCHAR(1000),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```
### Indexes for faster queries
```
CREATE INDEX IF NOT EXISTS idx_products_name ON products (name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category_id);
```
---
### Scripts
"scripts": {
    "build": "tsc",
    "watch": "tsc-watch --onSuccess \"node dist/server.js\"",
    "start": "node dist/server.js",
    "test": "jasmine"
  }

---
# Yor API's but i make some changes in it , to make project big to put it in my Cv
## API Endpoints 
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

