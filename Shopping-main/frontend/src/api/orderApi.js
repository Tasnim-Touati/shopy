// src/api/orderApi.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/orders";

export const previewOrder = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/preview`, payload);
    return res.data;
  } catch (error) {
    console.error("Error previewing order:", error.response?.data || error.message);
    throw error;
  }
};

export const submitOrder = async (payload) => {
  try {
    const res = await axios.post(API_URL, payload); // ← IMPORTANT : pas de "/create"
    return res.data;
  } catch (error) {
    console.error("Error submitting order:", error.response?.data || error.message);
    throw error;
  }
};