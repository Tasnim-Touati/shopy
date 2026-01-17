// api/axiosClient.js

// Centralized Axios instance for API calls
import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3001/api",
});
