import React from "react";
import { employees } from "../Sample-data";
import "./EmployeeList.css";

export default function EmployeeList() {
  return (
    <div className="employee-container">
      <h2>Employee List</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Attendance</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.attendance}%</td>
              <td className={emp.status === "Active" ? "active" : "leave"}>
                {emp.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
