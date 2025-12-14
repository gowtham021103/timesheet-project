import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import CreateEmployee from "./pages/manager/CreateEmployee";
import Employees from "./pages/manager/Employees";
import AssignTask from "./pages/manager/AssignTask";
import TaskApprovals from "./pages/manager/TaskApprovals";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute role="manager" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            <Route path="/manager/create-employee" element={<CreateEmployee />} />

            <Route path="/manager/employees" element={<Employees />} />
            <Route path="/manager/assign-task" element={<AssignTask />} />
            <Route path="/manager/approvals" element={<TaskApprovals />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
