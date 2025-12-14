import { useState } from "react";
import { createEmployee } from "../../api/employeeService";
import "./manager.css";

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
    <div className="task-container">
      <h2 className="page-heading">Create Employee</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <label>Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />

          <label>Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />

          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option>Employee</option>
          </select>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeePage;
