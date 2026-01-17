// src/store/CartProvider.jsx
import { useState } from "react";
import { CartContext } from "./CartContext";

/**
 * Provides cart state and actions to the app via context.
 * Wrap your app/components with <CartProvider> to access cart via useCart().
 */
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Array of cart items

  /**
   * Add a product to the cart
   * If it already exists, increase quantity by 1
   */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        // Update quantity if product already in cart
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      // Add new product to cart with quantity 1
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  /**
   * Remove a product from the cart by productId
   */
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  /**
   * Update the quantity of a cart item
   * If quantity <= 0, remove the item
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
