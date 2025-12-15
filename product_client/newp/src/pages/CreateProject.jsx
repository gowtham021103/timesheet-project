import React, { useState } from "react";
import "./CreateProject.css";

export default function CreateProject({ projects, setProjects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Not Started");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newProject = {
        id: Date.now(),
        title,
        description,
        status,
        assignedTo: "Unassigned",
        deadline: dueDate,
      };

      setProjects((prev) => [...prev, newProject]);

      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Not Started");

      setSuccess("Project created successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project card p-4">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Due date</label><br />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label>Status</label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Not Started">Not Started</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}

        <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
