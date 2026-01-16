import { getAllProducts } from "../services/product.service.js";

export const getProducts = (req, res) => {
  res.json(getAllProducts());
};
