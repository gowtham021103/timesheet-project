import React, { useEffect, useState } from "react";
import { getProjects } from "../../api/projectService";
import { getTimesheets } from "../../api/timesheetApi";
import "./ClientReports.css";

export default function ClientReports() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
    loadTimesheets();
  }, []);

  async function loadProjects() {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  }

  async function loadTimesheets() {
    setLoading(true);
    try {
      const res = await getTimesheets();
      setTimesheets(res.data);
    } catch (err) {
      console.error("Failed to load timesheets", err);
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  // Filter timesheets based on selected project
  const filteredTimesheets = selectedProject
    ? timesheets.filter(t => t.project_id === Number(selectedProject))
    : timesheets;

  return (
    <div className="client-reports card p-4">
      <h2>Project Activity Reports</h2>

      {error && <p className="error">{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <label>Filter by Project: </label>
        <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="">-- All Projects --</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>
              {p.title || p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="reports-table-container">
        {loading ? (
          <div>Loading data...</div>
        ) : filteredTimesheets.length === 0 ? (
          <div className="no-data">No activity found.</div>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Project</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimesheets.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.employee_name}</td>
                  <td>{t.project_title}</td>
                  <td>{t.task_title}</td>
                  <td>{t.hours}</td>
                  <td>
                    <span className={`status-badge ${t.approved ? 'active' : 'pending'}`}>
                      {t.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
