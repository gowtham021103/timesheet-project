import axiosClient from "./axiosClient";

// Get all employees
export const getEmployees = () => {
  return axiosClient.get("accounts/employees/");
};

// Create employee
export const createEmployee = (data) => {
  return axiosClient.post("accounts/employees/create/", data);
};

// Update employee
export const updateEmployee = (id, data) => {
  return axiosClient.put(`accounts/employees/${id}/`, data);
};

// Delete employee
export const deleteEmployee = (id) => {
  return axiosClient.delete(`accounts/employees/${id}/`);
};
