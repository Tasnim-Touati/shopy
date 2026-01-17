# 🖥️ Backend API - Shopping Application

Node.js/Express REST API for the e-commerce shopping application.

## 📋 Overview

This backend provides a RESTful API for managing products and orders. It uses an in-memory data store for products and implements comprehensive validation for order processing.

**Port**: `3001`  
**Base URL**: `http://localhost:3001/api`

---

## 🏗️ Architecture

### Layered Architecture Pattern

```
┌─────────────────────────────────────┐
│         Routes Layer                │  HTTP routing
├─────────────────────────────────────┤
│       Controllers Layer             │  Request/Response handling
├─────────────────────────────────────┤
│        Services Layer               │  Business logic
├─────────────────────────────────────┤
│      Repositories Layer             │  Data access
├─────────────────────────────────────┤
│         Data Layer                  │  In-memory storage
└─────────────────────────────────────┘
```

**Benefits**:
- **Separation of Concerns**: Each layer has a single responsibility
- **Maintainability**: Easy to locate and modify specific functionality
- **Testability**: Layers can be tested independently
- **Scalability**: Easy to add new features or swap implementations

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/           # Handle HTTP requests/responses
│   │   ├── order.controller.js
│   │   └── product.controller.js
│   │
│   ├── services/              # Business logic
│   │   ├── order.service.js
│   │   └── product.service.js
│   │
│   ├── repositories/          # Data access layer
│   │   ├── order.repository.js
│   │   └── product.repository.js
│   │
│   ├── routes/                # API route definitions
│   │   ├── order.routes.js
│   │   └── product.routes.js
│   │
│   ├── validators/            # Input validation
│   │   └── order.validator.js
│   │
│   ├── data/                  # In-memory data storage
│   │   └── products.js
│   │
│   ├── app.js                 # Express app configuration
│   └── server.js              # Application entry point
│
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Products

#### Get All Products
```http
GET /api/products
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Laptop Pro",
    "price": 1299.99,
    "stock": 10,
    "image": "/assets/laptop.jpg",
    "description": "High-performance laptop"
  },
  ...
]
```

---

### Orders

#### Preview Order
Validates cart items and calculates total without creating an order.

```http
POST /api/orders/preview
```

**Request Body**:
```json
{
  "cart": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
}
```

**Success Response** (200 OK):
```json
{
  "items": [
    {
      "productId": 1,
      "name": "Laptop Pro",
      "price": 1299.99,
      "quantity": 2,
      "subTotal": 2599.98
    }
  ],
  "total": 2599.98
}
```

**Error Response - Insufficient Stock** (400 Bad Request):
```json
{
  "message": "Stock insuffisant pour certains produits",
  "stockIssues": [
    {
      "productId": 1,
      "productName": "Laptop Pro",
      "requested": 15,
      "available": 10
    }
  ]
}
```

**Error Response - Invalid Product** (400 Bad Request):
```json
{
  "message": "Produit 999 introuvable"
}
```

---

#### Create Order
Creates an order and updates product stock.

```http
POST /api/orders/create
```

**Request Body**:
```json
{
  "cart": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

**Success Response** (201 Created):
```json
{
  "orderId": "ORD-1705420800000",
  "items": [
    {
      "productId": 1,
      "name": "Laptop Pro",
      "quantity": 2,
      "price": 1299.99,
      "subTotal": 2599.98
    }
  ],
  "total": 2599.98,
  "status": "confirmed",
  "createdAt": "2026-01-16T10:30:00.000Z"
}
```

**Error Responses**:
Same as Preview Order endpoint, plus stock is permanently updated on success.

---

## 🔐 Validation Rules

### Order Validation

**Cart Requirements**:
- Must be a non-empty array
- Each item requires `productId` (number) and `quantity` (number > 0)
- Product must exist
- Quantity must not exceed available stock

**Stock Validation**:
- Performed in both preview and create endpoints
- All items validated before any stock modification
- Detailed error reporting via `stockIssues` array

---

## 💾 Data Model

**Product**:
```typescript
{
  id: number
  name: string
  price: number
  stock: number
  image: string
}
```

**Order**:
```typescript
{
  orderId: string          // Format: "ORD-{timestamp}"
  items: Array<{
    productId: number
    name: string
    quantity: number
    price: number
    subTotal: number
  }>
  total: number
  status: "confirmed"
  createdAt: string        
}
```

---

## 🚀 Running the Backend

### Development Mode
```bash
npm run dev
```
Uses nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

### Testing Endpoints

**Using curl**:
```bash
# Get all products
curl http://localhost:3001/api/products

# Preview order
curl -X POST http://localhost:3001/api/orders/preview \
  -H "Content-Type: application/json" \
  -d '{"cart":[{"productId":1,"quantity":2}]}'

# Create order
curl -X POST http://localhost:3001/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{"cart":[{"productId":1,"quantity":2}]}'
```


## 📦 Dependencies

### Production
- `express` ^4.18.2 - Web framework
- `cors` ^2.8.5 - CORS support

**Development**:
- `nodemon` ^3.0.1 - Auto-reload

---

## ⚙️ Configuration

**Port**: Default 3001, configurable via `process.env.PORT`

**CORS**: Configured for `http://localhost:5173` (frontend)


---

## 🚦 Future Improvements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication (JWT)
- [ ] Order history storage
- [ ] Payment gateway integration
- [ ] Rate limiting
- [ ] Request logging
- [ ] Unit/integration tests
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation


---

**Maintained by**: [Hawra Sallami]  
**Last Updated**: January 2026
