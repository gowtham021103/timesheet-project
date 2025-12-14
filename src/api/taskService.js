import axiosInstance from "./axiosInstance";

// Get all tasks
export const getTasks = () => {
  return axiosInstance.get("/tasks/");
};

// Assign a new task
export const assignTask = (data) => {
  return axiosInstance.post("/tasks/", data);
};

// Update task status (approve/reject)
export const updateTask = (id, data) => {
  return axiosInstance.patch(`/tasks/${id}/`, data);
};

// Delete task
export const deleteTask = (id) => {
  return axiosInstance.delete(`/tasks/${id}/`);
};
