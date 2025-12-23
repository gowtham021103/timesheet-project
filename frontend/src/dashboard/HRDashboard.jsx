import React from "react";
import SidebarHR from "../components/SidebarHR";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";
import "../styles/EmployeeDashboard.css";

export default function HRDashboard() {
    return (
        <div className="layout">
            {/* LEFT SIDEBAR */}
            <SidebarHR />

            {/* RIGHT MAIN CONTENT */}
            <div className="main">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
