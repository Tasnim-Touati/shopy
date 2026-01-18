// src/controllers/product.controller.js
import { getAllProducts } from "../services/product.service.js";

// Récupère tous les produits
export const getProducts = (req, res) => {
  const products = getAllProducts();
  res.json(products);
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const products = getAllProducts();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: "Produit introuvable" });
  }

  // Get related products (exclude current product, limit to 3)
  const relatedProducts = products
    .filter((p) => p.id !== product.id) // Exclude current product
    .sort(() => 0.5 - Math.random()) // Randomize
    .slice(0, 3); // Take 3 products

  res.json({
    ...product,
    relatedProducts,
  });
};
