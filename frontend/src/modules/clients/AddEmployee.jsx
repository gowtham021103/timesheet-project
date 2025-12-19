import React, { useState, useEffect } from "react";
import sampleProjects from "../../Sample-projects";
import "./AddEmployee.css";

export default function AddEmployee() {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState("");

  useEffect(() => {
    // Extract unique employees from sampleProjects
    const uniqueEmployees = [...new Set(sampleProjects.map(p => p.assignedTo))];
    setEmployees(uniqueEmployees);
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (newEmployeeName.trim()) {
      setEmployees(prev => [...prev, newEmployeeName.trim()]);
      setNewEmployeeName("");
    }
  };

  return (
    <div className="add-employee card p-4">
      <h2>Manage Employees</h2>

      <div className="existing-employees">
        <h3>Existing Employees</h3>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <ul>
            {employees.map((emp, index) => (
              <li key={index}>{emp}</li>
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