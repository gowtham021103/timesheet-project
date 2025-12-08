import { useState } from "react";

export default function Sidebar({ onMenuSelect }) {
  const [open] = useState(true);

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <h2>Menu</h2>
      <ul>
        <li>
          <span onClick={() => onMenuSelect("dashboard")}>
            Dashboard
          </span>
        </li>

        <li>
          <span onClick={() => onMenuSelect("assignTask")}>
            Assign Task
          </span>
        </li>

        <li>
          <span onClick={() => onMenuSelect("employees")}>
            Employees
          </span>
        </li>

        <li>
          <span onClick={() => onMenuSelect("projects")}>
            Projects
          </span>
        </li>

        <li>
          <span onClick={() => onMenuSelect("timesheet")}>
            View Timesheet
          </span>
        </li>
      </ul>
    </div>
  );
}
