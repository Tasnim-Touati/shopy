# 🎨 Frontend - Shopping Application

React-based frontend for the e-commerce shopping application with modern UI/UX and state management.

## 📋 Overview

A responsive, modern e-commerce interface built with React and Vite. Features include product browsing, detailed product pages, cart management, and intelligent stock validation with user-friendly dialogs.

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
│  │ ProductList  │  │ ProductDetail │  │
│  │              │  │               │  │
│  └──────────────┘  └───────────────┘  │
│  ┌──────────────┐                     │
│  │   CartPage   │                     │
│  └──────────────┘                     │
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
│       ├── keyboard.jpg
│       ├── mouse.jpg
│       ├── souris.webp
│       ├── monitor.jpg
│       ├── webcam.jpg
│       ├── speaker.jpg
│       ├── external-hdd.jpg
│       ├── docking-station.jpg
│       ├── gaming-headset.jpg
│       ├── graphic-tablet.jpg
│       └── smartphone-x.jpg
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
│   │   ├── ProductDetailPage.jsx    
│   │   ├── ProductDetailPage.css
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
- **Click to View**: Navigate to detailed product page

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

### 5. Product Detail Pages
- **Enhanced View**: Full-size product images with better visibility
- **Comprehensive Information**: 
  - Product name and pricing
  - Stock availability status
  - Detailed product description
  - Technical specifications and features list
- **Add to Cart**: Direct purchase option from detail page
- **Similar Products Section**: 
  - Related product recommendations at bottom
  - Quick access to similar items
  - Encourages product discovery
- **Seamless Navigation**: 
  - Click any product card to view details
  - Easy return to product catalog
---

## 🛣️ Routing Structure

```javascript
// App.jsx Routes
<Routes>
  <Route path="/" element={<ProductListPage />} />
  <Route path="/product/:id" element={<ProductDetailPage />} />
  <Route path="/cart" element={<CartPage />} />
</Routes>
```
### Navigation Flow
```
Product List → Click Product → Product Detail → Add to Cart → Cart Page
     ↑              ↓                  ↓                          ↓
     └──────────────┴──────────────────┴──────────────────────────┘
                    (Seamless navigation between pages)
```

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
### Product Structure
```javascript
{
  id: Number,           // Product ID
  name: String,         // Product name
  description: String,  // Detailed description
  price: Number,        // Product price
  stock: Number,        // Available quantity
  image: String,        // Image URL
  features: Array       // List of product features
}
```
### State Flow
```
User Action → Component → Hook → Context → Update State → Re-render
```
---

## 📋 Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- Backend server running on port 3001

---

## 🚀 Running the Frontend

### Install Dependencies
```bash
cd frontend
npm install
```

### Verify Backend Connection
Make sure your backend is running
```bash
# In another terminal
cd backend
npm run dev
# Should be running on http://localhost:3001
```

### Start Development Server
```bash
npm run dev
```
The app will open at http://localhost:5173

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

## 🚦 Future Enhancements

- [ ] User authentication
- [ ] Order history page
- [ ] Product search/filter
- [ ] Sort options (price, name, stock)
- [ ] Wishlist feature
- [ ] Multiple images per product
- [ ] Reviews and ratings
- [ ] Pagination for products
- [ ] Dark mode toggle
- [ ] Multi-language support (i18n)
- [ ] PWA support

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
**Last Updated**: January 2026  
**Version**: 1.0.0
