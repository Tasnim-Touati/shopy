// src/controllers/order.controller.js
import { calculateOrder } from "../services/order.service.js";

export const previewOrder = (req, res) => {
  const { cart } = req.body;
  const order = calculateOrder(cart);
  res.json(order);
};
