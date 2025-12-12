// src/components/ClientReports.jsx
import React, { useEffect, useState } from "react";
import { fetchProjects, fetchReports, createReport } from "../api/api";
import "./ClientReports.css";

export default function ClientReports() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [reports, setReports] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=> { loadProjects(); }, []);

  async function loadProjects() {
    const pr = await fetchProjects(); // show all projects
    setProjects(pr);
  }

  async function loadReportsForProject(projectId) {
    setLoading(true);
    try {
      const r = await fetchReports(projectId);
      setReports(r);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function onProjectChange(e) {
    const id = e.target.value;
    setSelectedProject(id);
    if (id) loadReportsForProject(id);
    else setReports([]);
  }

  async function handleCreateReport(e) {
    e.preventDefault();
    if (!selectedProject) return;
    try {
      const payload = { project_id: Number(selectedProject), title: newTitle, content: newContent };
      await createReport(payload);
      setNewTitle(""); setNewContent("");
      loadReportsForProject(selectedProject);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="client-reports card p-4">
      <h2>Project Reports</h2>

      <div>
        <label>Choose project</label>
        <select value={selectedProject} onChange={onProjectChange}>
          <option value="">-- Select project --</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.title} ({p.status})</option>)}
        </select>
      </div>

      <div style={{marginTop:12}}>
        <h3>Reports</h3>
        {loading && <div>Loading reports...</div>}
        {reports.length === 0 && !loading && <div>No reports found</div>}
        <ul>
          {reports.map(r => (
            <li key={r.id}>
              <strong>{r.title}</strong> — <small>{new Date(r.created_at).toLocaleString()}</small>
              <div>{r.content}</div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{marginTop:20}}>
        <h3>Create report</h3>
        <form onSubmit={handleCreateReport}>
          <div>
            <label>Title</label><br />
            <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} required />
          </div>
          <div>
            <label>Content</label><br />
            <textarea value={newContent} onChange={e=>setNewContent(e.target.value)} required/>
          </div>
          <button type="submit" disabled={!selectedProject}>Create Report</button>
        </form>
      </div>
    </div>
  );
}
