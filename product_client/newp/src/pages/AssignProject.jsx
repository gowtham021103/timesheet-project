// src/components/AssignProject.jsx
import React, { useEffect, useState } from "react";
import { fetchManagers, fetchProjects, assignProject } from "../api/api";
import "./AssignProject.css";

export default function AssignProject({ onAssigned }) {
  const [managers, setManagers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const mgrs = await fetchManagers();
        setManagers(mgrs);
        // Fetch only projects in draft or created state to assign
        const pr = await fetchProjects('draft'); // or status that you consider assignable
        setProjects(pr);
      } catch (err) {
        console.error(err);
        setError("Failed to load managers or projects");
      }
    })();
  }, []);

  async function handleAssign(e) {
    e.preventDefault();
    if (!selectedManager || !selectedProject) {
      setError("Select both manager and project.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = {
        project_id: Number(selectedProject),
        manager_id: Number(selectedManager),
        notes
      };
      const result = await assignProject(payload);
      onAssigned && onAssigned(result);
      // refresh local projects list
      setProjects((p) => p.filter(pr => pr.id !== Number(selectedProject)));
      setSelectedManager("");
      setSelectedProject("");
      setNotes("");
    } catch (err) {
      console.error(err);
      setError("Assignment failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="assign-project card p-4">
      <h2>Assign Project</h2>
      <form onSubmit={handleAssign}>
        <div>
          <label>Project</label><br />
          <select value={selectedProject} onChange={e=>setSelectedProject(e.target.value)}>
            <option value="">-- Select project --</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.title} ({p.status})</option>)}
          </select>
        </div>

        <div>
          <label>Manager</label><br />
          <select value={selectedManager} onChange={e=>setSelectedManager(e.target.value)}>
            <option value="">-- Select manager --</option>
            {managers.map(m => <option key={m.id} value={m.id}>{m.username}</option>)}
          </select>
        </div>

        <div>
          <label>Notes</label><br />
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>

        {error && <div style={{color:'red'}}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Assigning...' : 'Assign'}</button>
      </form>
    </div>
  );
}
