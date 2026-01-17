// src/api/orderApi.js
import axios from "axios";

/**
 * Sends order data to the backend to get a preview
 * (prices, totals, validation) without creating the order.
 *
 * @param {Object} payload - Order data (cart items, user info, etc.)
 * @returns {Promise<Object>} Preview result from the backend
 */

export const previewOrder = async (payload) => {
  const res = await axios.post(
    "http://localhost:3001/api/orders/preview",
    payload,
  );
  return res.data;
};

/**
 * Submits the final order to the backend
 * This actually creates the order in the database.
 *
 * @param {Object} payload - Final order data
 * @returns {Promise<Object>} Created order response
 */
export const submitOrder = async (payload) => {
  const res = await axios.post(
    "http://localhost:3001/api/orders/create",
    payload,
  );
  return res.data;
};
