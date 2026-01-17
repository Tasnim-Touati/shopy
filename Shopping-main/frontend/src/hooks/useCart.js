// src/hooks/useCart.js
import { useContext } from "react";
import { CartContext } from "../store/CartContext";

/* Custom hook to access cart state and actions*/
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }
  return context;
};
