// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===================== PROJECTS ===================== */

// Get all projects (optionally filter by status)
export const fetchProjects = async (status) => {
  const res = await API.get("/projects/", {
    params: status ? { status } : {},
  });
  return res.data;
};

// Create a new project
export const createProject = async (data) => {
  const res = await API.post("/projects/", data);
  return res.data;
};

/* ===================== MANAGERS ===================== */

// Get managers
export const fetchManagers = async () => {
  const res = await API.get("/managers/");
  return res.data;
};

/* ===================== ASSIGNMENTS ===================== */

// Assign project to manager
export const assignProject = async (data) => {
  const res = await API.post("/assign/", data);
  return res.data;
};

// List assignments
export const fetchAssignments = async () => {
  const res = await API.get("/assignments/");
  return res.data;
};

/* ===================== REPORTS ===================== */

// Get reports (optionally by project)
export const fetchReports = async (projectId) => {
  const res = await API.get("/reports/", {
    params: projectId ? { project_id: projectId } : {},
  });
  return res.data;
};

// Create report
export const createReport = async (data) => {
  const res = await API.post("/reports/", data);
  return res.data;
};
