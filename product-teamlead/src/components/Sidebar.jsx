import { useState } from "react";

export default function Sidebar({ onMenuSelect }) {
  const [open] = useState(true);

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <h2>Menu</h2>
      <ul>
<<<<<<< HEAD
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
=======
        <li onClick={() => onMenuSelect("dashboard")}>Dashboard</li>
        <li onClick={() => onMenuSelect("assignTask")}>Assign Task</li>
        <li onClick={() => onMenuSelect("employees")}>Employees</li>
        <li>Project Duration</li>
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
      </ul>
    </div>
  );
}
