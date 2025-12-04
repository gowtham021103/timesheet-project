import { useState } from "react";
import SearchBar from "./SearchBar";

const employeesData = [
  { id: 1, name: "John Doe", role: "Developer", status: "Active" },
  { id: 2, name: "Raihana", role: "Designer", status: "Active" },
  { id: 3, name: "Arun", role: "Tester", status: "On Leave" },
  { id: 4, name: "Meena", role: "HR", status: "Active" },
];

export default function EmployeeTable() {
  const [search, setSearch] = useState("");

  const filtered = employeesData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SearchBar setSearch={setSearch} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}