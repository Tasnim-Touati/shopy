// src/services/order.service.js
import { products } from "../data/products.js";

export const calculateOrderPreview = (cart) => {
  let total = 0;
  const stockIssues = []; // Track all stock issues

  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`);
    }

    // Check stock but don't throw error yet - collect all issues
    if (product.stock < item.quantity) {
      stockIssues.push({
        productId: product.id,
        productName: product.name,
        requested: item.quantity,
        available: product.stock,
      });
    }

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

  // If there are stock issues, throw error with all issues
  if (stockIssues.length > 0) {
    const error = new Error("Stock insuffisant pour certains produits");
    error.stockIssues = stockIssues;
    throw error;
  }

  return { items, total };
};

// NEW: Actually create the order and update stock
export const createOrder = (cart) => {
  // First validate everything (same as preview)
  let total = 0;
  const items = [];
  const stockIssues = [];

  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`);
    }

    // Check stock and collect issues
    if (product.stock < item.quantity) {
      stockIssues.push({
        productId: product.id,
        productName: product.name,
        requested: item.quantity,
        available: product.stock,
      });
    }

    const subTotal = product.price * item.quantity;
    total += subTotal;

    items.push({
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
      subTotal,
    });
  }

  // If there are stock issues, throw error with all issues
  if (stockIssues.length > 0) {
    const error = new Error("Stock insuffisant pour certains produits");
    error.stockIssues = stockIssues;
    throw error;
  }

  // If we got here, everything is valid - now update stock
  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);
    product.stock -= item.quantity;
  }

  // Generate order confirmation
  const order = {
    orderId: `ORD-${Date.now()}`,
    items,
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  return order;
};
