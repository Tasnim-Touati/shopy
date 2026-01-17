# 🎨 Frontend - Shopping Application

React-based frontend for the e-commerce shopping application with modern UI/UX and state management.

## 📋 Overview

A responsive, modern e-commerce interface built with React and Vite. Features include product browsing, cart management, and intelligent stock validation with user-friendly dialogs.

**Port**: `5173` (Vite default)  
**URL**: `http://localhost:5173`

---

## 🏗️ Architecture

### Component Structure

```
┌────────────────────────────────────────┐
│           App.jsx (Router)             │
├────────────────────────────────────────┤
│        CartProvider (Context)          │  Global cart state
├────────────────────────────────────────┤
│              Pages                     │
│  ┌──────────────┐  ┌───────────────┐  │
│  │ ProductList  │  │   CartPage    │  │
│  └──────────────┘  └───────────────┘  │
├────────────────────────────────────────┤
│           Components                   │
│  ┌──────────────┐  ┌───────────────┐  │
│  │ ProductCard  │  │    Navbar     │  │
│  └──────────────┘  └───────────────┘  │
├────────────────────────────────────────┤
│        Hooks & API Layer               │
│  ┌──────────────┐  ┌───────────────┐  │
│  │   useCart    │  │   orderApi    │  │
│  │  useProducts │  │  productApi   │  │
│  └──────────────┘  └───────────────┘  │
└────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── assets/              # Product images
│       ├── laptop.jpg
│       ├── headphones.jpg
│       ├── mouse.jpg
│       ├── keyboard.jpg
│       ├── monitor.jpg
│       └── webcam.jpg
│
├── src/
│   ├── api/                 # API client layer
│   │   ├── axiosClient.js   # Axios configuration
│   │   ├── orderApi.js      # Order endpoints
│   │   └── productApi.js    # Product endpoints
│   │
│   ├── components/          # Reusable components
│   │   ├── ProductCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── pages/               # Page components
│   │   ├── ProductListPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CartPage.css
│   │   └── product-grid.css
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useCart.js
│   │   └── useProducts.js
│   │
│   ├── store/               # State management
│   │   ├── CartContext.js
│   │   └── CartProvider.jsx
│   │
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── main.jsx             # Entry point
│   └── main.css             # Base styles
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 Key Features

### 1. Product Catalog
- **Grid Layout**: Responsive product grid (3 columns → 2 → 1)
- **Product Cards**: Image, name, price, stock status
- **Low Stock Badges**: Visual warning when stock < 5
- **Hover Effects**: Image zoom and card elevation
- **Stock Indicators**: "En stock" / "Indisponible"

### 2. Shopping Cart
- **Add to Cart**: From product cards with toast notification
- **Quantity Management**: Increment/decrement buttons
- **Remove Items**: With smooth slide-out animation
- **Clear Cart**: Empty entire cart with one click
- **Real-time Total**: Auto-calculated as cart changes

### 3. Stock Validation Dialog
- **Smart Validation**: Only checks stock on checkout
- **User-Friendly**: Shows requested vs available quantities
- **Flexible Options**: 
  - Cancel and manually adjust cart
  - Auto-adjust to available stock and proceed

### 4. Order Processing
- **Preview**: Validates before submission
- **Submit**: Creates order and updates stock
- **Success Feedback**: Toast with order ID
- **Auto-redirect**: Returns to products after 2s

---

## 🔧 State Management

### Context API Structure

```javascript
// CartContext.js
const CartContext = createContext({
  cart: [],              // Array of cart items
  addToCart: () => {},   // Add product to cart
  removeFromCart: () => {}, // Remove product from cart
  updateQuantity: () => {}, // Update item quantity
  clearCart: () => {}    // Clear entire cart
});
```

### Cart Item Structure
```javascript
{
  id: Number,           // Product ID
  name: String,         // Product name
  price: Number,        // Unit price
  quantity: Number,     // Quantity in cart
  image: String,        // Product image URL
  stock: Number         // Available stock
}
```

### State Flow
```
User Action → Component → Hook → Context → Update State → Re-render
```

---

## 🚀 Running the Frontend

### Development Mode
```bash
npm run dev
```
Runs on `http://localhost:5173` with hot module replacement.

### Build for Production
```bash
npm run build
```
Outputs to `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 📦 Dependencies

### Production
- **react** (^18.2.0): UI library
- **react-dom** (^18.2.0): React DOM renderer
- **react-router-dom** (^6.20.0): Routing
- **axios** (^1.6.2): HTTP client
- **react-hot-toast** (^2.4.1): Toast notifications

### Development
- **vite** (^5.0.0): Build tool
- **@vitejs/plugin-react** (^4.2.0): React plugin for Vite

---

## 📚 Learn More

### React Concepts Used
- Functional Components
- Hooks (useState, useEffect, useContext)
- Context API for state management
- Custom hooks for reusable logic
- Conditional rendering
- Event handling

### Best Practices Followed
- Component composition
- Single responsibility principle
- Controlled components
- Error boundaries (can be added)
- Accessibility considerations

---

**Maintained by**: Tasnim Touati  
