import { getAllProducts } from "../services/product.service.js";

/**
 * Récupère tous les produits
 */
export const getProducts = (req, res) => {
  const products = getAllProducts();
  res.json(products);
};