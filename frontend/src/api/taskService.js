import axiosClient from "./axiosClient";

// Get all tasks
export const getTasks = () => {
  return axiosClient.get("tasks/");
};

// Get single task
export const getTask = (id) => {
  return axiosClient.get(`tasks/${id}/`);
};

// Assign a new task
export const assignTask = (data) => {
  return axiosClient.post("tasks/", data);
};

// Update task status (approve/reject)
export const updateTask = (id, data) => {
  return axiosClient.patch(`tasks/${id}/`, data);
};

// Delete task
export const deleteTask = (id) => {
  return axiosClient.delete(`tasks/${id}/`);
};