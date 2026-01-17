// Valide les articles d'une commande avant traitement
export const validateOrder = (items) => {
  // Vérifie que items est un tableau et qu'il n'est pas vide
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  items.forEach(item => {
    // Vérifie que l'article a un productId, une quantity, et que la quantity est positive
    if (!item.productId || !item.quantity || item.quantity <= 0) {
      throw new Error("Invalid order item");
    }
  });
};