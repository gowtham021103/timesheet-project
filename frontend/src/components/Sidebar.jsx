import { useState } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar header */}
      <div className="sidebar-header">
        <h2 className="sidebar-brand">Timesheet</h2>

        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        
        <Link to="/" className="nav-item">
          <span className="nav-icon">📊</span>
          <span className="nav-label">Dashboard</span>
        </Link>

        <Link to="/timesheets" className="nav-item">
          <span className="nav-icon">➕</span>
          <span className="nav-label">Create Timesheets</span>
        </Link>

        <Link to="/view-timesheets" className="nav-item">
          <span className="nav-icon">📝</span>
          <span className="nav-label">View Timesheet</span>
        </Link>

        <Link to="/employees" className="nav-item">
          <span className="nav-icon">👥</span>
          <span className="nav-label">Employees</span>
        </Link>

        <button onClick={logout} className="nav-item logout-btn">
          <FiLogOut className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
