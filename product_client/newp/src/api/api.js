// src/api.js
const API_BASE = "http://localhost:8000/api";

export async function fetchManagers() {
  const res = await fetch(`${API_BASE}/managers/`);
  return res.json();
}

export async function fetchProjects(status) {
  const q = status ? `?status=${status}` : '';
  const res = await fetch(`${API_BASE}/projects/${q}`);
  return res.json();
}

export async function createProject(payload) {
  const res = await fetch(`${API_BASE}/projects/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function assignProject(payload) {
  const res = await fetch(`${API_BASE}/assign/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchAssignments() {
  const res = await fetch(`${API_BASE}/assignments/`);
  return res.json();
}

export async function fetchReports(projectId) {
  const q = projectId ? `?project_id=${projectId}` : '';
  const res = await fetch(`${API_BASE}/reports/${q}`);
  return res.json();
}

export async function createReport(payload) {
  const res = await fetch(`${API_BASE}/reports/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}
