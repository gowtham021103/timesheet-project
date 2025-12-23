import { useState } from "react";
import "./SidebarTeamLead.css";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function SidebarTeamLead() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-brand">Team Lead</h2>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        <Link to="/team-lead" className="nav-item">
          <span className="nav-label">Dashboard</span>
        </Link>
        <Link to="/team-lead/projects" className="nav-item">
          <span className="nav-label">Projects</span>
        </Link>
        <Link to="/team-lead/tasks" className="nav-item">
          <span className="nav-label">Tasks</span>
        </Link>
        <Link to="/team-lead/assign-task" className="nav-item">
          <span className="nav-label">Assign Task</span>
        </Link>
        <button onClick={logout} className="nav-item logout-btn">
          <FiLogOut className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
