export const validateOrder = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  items.forEach(item => {
    if (!item.productId || !item.quantity || item.quantity <= 0) {
      throw new Error("Invalid order item");
    }
  });
};
