import React, { useEffect, useState } from "react";
import sampleManagers from "../Sample-managers";
import "./AssignProject.css";

export default function AssignProject({ projects, setProjects, onAssigned }) {
  const [assignableProjects, setAssignableProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Show only projects that are not completed
    const filtered = projects.filter(p => p.status !== "Completed");
    setAssignableProjects(filtered);

    setManagers(sampleManagers);
  }, [projects]);

  function handleAssign(e) {
    e.preventDefault();

    if (!selectedProject || !selectedManager) {
      setError("Please select both Project and Manager");
      return;
    }

    const assignedProject = assignableProjects.find(
      p => p.id === Number(selectedProject)
    );

    const assignedManager = managers.find(
      m => m.id === Number(selectedManager)
    );

    const result = {
      project: assignedProject,
      manager: assignedManager,
      notes
    };

    onAssigned && onAssigned(result);

    // Optionally mark the project as assigned (remove from dropdown)
    setAssignableProjects(prev =>
      prev.filter(p => p.id !== Number(selectedProject))
    );

    // Optionally update the main projects list to reflect assignment
    setProjects(prev =>
      prev.map(p =>
        p.id === Number(selectedProject)
          ? { ...p, assignedTo: assignedManager.username }
          : p
      )
    );

    setSelectedProject("");
    setSelectedManager("");
    setNotes("");
    setError(null);
  }

  return (
    <div className="assign-project">
      <h2>Assign Project</h2>

      <form onSubmit={handleAssign}>
        {/* Project dropdown */}
        <div>
          <label>Project</label><br />
          <select
            value={selectedProject}
            onChange={e => setSelectedProject(e.target.value)}
          >
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
          <select
            value={selectedManager}
            onChange={e => setSelectedManager(e.target.value)}
          >
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
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Optional notes..."
          />
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit">Assign</button>
      </form>
    </div>
  );
}
