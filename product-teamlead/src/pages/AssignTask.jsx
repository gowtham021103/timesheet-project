import React, { useEffect, useState } from "react";
import { getProjects, createTask } from "../api/api";
import { employees as sampleEmployees } from "../Sample-data"; // ✅ IMPORT SAMPLE DATA
import sampleProjects from "../Sample-projects";   // adjust path if needed

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
    // ✅ Load sample employees instead of API
    setEmployees(sampleEmployees);

    // Keep projects from API
    // ✅ Load sample projects
setProjects(sampleProjects);

  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createTask(task);
      alert("Task assigned successfully!");

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

      <form onSubmit={handleSubmit} className="assign-task-form">

        <div>
          <label>Project</label>
          <select name="project" value={task.project} onChange={handleChange}>
            <option value="">Select Project</option>
            {projects.map((p) => (
  <option key={p.id} value={p.title}>
    {p.title}
  </option>
))}

          </select>
        </div>

        <div>
          <label>Assign To</label>
          <select
            name="assigned_to"
            value={task.assigned_to}
            onChange={handleChange}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.department})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Assign Task</button>
        </div>

      </form>
    </div>
  );
}

export default AssignTask;
