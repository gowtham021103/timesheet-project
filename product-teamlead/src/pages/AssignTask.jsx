import React, { useEffect, useState } from "react";
import { getProjects, createTask } from "../api/api";
import { employees as sampleEmployees } from "../Sample-data";
import sampleProjects from "../Sample-projects";
import "./AssignTask.css";

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
    setEmployees(sampleEmployees);
    setProjects(sampleProjects);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      project: Number(task.project),
      assigned_to: Number(task.assigned_to),
      title: task.title,
      description: task.description,
      deadline: task.deadline, // already in YYYY-MM-DD from input
    };

    try {
      await createTask(payload);
      alert("Task assigned successfully!");

      setTask({
        project: "",
        assigned_to: "",
        title: "",
        description: "",
        deadline: "",
      });
    } 
    catch(error) {
  console.error("Full Backend Error:", error.response?.data);
  alert(JSON.stringify(error.response?.data, null, 2));
}

  };

  return (
    <div className="assign-task-container">
      <h2>Assign Task</h2>

      <form onSubmit={handleSubmit} className="assign-task-form">

        {/* PROJECT */}
        <div>
          <label>Project</label>
          <select
            name="project"
            value={task.project}
            onChange={handleChange}
            required
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* ASSIGN EMPLOYEE */}
        <div>
          <label>Assign To</label>
          <select
            name="assigned_to"
            value={task.assigned_to}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.department})
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <div>
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* DEADLINE */}
        <div>
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
}

export default AssignTask;
