import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import AssignTask from "./pages/AssignTask";
import EmployeeList from "./components/EmployeeList"; 

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-container">
      {/* Sidebar receives the page-switch function */}
      <Sidebar onMenuSelect={setActivePage} />

      <div className="main-content">
        <Navbar />

        {/* Page Routing without React Router */}
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "assignTask" && <AssignTask />}
        {activePage === "employees" && <EmployeeList />}
        {activePage === "projects" && <Projects />}          {/* ⭐ ADD THIS */}
      </div>
    </div>
  );
}
