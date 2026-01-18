import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";

// Crée un routeur Express pour les produits
const router = express.Router();

// Route pour récupérer tous les produits
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;