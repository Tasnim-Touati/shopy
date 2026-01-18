// src/services/product.service.js
import products from "../data/products.js";  

export const getAllProducts = () => {
  return products;
};

export const getProductById = (id) => {
  return products.find(product => product.id === id || product.id === parseInt(id));
};