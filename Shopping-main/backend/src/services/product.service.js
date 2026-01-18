import {
  findAllProducts,
  decreaseStock
} from "../repositories/product.repository.js";

// Récupère tous les produits disponibles
export const getAllProducts = () => {
  return findAllProducts();
};

// Réexporte la fonction decreaseStock pour la rendre accessible
export { decreaseStock };