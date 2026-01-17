import {
  calculateOrderPreview,
  createOrder,
} from "../services/order.service.js";

/**
 * Prévisualise une commande (calcule le total sans modifier le stock)
 */
export const previewOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    // Validation du panier
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Le panier est vide" });
    }

    const orderPreview = calculateOrderPreview(cart);
    res.json(orderPreview);
  } catch (err) {
    if (err.stockIssues) {
      return res.status(400).json({
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }
    res.status(400).json({ message: err.message });
  }
};

/**
 * Crée une commande (valide et diminue le stock)
 */
export const createOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    // Validation du panier
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Le panier est vide" });
    }

    const order = createOrder(cart);
    res.status(201).json(order);
  } catch (err) {
    if (err.stockIssues) {
      return res.status(400).json({
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }
    res.status(400).json({ message: err.message });
  }
};