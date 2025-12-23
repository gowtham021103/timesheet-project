import { useState } from "react";
import "./SidebarTeamLead.css"; // Reusing TeamLead styles for consistency
import { FiMenu, FiX, FiLogOut, FiUsers, FiClock, FiGrid, FiDollarSign } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function SidebarHR() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-header">
                <h2 className="sidebar-brand">HR Panel</h2>
                <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
            </div>
            <nav className="sidebar-nav">
                <Link to="/hr" className="nav-item">
                    <FiGrid className="nav-icon" />
                    <span className="nav-label">Dashboard</span>
                </Link>
                <Link to="/hr/employees" className="nav-item">
                    <FiUsers className="nav-icon" />
                    <span className="nav-label">Employees</span>
                </Link>
                <Link to="/hr/timesheets" className="nav-item">
                    <FiClock className="nav-icon" />
                    <span className="nav-label">Timesheets</span>
                </Link>
                <Link to="/hr/payroll" className="nav-item">
                    <FiDollarSign className="nav-icon" />
                    <span className="nav-label">Payroll</span>
                </Link>
                <button onClick={logout} className="nav-item logout-btn">
                    <FiLogOut className="nav-icon" />
                    <span className="nav-label">Logout</span>
                </button>
            </nav>
        </aside>
    );
}
