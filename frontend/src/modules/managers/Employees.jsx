import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/employeeService";
import { useNavigate } from "react-router-dom";
import Sidebar from "./TeamLeadSidebar";
import "./manager.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // refresh when other components update employees (TeamLeadSelection)
  useEffect(() => {
    const onUpdated = () => fetchEmployees();
    window.addEventListener("employeesUpdated", onUpdated);

    const onStorage = (e) => {
      if (e.key === "employeesUpdatedAt") fetchEmployees();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("employeesUpdated", onUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="task-container">
        <div className="teamlead-header">
          <div className="teamlead-meta">
            <h2 className="teamlead-title">Employees</h2>
            <div className="teamlead-subtitle">Manage and view employee roles</div>
          </div>
          <div className="table-actions">
            <button className="secondary-btn" onClick={fetchEmployees} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="form-card">
          <div className="table-card">
            {loading ? (
              <p>Loading employees...</p>
            ) : employees.length === 0 ? (
              <div className="empty-state">No employees available.</div>
            ) : (
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => {
                    const displayName = emp.first_name || emp.name || emp.username || "Unnamed";
                    const displayRole = emp.role === "team_lead" ? "Team Lead" : emp.role || "Employee";
                    const initials = displayName
                      .split(" ")
                      .map((s) => s[0])
                      .filter(Boolean)
                      .slice(0,2)
                      .join("");

                    return (
                      <tr key={emp.id} className="row-with-avatar">
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span className="avatar">{initials}</span>
                            <div>
                              <div>{displayName}</div>
                              <div className="muted" style={{ marginTop: 4 }}>{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{displayRole}</td>
                        <td>
                          <button
                            className="link-btn danger"
                            onClick={() => handleDelete(emp.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;