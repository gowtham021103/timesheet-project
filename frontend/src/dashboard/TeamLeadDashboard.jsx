import React from "react";
import SidebarTeamLead from "../components/SidebarTeamLead";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";
import "../styles/EmployeeDashboard.css"; // Reuse employee styles for consistent look

export default function TeamLeadDashboard() {
  return (
    <div className="layout">
      {/* LEFT SIDEBAR */}
      <SidebarTeamLead />

      {/* RIGHT MAIN CONTENT */}
      <div className="main">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}