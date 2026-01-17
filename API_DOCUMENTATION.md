# 📡 API Documentation

Complete REST API documentation for the Shopping Application backend.

**Base URL**: `http://localhost:3001/api`  
**Content-Type**: `application/json`

---

## 📋 Table of Contents
- [Authentication](#authentication)
- [Products API](#products-api)
- [Orders API](#orders-api)
- [Error Handling](#error-handling)
- [Status Codes](#status-codes)
- [Examples](#examples)

---

## 🔐 Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

**Future**: JWT-based authentication will be implemented for order creation and user-specific operations.

---

## 🛍️ Products API

### Get All Products

Retrieves the complete list of available products.

**Endpoint**: `GET /api/products`

**Headers**: None required

**Query Parameters**: None

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Laptop Pro",
    "price": 1299.99,
    "stock": 10,
    "image": "/assets/laptop.jpg",
    "description": "Ordinateur portable haute performance pour professionnels"
  },
  {
    "id": 2,
    "name": "Casque Audio",
    "price": 89.99,
    "stock": 25,
    "image": "/assets/headphones.jpg",
    "description": "Casque sans fil avec réduction de bruit active"
  }
  // ... 4 more products
]
```

**Response Fields**:
| Field | Type | Description |
|-------|------|-------------|
| id | Number | Unique product identifier |
| name | String | Product display name |
| price | Number | Price in EUR |
| stock | Number | Available quantity |
| image | String | Relative path to product image |
| description | String | Product description |

**Example Request**:
```bash
curl http://localhost:3001/api/products
```

**Example Response**:
```json
[
  {
    "id": 1,
    "name": "Laptop Pro",
    "price": 1299.99,
    "stock": 10,
    "image": "/assets/laptop.jpg",
    "description": "Ordinateur portable haute performance"
  }
]
```

---

## 📦 Orders API

### Preview Order

Validates the cart and calculates the total without creating an order or modifying stock.

**Endpoint**: `POST /api/orders/preview`

**Headers**:
```
Content-Type: application/json
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

**Request Body Schema**:
```typescript
{
  cart: Array<{
    productId: number;  // Must be a valid product ID
    quantity: number;   // Must be > 0
  }>
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
    },
    {
      "productId": 3,
      "name": "Souris Gaming",
      "price": 49.99,
      "quantity": 1,
      "subTotal": 49.99
    }
  ],
  "total": 2649.97
}
```

**Error Response - Empty Cart** (400 Bad Request):
```json
{
  "message": "Le panier est vide"
}
```

**Error Response - Product Not Found** (400 Bad Request):
```json
{
  "message": "Produit 999 introuvable"
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

**Stock Issues Schema**:
```typescript
{
  productId: number;      // Product with stock issue
  productName: string;    // Product name for display
  requested: number;      // Quantity user requested
  available: number;      // Quantity actually available
}
```

**Example Request**:
```bash
curl -X POST http://localhost:3001/api/orders/preview \
  -H "Content-Type: application/json" \
  -d '{
    "cart": [
      {"productId": 1, "quantity": 2},
      {"productId": 3, "quantity": 1}
    ]
  }'
```

---

### Create Order

Creates an order, updates product stock, and returns order confirmation.

**Endpoint**: `POST /api/orders/create`

**Headers**:
```
Content-Type: application/json
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
    },
    {
      "productId": 3,
      "name": "Souris Gaming",
      "quantity": 1,
      "price": 49.99,
      "subTotal": 49.99
    }
  ],
  "total": 2649.97,
  "status": "confirmed",
  "createdAt": "2026-01-16T10:30:00.000Z"
}
```

**Response Fields**:
| Field | Type | Description |
|-------|------|-------------|
| orderId | String | Unique order ID (format: ORD-{timestamp}) |
| items | Array | Ordered items with details |
| total | Number | Total order amount in EUR |
| status | String | Order status (always "confirmed") |
| createdAt | String | ISO 8601 timestamp |

**Error Responses**:

Same as Preview Order endpoint:
- **400**: Empty cart
- **400**: Product not found
- **400**: Insufficient stock (with stockIssues array)

**Side Effects**:
- ✅ Product stock is **decremented** by ordered quantities
- ✅ Order is generated with unique ID
- ⚠️ Stock changes are **permanent** (no undo mechanism)

**Example Request**:
```bash
curl -X POST http://localhost:3001/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "cart": [
      {"productId": 1, "quantity": 2}
    ]
  }'
```

**Example Response**:
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

---

## ⚠️ Error Handling

### Standard Error Format

All errors return a JSON object with at least a `message` field:

```json
{
  "message": "Error description"
}
```

### Stock Issue Errors

Stock validation errors include an additional `stockIssues` array:

```json
{
  "message": "Stock insuffisant pour certains produits",
  "stockIssues": [
    {
      "productId": 1,
      "productName": "Laptop Pro",
      "requested": 15,
      "available": 10
    },
    {
      "productId": 5,
      "productName": "Écran 27 pouces",
      "requested": 8,
      "available": 3
    }
  ]
}
```

### Common Error Messages

| Message | Cause | Solution |
|---------|-------|----------|
| "Le panier est vide" | Empty or missing cart array | Include at least one item in cart |
| "Produit {id} introuvable" | Invalid product ID | Use valid product ID (1-6) |
| "Stock insuffisant..." | Requested > available | Reduce quantity or use stockIssues data |

---

## 📊 Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| **200** | OK | Successful GET or POST (preview) |
| **201** | Created | Order successfully created |
| **400** | Bad Request | Validation errors, stock issues |
| **404** | Not Found | Endpoint doesn't exist |
| **500** | Internal Server Error | Unexpected server error |

---

## 🔄 Complete User Flow

### Happy Path: Successful Order

```
1. GET /api/products
   → User sees product catalog

2. User adds products to cart (client-side only)

3. POST /api/orders/preview
   → Validates cart
   → Returns total
   → User sees order summary

4. POST /api/orders/create
   → Stock validated again
   → Stock updated
   → Order created
   → Returns order confirmation

5. User receives order ID
```

### Unhappy Path: Insufficient Stock

```
1. User adds 15 Laptops to cart (only 10 available)

2. POST /api/orders/create
   → Server validates stock
   → Finds insufficient stock
   → Returns 400 with stockIssues:
   {
     "message": "Stock insuffisant...",
     "stockIssues": [{
       "productId": 1,
       "productName": "Laptop Pro",
       "requested": 15,
       "available": 10
     }]
   }

3. Frontend shows dialog:
   "Demandé: 15, Disponible: 10"
   "Voulez-vous procéder avec 10?"

4. User clicks "Oui, continuer"

5. POST /api/orders/create (with quantity: 10)
   → Stock validated (OK)
   → Order created
   → Returns order confirmation
```

---

## 📝 Request/Response Examples

### Example 1: Get Products

**Request**:
```http
GET /api/products HTTP/1.1
Host: localhost:3001
```

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Laptop Pro",
    "price": 1299.99,
    "stock": 10,
    "image": "/assets/laptop.jpg",
    "description": "Ordinateur portable haute performance"
  }
]
```

---

### Example 2: Preview Valid Order

**Request**:
```http
POST /api/orders/preview HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "cart": [
    {"productId": 1, "quantity": 2},
    {"productId": 2, "quantity": 1}
  ]
}
```

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "productId": 1,
      "name": "Laptop Pro",
      "price": 1299.99,
      "quantity": 2,
      "subTotal": 2599.98
    },
    {
      "productId": 2,
      "name": "Casque Audio",
      "price": 89.99,
      "quantity": 1,
      "subTotal": 89.99
    }
  ],
  "total": 2689.97
}
```

---

### Example 3: Stock Validation Error

**Request**:
```http
POST /api/orders/create HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "cart": [
    {"productId": 1, "quantity": 50}
  ]
}
```

**Response**:
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": "Stock insuffisant pour certains produits",
  "stockIssues": [
    {
      "productId": 1,
      "productName": "Laptop Pro",
      "requested": 50,
      "available": 10
    }
  ]
}
```

---

### Example 4: Successful Order Creation

**Request**:
```http
POST /api/orders/create HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "cart": [
    {"productId": 1, "quantity": 2}
  ]
}
```

**Response**:
```http
HTTP/1.1 201 Created
Content-Type: application/json

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

---

## 🧪 Testing with Postman

### Import Collection

Create a Postman collection with these requests:

**Collection Name**: Shopping App API

**Variables**:
- `baseUrl`: `http://localhost:3001/api`

**Requests**:

1. **Get Products**
   - Method: GET
   - URL: `{{baseUrl}}/products`

2. **Preview Order**
   - Method: POST
   - URL: `{{baseUrl}}/orders/preview`
   - Body (raw JSON):
   ```json
   {
     "cart": [
       {"productId": 1, "quantity": 2}
     ]
   }
   ```

3. **Create Order**
   - Method: POST
   - URL: `{{baseUrl}}/orders/create`
   - Body (raw JSON):
   ```json
   {
     "cart": [
       {"productId": 1, "quantity": 2}
     ]
   }
   ```

4. **Test Stock Validation**
   - Method: POST
   - URL: `{{baseUrl}}/orders/create`
   - Body (raw JSON):
   ```json
   {
     "cart": [
       {"productId": 1, "quantity": 999}
     ]
   }
   ```

---

## 🔒 Security Considerations

### Current Implementation
- No authentication required
- No rate limiting
- CORS enabled for localhost:5173
- No input sanitization (basic validation only)

### Production Recommendations
- [ ] Implement JWT authentication
- [ ] Add rate limiting (e.g., express-rate-limit)
- [ ] Sanitize user inputs
- [ ] Implement HTTPS
- [ ] Add request validation middleware
- [ ] Log all API requests
- [ ] Implement API versioning (/api/v1/...)

---

## 📈 Performance

### Current Metrics
- **Products Endpoint**: ~5ms response time
- **Preview Endpoint**: ~10ms response time
- **Create Endpoint**: ~15ms response time

### Optimization Opportunities
- Caching product data
- Database indexing (when migrated from in-memory)
- Response compression (gzip)
- Connection pooling

---

## 🔮 Future Enhancements

### Planned Features
- [ ] User authentication endpoints
- [ ] Order history retrieval
- [ ] Product search and filtering
- [ ] Pagination for products
- [ ] Order cancellation
- [ ] Partial refunds
- [ ] Inventory management endpoints
- [ ] Analytics endpoints

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Maintained by**: [Your Name]
