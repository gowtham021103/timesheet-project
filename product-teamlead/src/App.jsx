import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AssignTask from "./pages/AssignTask";
import EmployeeList from "./components/EmployeeList";
import Projects from "./pages/Projects";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-container">
      <Sidebar onMenuSelect={setActivePage} />

      <div className="main-content">
        <Navbar />

        {activePage === "dashboard" && <Dashboard />}
        {activePage === "assignTask" && <AssignTask />}
        {activePage === "employees" && <EmployeeList />}
        {activePage === "projects" && <Projects />}
      </div>
    </div>
  );
}
