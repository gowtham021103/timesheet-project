import React, { useEffect, useState } from "react";
import sampleProjects from "../Sample-projects";
import "./ProjectList.css";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    load();
  }, [status]);

  function load() {
    let filtered = sampleProjects;

    if (status) {
      filtered = sampleProjects.filter(p =>
        p.status.toLowerCase() === status.toLowerCase()
      );
    }

    setProjects(filtered);
  }

  return (
    <div className="project-list card p-4">
      <h2>Projects</h2>

      <div>
        <label>Filter by status: </label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Not Started">Not Started</option>
        </select>
      </div>

      <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Deadline</th>
          </tr>
        </thead>

        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.status}</td>
              <td>{p.assignedTo}</td>
              <td>{p.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
