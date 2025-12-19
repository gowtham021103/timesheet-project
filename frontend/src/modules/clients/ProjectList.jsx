import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./ProjectList.css";

export default function ProjectList({ projects: propProjects }) {
  const outlet = useOutletContext();
  const projects = propProjects ?? outlet?.projects ?? [];

  const [status, setStatus] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const src = projects || [];
    if (status === "") {
      setFilteredProjects(src);
    } else {
      setFilteredProjects(src.filter((p) => p.status === status));
    }
  }, [status, projects]);

  return (
    <div className="project-list">
      <h2>Projects</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Filter by status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Not Started">Not Started</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => (
              <tr key={p.id}>
                <td data-label="Title">{p.title}</td>
                <td data-label="Status">{p.status}</td>
                <td data-label="Assigned To">{p.assignedTo}</td>
                <td data-label="Deadline">{p.deadline}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
