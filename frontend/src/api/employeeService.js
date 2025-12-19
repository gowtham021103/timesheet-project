import axiosClient from "./axiosClient";

// Get all employees
export const getEmployees = () => {
  return axiosClient.get("/employees/");
};

// Create employee
export const createEmployee = (data) => {
  return axiosClient.post("/employees/", data);
};

// Update employee
export const updateEmployee = (id, data) => {
  return axiosClient.put(`/employees/${id}/`, data);
};

// Delete employee
export const deleteEmployee = (id) => {
  return axiosClient.delete(`/employees/${id}/`);
};