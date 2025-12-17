import { useState } from "react";
import { createEmployee } from "../../api/employeeService";
import Sidebar from "./ManagerSidebar"; // Sidebar included

const CreateEmployeePage = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "Employee" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Name and Email are required");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await createEmployee(form);
      alert("Employee created successfully!");
      setForm({ name: "", email: "", role: "Employee" });
    } catch (err) {
      console.error(err);
      setError("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content">
        <h2 className="page-heading">Create Employee</h2>
        {error && <p>{error}</p>}

        <div>
          <form onSubmit={handleSubmit}>
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter employee name"
            />

            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter employee email"
            />

            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option>Employee</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Employee"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeePage;
