import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Client Dashboard</h2>

      <nav>
        <NavLink to="/assign-project" className="menu">
          Assign Project
        </NavLink>

        <NavLink to="/create-project" className="menu">
          Create Project
        </NavLink>

        <NavLink to="/project-list" className="menu">
          Project List
        </NavLink>

        <NavLink to="/reports" className="menu">
          Client Reports
        </NavLink>
      </nav>
    </div>
  );
}
