// src/controllers/order.controller.js
import {
  calculateOrderPreview,
  createOrder,
} from "../services/order.service.js";

export const previewOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Le panier est vide" });
    }

    const orderPreview = calculateOrderPreview(cart);
    res.json(orderPreview);
  } catch (err) {
    // Check if error has stockIssues
    if (err.stockIssues) {
      return res.status(400).json({
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }
    res.status(400).json({ message: err.message });
  }
};

// NEW: Controller for creating the actual order
export const createOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Le panier est vide" });
    }

    const order = createOrder(cart);
    res.status(201).json(order);
  } catch (err) {
    // Check if error has stockIssues
    if (err.stockIssues) {
      return res.status(400).json({
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }
    res.status(400).json({ message: err.message });
  }
};
