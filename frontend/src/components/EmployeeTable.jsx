import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import axiosClient from "../api/axiosClient";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔄 Fetch employees from backend
  const loadEmployees = async () => {
    try {
      const res = await axiosClient.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // 🔍 Search filter
  const filtered = employees.filter((emp) =>
    emp.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <SearchBar setSearch={setSearch} />

        {loading && <p>Loading employees...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <table className="employee-table">
            <thead>
              <tr className="table-head">
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="table-body">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4">No employees found</td>
                </tr>
              ) : (
                filtered.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.username}</td>
                    <td>{emp.role}</td>
                    <td>
                      <span className={`status ${emp.status.toLowerCase()}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
