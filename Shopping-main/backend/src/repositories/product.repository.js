import { products } from "../data/products.js";

export const findAllProducts = () => products;

export const findProductById = (id) =>
  products.find(p => p.id === id);

export const decreaseStock = (id, quantity) => {
  const product = findProductById(id);
  if (!product) throw new Error("Produit introuvable");
  if (product.stock < quantity) throw new Error("Stock insuffisant");

  product.stock -= quantity;
  return product;
};
