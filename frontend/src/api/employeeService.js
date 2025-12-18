import axiosInstance from "./axiosInstance";

// Get all employees
export const getEmployees = () => {
  return axiosInstance.get("/employees/");
};

// Create employee
export const createEmployee = (data) => {
  return axiosInstance.post("/employees/", data);
};

// Update employee
export const updateEmployee = (id, data) => {
  return axiosInstance.put(`/employees/${id}/`, data);
};

// Delete employee
export const deleteEmployee = (id) => {
  return axiosInstance.delete(`/employees/${id}/`);
};