import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { updateProject } from "../../api/projectService";
import "./AssignProject.css";

export default function AssignProject({ onAssigned, projects: propProjects, setProjects: propSetProjects }) {
  const outlet = useOutletContext();
  const projects = propProjects ?? outlet?.projects ?? [];
  const setProjects = propSetProjects ?? outlet?.setProjects ?? (() => { });

  const [assignableProjects, setAssignableProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch managers from backend
  useEffect(() => {
    const loadManagers = async () => {
      try {
        const res = await axiosClient.get("/accounts/managers/");
        setManagers(res.data);
      } catch (err) {
        console.error("Failed to fetch managers", err);
        setManagers([]); // fallback to empty array
      }
    };

    loadManagers();
  }, []);

  // Filter projects that are not completed
  useEffect(() => {
    const filtered = (projects || []).filter((p) => p.status !== "Completed");
    setAssignableProjects(filtered);
  }, [projects]);

  async function handleAssign(e) {
    e.preventDefault();

    if (!selectedProject || !selectedManager) {
      setError("Please select both Project and Manager");
      return;
    }

    const assignedProject = assignableProjects.find(p => p.id === Number(selectedProject));
    const assignedManager = managers.find(m => m.id === Number(selectedManager));

    try {
      await updateProject(assignedProject.id, {
        team_lead: assignedManager.id
      });

      const result = { project: assignedProject, manager: assignedManager, notes };

      // Callback to parent
      onAssigned && onAssigned(result);

      // Update global projects list
      setProjects(prev =>
        (prev || []).map(p =>
          p.id === Number(selectedProject) ? { ...p, team_lead: assignedManager.id, assignedTo: assignedManager.username } : p
        )
      );

      // Remove assigned project from local dropdown
      setAssignableProjects(prev => prev.filter(p => p.id !== Number(selectedProject)));

      // Show success message
      setSuccess(`Project "${assignedProject.title || assignedProject.name}" assigned to ${assignedManager.username}!`);
      setTimeout(() => setSuccess(null), 3000);

      // Reset form
      setSelectedProject("");
      setSelectedManager("");
      setNotes("");
      setError(null);
    } catch (err) {
      console.error("Assign project failed:", err);
      setError("Failed to assign project. " + (err.response?.data?.detail || err.message));
    }
  }

  return (
    <div className="assign-project">
      <h2>Assign Project</h2>

      <form onSubmit={handleAssign}>
        {/* Project dropdown */}
        <div>
          <label>Project</label><br />
          <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
            <option value="">-- Select project --</option>
            {assignableProjects.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.status})
              </option>
            ))}
          </select>
        </div>

        {/* Manager dropdown */}
        <div>
          <label>Manager</label><br />
          <select value={selectedManager} onChange={e => setSelectedManager(e.target.value)}>
            <option value="">-- Select manager --</option>
            {managers.map(m => (
              <option key={m.id} value={m.id}>
                {m.username}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label>Notes</label><br />
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional notes..." />
        </div>

        {/* Error & Success */}
        {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: "8px" }}>{success}</div>}

        <button type="submit" style={{ marginTop: "10px" }}>Assign</button>
      </form>
    </div>
  );
}
