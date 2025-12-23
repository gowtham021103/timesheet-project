import React from "react";
import SidebarTeamLead from "../components/SidebarTeamLead";
import { Outlet } from "react-router-dom";

export default function TeamLeadDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarTeamLead />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}