import axios from "axios";

export const previewOrder = async (payload) => {
  const res = await axios.post(
    "http://localhost:3001/api/orders/preview",
    payload
  );
  return res.data;
};
