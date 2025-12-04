import { useState } from "react";

export default function Sidebar({ toggleDarkMode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <h2>Menu</h2>
      <ul>
        <li>Dashboard</li>
        <li>Timesheet</li>
        <li>Employees</li>
      </ul>
    </div>
  );
}