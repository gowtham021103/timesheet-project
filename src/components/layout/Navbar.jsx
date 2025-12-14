import "./layout.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <h3 className="page-title">Manager Dashboard</h3>

      <div className="profile">
        <span className="manager-name">Manager</span>
        <button className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
