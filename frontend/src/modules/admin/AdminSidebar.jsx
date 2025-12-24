import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const { logout } = useAuth();
  return (
    <aside className="admin-sidebar">
      <h3>Admin Panel</h3>
      <nav>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/clients">Clients</Link></li>
          <li><Link to="/admin/clients/accesses">Client Accesses</Link></li>
          <li><Link to="/admin/clients/view-accesses">View Accesses</Link></li>
          <li><button className="admin-logout-btn" onClick={logout}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
}
