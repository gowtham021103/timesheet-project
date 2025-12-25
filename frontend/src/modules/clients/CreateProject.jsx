import React, { useState } from "react";
import { createProject } from "../../api/projectService";
import { useOutletContext } from "react-router-dom";
import "./CreateProject.css";

export default function CreateProject({ setProjects: propSetProjects }) {
  const outlet = useOutletContext();
  const setProjects = propSetProjects || outlet?.setProjects || (() => { });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Not Started");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createProject({
        name: title, // Backend expects 'name'
        description,
        status,
        deadline: dueDate || null,
      });

      // `createProject` returns the response object, data is inside response.data
      setProjects((prev) => [...prev, response.data]);

      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Not Started");

      // Show success message
      setSuccess("Project created successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Create project error:", err);
      setError(
        err.response?.data?.detail ||
        err.response?.data ||
        err.message ||
        "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project card p-4">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
