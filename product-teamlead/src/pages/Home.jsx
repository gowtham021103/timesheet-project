import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import EmployeeTable from "../components/EmployeeTable";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar />

      <div className="home-body">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="home-content">
          <h1>Welcome to the Dashboard</h1>
          <DashboardCards />
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
}

export default Home;
