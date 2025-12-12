// src/components/CreateProject.jsx
import React, { useState } from "react";
import { createProject } from "../api/api";
import "./CreateProject.css";
export default function CreateProject({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { title, description, due_date: dueDate || null };
      const result = await createProject(payload);
      // result is the created project
      setTitle("");
      setDescription("");
      setDueDate("");
      onCreated && onCreated(result);
    } catch (err) {
      setError("Failed to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-project card p-4">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br/>
          <input value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label><br/>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div>
          <label>Due date</label><br/>
          <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        </div>
        {error && <div style={{color:'red'}}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Project"}</button>
      </form>
    </div>
  );
}
