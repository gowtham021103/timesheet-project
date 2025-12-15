import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

import AssignProject from "./pages/AssignProject";
import CreateProject from "./pages/CreateProject";
import ProjectList from "./pages/ProjectList";
import ClientReports from "./pages/ClientReports";

import sampleProjects from "./Sample-projects";

function App() {
  const [projects, setProjects] = useState(sampleProjects);

  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route
            path="/assign-project"
            element={<AssignProject projects={projects} setProjects={setProjects} />}
          />
          <Route
            path="/create-project"
            element={<CreateProject projects={projects} setProjects={setProjects} />}
          />
          <Route
            path="/project-list"
            element={<ProjectList projects={projects} />}
          />
          <Route path="/reports" element={<ClientReports />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
