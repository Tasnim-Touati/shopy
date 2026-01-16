import {
  findAllProducts,
  decreaseStock
} from "../repositories/product.repository.js";

export const getAllProducts = () => {
  return findAllProducts();
};

export { decreaseStock };
