import { NavLink } from "react-router-dom";
import "./layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Timesheet</h2>

      <nav className="menu">
        <NavLink to="/manager/dashboard" className="menu-item">
          Dashboard
        </NavLink>

        <NavLink to="/manager/create-employee" className="menu-item">
          Create Employees
        </NavLink>



        <NavLink to="/manager/employees" className="menu-item">
          Employees
        </NavLink>

        <NavLink to="/manager/assign-task" className="menu-item">
          Assign Task
        </NavLink>

        <NavLink to="/manager/approvals" className="menu-item">
          Approvals
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
