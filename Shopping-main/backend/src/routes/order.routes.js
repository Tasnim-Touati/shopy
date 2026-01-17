import express from "express";
import {
  previewOrderController,
  createOrderController,
} from "../controllers/order.controller.js";

// Crée un routeur Express pour les commandes
const router = express.Router();

// Route pour prévisualiser une commande (calcul sans validation finale)
router.post("/preview", previewOrderController);

// Route pour créer une commande (validation et mise à jour du stock)
router.post("/create", createOrderController);

export default router;