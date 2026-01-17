# 🖥️ Backend API - Shopping Application

RESTful API built with Node.js and Express for e-commerce order management.

**Base URL**: `http://localhost:3001/api`

---

## 🚀 Quick Start
```bash
npm install
npm run dev    # Development with auto-reload
npm start      # Production
```

---

## 🏗️ Architecture

Layered architecture for separation of concerns:
```
Routes → Controllers → Services → Repositories → Data
```

- **Routes**: HTTP endpoint definitions
- **Controllers**: Request/response handling
- **Services**: Business logic and validation
- **Repositories**: Data access layer
- **Data**: In-memory storage

---

## 🔌 API Endpoints

### 📦 Products

**Get all products**
```http
GET /api/products
```

Response (200):
```json
[
  {
    "id": 1,
    "name": "Laptop Pro",
    "price": 1299.99,
    "stock": 10,
    "image": "/assets/laptop.jpg"
  }
]
```

---

### 🛍️ Orders

**Preview order** - Validates cart without stock updates
```http
POST /api/orders/preview
```

Request:
```json
{
  "cart": [
    { "productId": 1, "quantity": 2 }
  ]
}
```

Success (200):
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

Error - Insufficient stock (400):
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

**Create order** - Validates and updates stock
```http
POST /api/orders/create
```

Request: Same as preview

Success (201):
```json
{
  "orderId": "ORD-1705420800000",
  "items": [...],
  "total": 2599.98,
  "status": "confirmed",
  "createdAt": "2026-01-16T10:30:00.000Z"
}
```

Errors: Same as preview endpoint

---

## ✅ Validation Rules

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

## 💾 Data Models

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
  createdAt: string        // ISO 8601
}
```

---

## 📁 Project Structure
```
backend/
├── src/
│   ├── controllers/      # HTTP request handlers
│   ├── services/         # Business logic
│   ├── repositories/     # Data access
│   ├── routes/           # Endpoint definitions
│   ├── validators/       # Input validation
│   ├── data/             # In-memory data
│   ├── app.js            # Express app configuration
│   └── server.js         # Application entry point
└── package.json
```

---

## 📦 Dependencies

**Production**:
- `express` ^4.18.2 - Web framework
- `cors` ^2.8.5 - CORS support

**Development**:
- `nodemon` ^3.0.1 - Auto-reload

---

## ⚙️ Configuration

**Port**: Default 3001, configurable via `process.env.PORT`

**CORS**: Configured for `http://localhost:5173` (frontend)

---

## 🧪 Testing

**cURL Examples**:
```bash
# Get products
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

---

## 🚦 Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] JWT authentication
- [ ] Order history persistence
- [ ] Payment integration
- [ ] Rate limiting
- [ ] Unit/integration tests
- [ ] OpenAPI documentation

---

**Maintained by**: [Hawra Sallami]  
**📅 Last Updated**: January 2026
