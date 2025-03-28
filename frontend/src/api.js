import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Use Render backend URL instead of Choreo
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api"; // Fallback for local dev

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
