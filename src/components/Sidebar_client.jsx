import { NavLink } from "react-router-dom";
import "./Sidebar_client.css";

export default function SidebarClient() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/client-dashboard" className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/team-creation" className="nav-item">
          Team creation
        </NavLink>

        <NavLink to="/team-view" className="nav-item">
          View Teams
        </NavLink>

        <NavLink to="/add-employee" className="nav-item">
          Add Employee
        </NavLink>

        <NavLink to="/project-list" className="nav-item">
          Project List
        </NavLink>

        <NavLink to="/reports" className="nav-item">
          Reports
        </NavLink>

        
      </nav>
    </aside>
  );
}
