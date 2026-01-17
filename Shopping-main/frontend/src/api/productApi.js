// src/api/productApi.js
import axios from "axios";

// Base URL for product-related API endpoints
const API_URL = "http://localhost:3001/api/products";

// Fetches the list of products from the backend
export const fetchProducts = () => axios.get(API_URL).then((res) => res.data);

// Creates a new order with the given cart data
export const createOrder = (cart) =>
  axios.post(`${API_URL}/order`, { cart }).then((res) => res.data);
