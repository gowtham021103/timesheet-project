import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axiosClient from "../../api/api"; // your axios instance
import "./ClientReports.css";

export default function ClientReports() {
  const outlet = useOutletContext(); // optional for extra projects
  const outletProjects = outlet?.projects ?? [];

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [reports, setReports] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Load projects from backend
  useEffect(() => {
    async function loadProjects() {
      setLoadingProjects(true);
      try {
        const res = await axiosClient.get("/projects/"); // adjust endpoint
        // Merge backend projects + any outletProjects
        const map = new Map();
        res.data.forEach(p => map.set(p.id, p));
        outletProjects.forEach(p => map.set(p.id, p));
        setProjects(Array.from(map.values()));
      } catch (err) {
        console.error("Failed to load projects", err);
        setError("Failed to load projects");
      } finally {
        setLoadingProjects(false);
      }
    }

    loadProjects();
  }, [outletProjects]);

  // 🔄 Load reports for selected project
  async function loadReportsForProject(projectId) {
    if (!projectId) return;
    setLoadingReports(true);
    try {
      const res = await axiosClient.get(`/projects/${projectId}/reports/`); // adjust endpoint
      setReports(res.data);
    } catch (err) {
      console.error("Failed to load reports", err);
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  }

  function onProjectChange(e) {
    const id = e.target.value;
    setSelectedProject(id);
    if (id) loadReportsForProject(id);
    else setReports([]);
  }

  // 🔐 Create a new report
  async function handleCreateReport(e) {
    e.preventDefault();
    if (!selectedProject) return;
    try {
      const payload = {
        project_id: Number(selectedProject),
        title: newTitle,
        content: newContent,
      };

      const res = await axiosClient.post(`/projects/${selectedProject}/reports/`, payload); // adjust endpoint
      setReports(prev => [...prev, res.data]);

      setNewTitle("");
      setNewContent("");
    } catch (err) {
      console.error("Failed to create report", err);
    }
  }

  return (
    <div className="client-reports card p-4">
      <h2>Project Reports</h2>

      {error && <p className="error">{error}</p>}

      <div>
        <label>Choose project</label>
        {loadingProjects ? (
          <div>Loading projects...</div>
        ) : (
          <select value={selectedProject} onChange={onProjectChange}>
            <option value="">-- Select project --</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.status})
              </option>
            ))}
          </select>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Reports</h3>
        {loadingReports && <div>Loading reports...</div>}
        {!loadingReports && reports.length === 0 && <div>No reports found</div>}
        <ul>
          {reports.map(r => (
            <li key={r.id}>
              <strong>{r.title}</strong> —{" "}
              <small>{new Date(r.created_at).toLocaleString()}</small>
              <div>{r.content}</div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Create report</h3>
        <form onSubmit={handleCreateReport}>
          <div>
            <label>Title</label>
            <br />
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content</label>
            <br />
            <textarea
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={!selectedProject}>
            Create Report
          </button>
        </form>
      </div>
    </div>
  );
}
