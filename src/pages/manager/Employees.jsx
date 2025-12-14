import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/employeeService";
import { useNavigate } from "react-router-dom";
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
      setEmployees(res.data);
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
    <div>
      <div className="page-header">
        <h2 className="page-heading">Employees</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/manager/create-employee")}
        >
          + Create Employee
        </button>
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <div className="table-card">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    {/* Edit can be added later */}
                    <button
                      className="link-btn danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employees;
