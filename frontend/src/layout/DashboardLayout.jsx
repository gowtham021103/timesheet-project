import { Outlet } from "react-router-dom";
import SidebarClient from "../components/Sidebar_client";
import "../styles/layout.css";
import "../styles/dashboard.css";
import React, { useEffect, useState } from "react";
import { listProjects } from "../api/projectApi";

export default function DashboardLayout() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await listProjects();
        if (mounted) setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="layout">
      <SidebarClient />
      <main className="main">
        <div className="container">
          <Outlet context={{ projects, setProjects }} />
        </div>
      </main>
    </div>
  );
}
