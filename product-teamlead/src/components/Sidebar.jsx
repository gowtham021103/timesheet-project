import { useState } from "react";

export default function Sidebar({ onMenuSelect }) {
  const [open] = useState(true);

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <h2>Menu</h2>
      <ul>
        <li onClick={() => onMenuSelect("dashboard")}>Dashboard</li>
        <li onClick={() => onMenuSelect("assignTask")}>Assign Task</li>
        <li onClick={() => onMenuSelect("employees")}>Employees</li>
        <li>Project Duration</li>
      </ul>
    </div>
  );
}
