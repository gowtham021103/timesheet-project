// src/components/ProjectList.jsx
import React, { useEffect, useState } from "react";
import { fetchProjects, fetchAssignments } from "../api/api";
import "./ProjectList.css";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [status, setStatus] = useState(""); // '', 'assigned', 'completed', etc.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, [status]);

  async function load() {
    setLoading(true);
    try {
      const pr = await fetchProjects(status || undefined);
      setProjects(pr);
      const a = await fetchAssignments();
      setAssignments(a);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getAssignmentForProject(projectId) {
    return assignments.find(a => a.project && a.project.id === projectId);
  }

  return (
    <div className="project-list card p-4">
      <h2>Projects</h2>

      <div>
        <label>Filter by status: </label>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={load} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button>
      </div>

      <table style={{width:'100%', marginTop: 12, borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th style={{textAlign:'left'}}>Title</th>
            <th>Status</th>
            <th>Manager</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => {
            const asg = getAssignmentForProject(p.id);
            return (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.status}</td>
                <td>{asg && asg.manager ? asg.manager.username : '-'}</td>
                <td>{p.due_date || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
