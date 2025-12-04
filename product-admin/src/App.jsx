import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import EmployeeTable from "./components/EmployeeTable";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <DashboardCards />
        <EmployeeTable />
      </div>
    </div>
  );
}