import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axiosClient from "../../api/axiosClient";
import "./timesheet.css";

export default function ViewTimesheets() {
  const [timesheets, setTimesheets] = useState([]);
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // 🔽 Fetch timesheets from backend
  const loadTimesheets = async () => {
    try {
      const res = await axiosClient.get("timesheets/");
      setTimesheets(res.data);
    } catch (err) {
      console.error("Failed to load timesheets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimesheets();
  }, []);

  // 🔽 Extract employees for filter
  const employees = [
    "All",
    ...new Set(timesheets.map((t) => t.employee_name)),
  ];

  // 🔽 Filter logic
  const filteredData =
    employeeFilter === "All"
      ? timesheets
      : timesheets.filter(
          (t) => t.employee_name === employeeFilter
        );

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="page-header">
          <h1>View Timesheets</h1>
          <p>All employees timesheet records</p>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
          >
            {employees.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="table-section">
          {loading ? (
            <p>Loading timesheets...</p>
          ) : (
            <table className="timesheet-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredData.map((t) => (
                    <tr key={t.id || t.date+"-"+t.task}>
                      <td className="employee-name">
                        {t.employee_name}
                      </td>
                      <td>
                        {new Date(t.date).toDateString()}
                      </td>
                      <td>
                        <span className="hours-badge">
                          {t.hours}h
                        </span>
                      </td>
                      <td>{t.task}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
