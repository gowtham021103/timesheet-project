import { useState } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { FaClipboardList, FaCheckCircle, FaClock, FaUserPlus, FaUserTie, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
/* import createEmployees from "./CreateEmployees"; */


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
          <FaHome className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </Link>

        <Link to="/teamleadselection" className="nav-item">
          <FaUserTie className="nav-icon" />
          <span className="nav-label">Team Lead Selection</span>
        </Link>

        <Link to="/viewEmployees" className="nav-item">
          <FaUserPlus className="nav-icon" />
          <span className="nav-label">Employees</span>
        </Link>

        <Link to="/assignTask" className="nav-item">
          <FaClipboardList className="nav-icon" />
          <span className="nav-label">Assign Task</span>
        </Link>
        <Link to="/taskApprovals" className="nav-item">
          <FaCheckCircle className="nav-icon" />
          <span className="nav-label">Task Approvals</span>
        </Link>
        <Link to="/timesheetApprovals" className="nav-item">
          <FaClock className="nav-icon" />
          <span className="nav-label">Timesheet Approvals</span>
        </Link>

        <button onClick={logout} className="nav-item logout-btn">
          <FiLogOut className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
/* this is a comment */
