import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

// Create Task (fixed & unified)
export const createTask = (data) => API.post("/tasks/", data);

// API Calls
export const getEmployees = () => API.get("/api/employees/");
export const getTasks = () => API.get("/api//tasks/");
export const getProjects = () => API.get("/api/projects/");
export const getTimesheets = () => API.get("/api/timesheets/");
export const updateTimesheet = (id, data) => API.put(`/api/timesheets/${id}/`, data);

export default API;
