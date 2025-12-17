import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./timesheet.css";

const mockTimesheets = [
  {
    id: 1,
    employee: "Gowtham",
    date: "Mon Sep 16 2025",
    hours: 8,
    task: "Dashboard UI Development",
  },
  {
    id: 2,
    employee: "Anjali",
    date: "Mon Sep 16 2025",
    hours: 7.5,
    task: "API Integration",
  },
  {
    id: 3,
    employee: "Gowtham",
    date: "Tue Sep 17 2025",
    hours: 6,
    task: "Bug Fixes",
  },
];

export default function ViewTimesheets() {
  const [employeeFilter, setEmployeeFilter] = useState("All");

  const employees = ["All", ...new Set(mockTimesheets.map(t => t.employee))];

  const filteredData =
    employeeFilter === "All"
      ? mockTimesheets
      : mockTimesheets.filter(t => t.employee === employeeFilter);

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
            {employees.map(emp => (
              <option key={emp} value={emp}>{emp}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="table-section">
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
                  <tr key={t.id}>
                    <td className="employee-name">{t.employee}</td>
                    <td>{t.date}</td>
                    <td>
                      <span className="hours-badge">{t.hours}h</span>
                    </td>
                    <td>{t.task}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
