import React, { useEffect, useState } from "react";
import { getProjects } from "../api/projectService";

export default function ClientDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const activeProjectsCount = projects.filter(p => p.status === 'Ongoing' || p.status === 'In Progress').length;
  // This is a placeholder as we don't have a direct "Assigned Manager" count from projects alone easily without more logic, 
  // but we can assume distinct team_leads.
  const uniqueManagers = new Set(projects.map(p => p.team_lead)).size;

  return (
    <div>
      <div className="welcome-text"><b> Client Dashboard</b></div>

      <div className="cards">
        <div className="card">
          <h3>Total Projects</h3>
          <p>{projects.length}</p>
        </div>

        <div className="card">
          <h3>Active Projects</h3>
          <p>{activeProjectsCount}</p>
        </div>

        <div className="card">
          <h3>Assigned Leads</h3>
          <p>{uniqueManagers}</p>
        </div>
      </div>
    </div>
  );
}
