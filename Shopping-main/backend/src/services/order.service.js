import { products } from "../data/products.js";

// Calcule un aperçu de la commande sans modifier le stock
export const calculateOrderPreview = (cart) => {
  let total = 0;
  const stockIssues = [];

  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`);
    }

    // Collecte les problèmes de stock sans bloquer
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

  // Lance une erreur si stock insuffisant
  if (stockIssues.length > 0) {
    const error = new Error("Stock insuffisant pour certains produits");
    error.stockIssues = stockIssues;
    throw error;
  }

  return { items, total };
};

// Crée la commande et met à jour le stock
export const createOrder = (cart) => {
  let total = 0;
  const items = [];
  const stockIssues = [];

  // Validation des produits et du stock
  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`);
    }

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

  // Lance une erreur si stock insuffisant
  if (stockIssues.length > 0) {
    const error = new Error("Stock insuffisant pour certains produits");
    error.stockIssues = stockIssues;
    throw error;
  }

  // Met à jour le stock des produits
  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);
    product.stock -= item.quantity;
  }

  // Génère la confirmation de commande
  const order = {
    orderId: `ORD-${Date.now()}`,
    items,
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  return order;
};