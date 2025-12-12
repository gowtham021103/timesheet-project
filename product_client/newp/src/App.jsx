import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

import AssignProject from "./pages/AssignProject";
import CreateProject from "./pages/CreateProject";
import ProjectList from "./pages/ProjectList";
import ClientReports from "./pages/ClientReports";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/assign-project" element={<AssignProject />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project-list" element={<ProjectList />} />
          <Route path="/reports" element={<ClientReports />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
