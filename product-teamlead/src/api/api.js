import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});
<<<<<<< HEAD

// Create Task (fixed & unified)
export const createTask = (data) => API.post("/tasks/", data);

// API Calls
export const getEmployees = () => API.get("/api/employees/");
export const getTasks = () => API.get("/api/tasks/");
export const getProjects = () => API.get("/api/projects/");
export const getTimesheets = () => API.get("/api/timesheets/");
export const updateTimesheet = (id, data) => API.put(`/api/timesheets/${id}/`, data);

export default API;
 
=======
export const createTask = (taskData) => {
  return axios.post("/tasks", taskData);
};

// Example API calls
export const getEmployees = () => API.get("/employees/");
export const getTasks = () => API.get("/tasks/");
export const createTask = (data) => API.post("/tasks/", data);
export const getProjects = () => API.get("/projects/");
export const getTimesheets = () => API.get("/timesheets/");
export const updateTimesheet = (id, data) => API.put(`/timesheets/${id}/`, data);

export default API;
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
