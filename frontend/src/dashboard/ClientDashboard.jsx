import React from "react";
import { useOutletContext } from "react-router-dom";

export default function ClientDashboard() {
  const outlet = useOutletContext();
  const projects = outlet?.projects ?? [];
  const activeProjectsCount = projects.length;
  return (
    <div>
      <div className="welcome-text"><b> Client Dashboard</b></div>

      <div className="cards">
        <div className="card">
          <h3>Active Projects</h3>
          <p>{activeProjectsCount}</p>
        </div>

        <div className="card">
          <h3>Assigned Managers</h3>
          <p>4</p>
        </div>

        <div className="card">
          <h3>Pending Reports</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
}
