import React, { useEffect, useState } from "react";
import { getEmployees } from "../api/api";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then((response) => {
      setEmployees(response.data);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Role</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.user}</td>
            <td>{emp.role}</td>
            <td>{emp.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
