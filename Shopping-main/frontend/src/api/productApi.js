// src/api/productApi.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/products";

/**
 * Fetches the list of all products from the backend
 * @returns {Promise<Array>} Array of products
 */
export const fetchProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetches a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error.response?.data || error.message);
    throw error;
  }
};