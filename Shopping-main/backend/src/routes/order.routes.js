import express from "express";
import rateLimit from "express-rate-limit";
import {
  previewOrderController,
  createOrderController,
} from "../controllers/order.controller.js";
import { validateOrderMiddleware } from "../validators/order.validator.js";

const router = express.Router();

// Rate limiter spécifique pour les commandes (plus restrictif)
const orderLimiter = rateLimit({
  windowMs: parseInt(process.env.ORDER_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.ORDER_RATE_LIMIT_MAX_ORDERS) || 10,
  message: "Trop de commandes depuis cette IP. Veuillez réessayer dans 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * POST /api/orders/preview
 * Prévisualise une commande sans modifier le stock
 */
router.post(
  "/preview",
  validateOrderMiddleware,
  previewOrderController
);

/**
 * POST /api/orders
 * Crée une nouvelle commande et met à jour le stock
 */
router.post(
  "/",
  orderLimiter,
  validateOrderMiddleware,
  createOrderController
);

export default router;