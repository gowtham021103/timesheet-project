import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // import your auth hook
import "./Sidebar_client.css";

export default function SidebarClient() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/client-dashboard" className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/create-project" className="nav-item">
          Create Project
        </NavLink>

        <NavLink to="/assign-project" className="nav-item">
          Assign Project
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

        {/* Logout button */}
        <button
          className="nav-item logout-button"
          onClick={logout}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            padding: "8px 0",
            textAlign: "left",
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
