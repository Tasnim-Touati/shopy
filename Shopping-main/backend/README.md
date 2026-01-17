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

**Cart Array**:
- ✅ Must be present
- ✅ Must be an array
- ✅ Cannot be empty

**Cart Items**:
- ✅ Each item must have `productId` (number)
- ✅ Each item must have `quantity` (number > 0)
- ✅ Product must exist in database
- ✅ Requested quantity must not exceed available stock

**Stock Validation**:
- Checks performed in both `preview` and `create` endpoints
- Returns detailed `stockIssues` array for insufficient stock
- Atomic updates - all items validated before any stock is modified

---

## 💾 Data Model

### Product Schema
```javascript
{
  id: Number,           // Unique identifier
  name: String,         // Product name
  price: Number,        // Price in EUR
  stock: Number,        // Available quantity
  image: String,        // Image path
  description: String   // Product description
}
```

### Order Schema
```javascript
{
  orderId: String,      // Format: "ORD-{timestamp}"
  items: [
    {
      productId: Number,
      name: String,
      quantity: Number,
      price: Number,
      subTotal: Number
    }
  ],
  total: Number,        // Total order amount
  status: String,       // "confirmed"
  createdAt: String     // ISO 8601 timestamp
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

**Using Postman**:
1. Import the collection from `/docs/postman-collection.json` (if provided)
2. Set base URL to `http://localhost:3001/api`
3. Test each endpoint

---

## 📦 Dependencies

### Production
- **express** (^4.18.2): Web framework
- **cors** (^2.8.5): Cross-origin resource sharing

### Development
- **nodemon** (^3.0.1): Auto-restart on file changes

---

## 🔧 Configuration

### CORS Settings
```javascript
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true
}));
```

### Port Configuration
Default port: `3001`  
Can be changed in `server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

---

## 🐛 Error Handling

### Error Response Format
All errors return JSON with a `message` field:
```json
{
  "message": "Error description"
}
```

### Stock Issue Errors
Include additional `stockIssues` array:
```json
{
  "message": "Stock insuffisant pour certains produits",
  "stockIssues": [
    {
      "productId": 1,
      "productName": "Laptop Pro",
      "requested": 5,
      "available": 3
    }
  ]
}
```

### HTTP Status Codes
- **200**: Successful GET/POST request
- **201**: Resource created successfully
- **400**: Bad request (validation errors, stock issues)
- **404**: Resource not found
- **500**: Internal server error

---

## 🔄 Data Flow

### Order Creation Flow
```
1. Client → POST /api/orders/create
2. Controller validates request body
3. Service checks product existence
4. Service validates stock availability
5. If stock insufficient → Return 400 with stockIssues
6. If valid → Repository updates stock
7. Service generates order with unique ID
8. Controller → Returns 201 with order data
```

### Stock Validation Flow
```
1. Iterate through all cart items
2. For each item:
   - Find product in data store
   - Compare requested vs available quantity
   - If insufficient → Add to stockIssues array
3. If stockIssues not empty → Throw error
4. If all valid → Proceed with order
```

---

## 🧪 Testing

### Manual Testing Checklist

**Products Endpoint**:
- [ ] GET /api/products returns all 6 products
- [ ] Each product has id, name, price, stock, image

**Preview Endpoint**:
- [ ] Valid cart returns correct total
- [ ] Invalid product ID returns error
- [ ] Quantity exceeding stock returns stockIssues
- [ ] Empty cart returns validation error

**Create Endpoint**:
- [ ] Valid order creates order and updates stock
- [ ] Stock decreases correctly after order
- [ ] Insufficient stock prevents order creation
- [ ] Returns unique order ID with timestamp

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

## 📚 Code Examples

### Adding a New Product
Edit `src/data/products.js`:
```javascript
{
  id: 7,
  name: "New Product",
  price: 99.99,
  stock: 50,
  image: "/assets/new-product.jpg",
  description: "Product description"
}
```

### Modifying Stock Validation
Edit `src/services/order.service.js`:
```javascript
// Add custom validation logic
if (product.stock < item.quantity) {
  stockIssues.push({
    productId: product.id,
    productName: product.name,
    requested: item.quantity,
    available: product.stock
  });
}
```

---

## 🤝 Contributing

When adding new features:
1. Follow the layered architecture pattern
2. Add validation in controllers/validators
3. Implement business logic in services
4. Data access only in repositories
5. Update this README with new endpoints

---

**Maintained by**: [Your Name]  
**Last Updated**: January 2026
