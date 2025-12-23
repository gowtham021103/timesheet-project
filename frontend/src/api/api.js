import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Attach JWT token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =====================
// API Calls
// =====================

// Employees
export const getEmployees = () => API.get("/accounts/employees/");

// Tasks
export const getTasks = () => API.get("/tasks/");
export const createTask = (data) => API.post("/tasks/", data);

// Projects
export const getProjects = () => API.get("/projects/");

// Timesheets
export const getTimesheets = () => API.get("/timesheets/");
export const updateTimesheet = (id, data) =>
  API.put(`/timesheets/${id}/`, data);

// Payroll
export const getPayroll = () => API.get("/payroll/");
export const createPayroll = (data) => API.post("/payroll/", data);

export default API;
