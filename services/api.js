// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL:"https://fratelli-back.vercel.app/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
