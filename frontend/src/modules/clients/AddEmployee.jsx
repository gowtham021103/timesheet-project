import React, { useState, useEffect } from "react";
import axiosClient from "../../api/api";
import "./AddEmployee.css";

export default function AddEmployee() {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔄 Fetch employees from backend
  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);
      try {
        const res = await axiosClient.get("/accounts/employees/");
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to load employees", err);
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  // 🔐 Add new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployeeName.trim()) return;

    try {
      const payload = { username: newEmployeeName.trim() };
      const res = await axiosClient.post("/accounts/employees/", payload);

      // Update the employees list
      setEmployees((prev) => [...prev, res.data]);
      setNewEmployeeName("");
    } catch (err) {
      console.error("Failed to add employee", err);
      setError("Failed to add employee");
    }
  };

  return (
    <div className="add-employee card p-4">
      <h2>Manage Employees</h2>

      {error && <p className="error">{error}</p>}

      <div className="existing-employees">
        <h3>Existing Employees</h3>
        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <ul>
            {employees.map((emp) => (
              <li key={emp.id}>{emp.username}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="add-employee-form">
        <h3>Add New Employee</h3>
        <form onSubmit={handleAddEmployee}>
          <div>
            <label htmlFor="employeeName">Employee Name</label>
            <input
              type="text"
              id="employeeName"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
}
