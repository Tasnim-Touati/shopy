import { products } from "../data/products.js";

export const calculateOrderPreview = (cart) => {
  let total = 0;

  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`); // ← Fixed parentheses
    }

    if (product.stock < item.quantity) {
      throw new Error(`Stock insuffisant pour ${product.name}`); // ← Fixed parentheses
    }

    const subTotal = product.price * item.quantity;
    total += subTotal;

    return {
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      subTotal,
    };
  });

  return { items, total };
};

// NEW: Actually create the order and update stock
export const createOrder = (cart) => {
  // First validate everything (same as preview)
  let total = 0;
  const items = [];

  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`); // ← Fixed parentheses
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Stock insuffisant pour ${product.name}. Disponible: ${product.stock}`
      );
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
