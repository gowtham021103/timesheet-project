import "./layout.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authService";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <h3 className="page-title">Manager Dashboard</h3>

      <div className="profile">
        <span className="manager-name">Manager</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
