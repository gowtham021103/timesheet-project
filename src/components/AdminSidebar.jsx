import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const linkStyle = {
    display: "block",
    padding: "10px 12px",
    color: "#e2e8f0",
    textDecoration: "none",
    borderRadius: "6px",
    marginBottom: "6px",
    cursor: "pointer",
  };

  const activeStyle = {
    background: "#1f2937",
    color: "#fff",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={{ width: 240, height: "100vh", background: "#0f172a", padding: 20, color: "white" }}>
      <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Admin</h2>
      <nav>
        <NavLink to="/admin-dashboard" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/clients" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Client Details
        </NavLink>

        <NavLink to="/admin/clients/view-accesses" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          View Client accesses
        </NavLink>

        <NavLink to="/admin/clients/accesses" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Client accesses
        </NavLink>

        <button
          onClick={handleLogout}
          style={{
            ...linkStyle,
            backgroundColor: "transparent",
            border: "none",
            width: "100%",
            textAlign: "left",
            font: "inherit",
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
