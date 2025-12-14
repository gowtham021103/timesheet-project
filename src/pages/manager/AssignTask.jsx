import { useEffect, useState } from "react";
import { getEmployees } from "../../api/employeeService";
import { assignTask } from "../../api/taskService";
import "./manager.css";

const AssignTask = () => {
  const [employees, setEmployees] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    employeeId: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employees for dropdown
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.employeeId || !taskData.dueDate) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await assignTask(taskData);
      alert("Task assigned successfully!");
      setTaskData({ title: "", description: "", employeeId: "", dueDate: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to assign task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-container">
      <h2 className="page-heading">Assign Task</h2>
      {error && <p className="error-msg">{error}</p>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <label>Task Title *</label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={taskData.title}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Task description"
            value={taskData.description}
            onChange={handleChange}
          />

          <label>Assign To *</label>
          <select name="employeeId" value={taskData.employeeId} onChange={handleChange}>
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <label>Due Date *</label>
          <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Assigning..." : "Assign Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
