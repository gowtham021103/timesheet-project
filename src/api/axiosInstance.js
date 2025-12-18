import axios from "axios";

// Base Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Django API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or wherever you store JWT
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;