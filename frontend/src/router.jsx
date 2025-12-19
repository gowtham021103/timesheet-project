import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";
import ClientDashboard from "./dashboard/ClientDashboard";

import CreateProject from "./modules/clients/CreateProject";
import AssignProject from "./modules/clients/AssignProject";
import ProjectList from "./modules/clients/ProjectList";
import ClientReports from "./modules/clients/ClientReports";
import AddEmployee from "./modules/clients/AddEmployee";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import RequireAuth from "./auth/RequireAuth";
import DashboardLayout from "./layout/DashboardLayout";

export default function Router() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* ADMIN */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* MANAGER */}
      <Route
        path="/manager-dashboard"
        element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE */}
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* CLIENT (LAYOUT BASED) */}
    <Route element={<DashboardLayout />}>
  <Route path="/client-dashboard" element={<ClientDashboard />} />
  <Route path="/create-project" element={<CreateProject />} />
  <Route path="/assign-project" element={<AssignProject />} />
  <Route path="/project-list" element={<ProjectList />} />
  <Route path="/reports" element={<ClientReports />} />
  <Route path="/add-employee" element={<AddEmployee />} />
</Route>


      {/* 404 */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />

    </Routes>
  );
}
