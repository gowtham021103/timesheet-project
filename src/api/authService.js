import axiosInstance from "./axiosInstance";

// Login
export const login = (credentials) => {
  return axiosInstance.post("/auth/login/", credentials);
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};
