// src/services/order.service.js
import { products } from "../data/products.js";

export const calculateOrder = (cart) => {
  let total = 0;

  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error("Produit introuvable");

    const subTotal = product.price * item.quantity;
    total += subTotal;

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subTotal,
    };
  });

  return { items, total };
};
