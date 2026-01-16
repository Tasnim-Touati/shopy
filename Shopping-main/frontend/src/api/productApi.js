import axios from "axios";

const API_URL = "http://localhost:3001/api/products";

export const fetchProducts = () => axios.get(API_URL).then((res) => res.data);

export const createOrder = (cart) =>
  axios.post(`${API_URL}/order`, { cart }).then((res) => res.data);
