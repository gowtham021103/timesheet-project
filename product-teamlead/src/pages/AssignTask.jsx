import React, { useEffect, useState } from "react";
import { getEmployees, getProjects, createTask } from "../api/api";

function AssignTask() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  const [task, setTask] = useState({
    project: "",
    assigned_to: "",
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res.data));
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await createTask(task);
      alert("Task assigned successfully!");

      // Reset the form
      setTask({
        project: "",
        assigned_to: "",
        title: "",
        description: "",
        deadline: "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to assign task.");
    }
  };

  return (
    <div className="assign-task-container">
      <h2>Assign Task</h2>

      <form onSubmit={handleSubmit}>

        {/* Project Selector */}
        <label>Project</label>
        <select
          name="project"
          value={task.project}
          onChange={handleChange}
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Employee Selector */}
        <label>Assign To</label>
        <select
          name="assigned_to"
          value={task.assigned_to}
          onChange={handleChange}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* Title */}
        <label>Task Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />

        {/* Deadline */}
        <label>Deadline</label>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
        />

        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
}

export default AssignTask;
