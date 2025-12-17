import { useAuth } from "../auth/AuthProvider";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import EmployeeTable from "../components/EmployeeTable";

import "../styles/layout.css";
import "../styles/EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="layout">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT MAIN CONTENT */}
      <div className="main">
        <Navbar />

        <DashboardCards />
        

      
      </div>
    </div>
  );
}
