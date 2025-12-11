import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
<<<<<<< HEAD

import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import AssignTask from "./pages/AssignTask";
import EmployeeList from "./components/EmployeeList"; 
=======
import Dashboard from "./pages/Dashboard";
import AssignTask from "./pages/AssignTask";
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-container">
<<<<<<< HEAD
      {/* Sidebar receives the page-switch function */}
=======
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
      <Sidebar onMenuSelect={setActivePage} />

      <div className="main-content">
        <Navbar />

<<<<<<< HEAD
        {/* Page Routing without React Router */}
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "assignTask" && <AssignTask />}
        {activePage === "employees" && <EmployeeList />}
        {activePage === "projects" && <Projects />}          {/* ⭐ ADD THIS */}
=======
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "assignTask" && <AssignTask />}
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
      </div>
    </div>
  );
}
