import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import CreateEmployee from "./pages/ManagerDashboard/CreateEmployee";
import AssignTask from "./pages/ManagerDashboard/AssignTask";
import EmployeeTaskList from "./pages/ManagerDashboard/EmployeeTaskList";
import TeamOverview from "./pages/ManagerDashboard/TeamOverview";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        
        <Sidebar />

        <div style={{ padding: 30, width: "100%" }}>
          <Routes>
            <Route path="/" element={<h1>Manager Dashboard</h1>} />
            <Route path="/manager/create-employee" element={<CreateEmployee />} />
            <Route path="/manager/assign-task" element={<AssignTask />} />
            <Route path="/manager/employee-tasks" element={<EmployeeTaskList />} />
            <Route path="/manager/team-overview" element={<TeamOverview />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}
