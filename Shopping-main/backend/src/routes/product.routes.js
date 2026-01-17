import express from "express";
import { getProducts } from "../controllers/product.controller.js";

// Crée un routeur Express pour les produits
const router = express.Router();

// Route pour récupérer tous les produits
router.get("/", getProducts);

export default router;