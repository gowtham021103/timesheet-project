import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";

import TimesheetList from "./pages/TimesheetList";
import TimesheetForm from "./pages/TimesheetForm";
/* import EmployeeList from "./pages/EmployeeList"; */
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./auth/AuthProvider";

import ViewTimesheets from "./pages/timesheet/viewtimesheet";

import EmployeeTable from "./components/EmployeeTable";

export default function Router() {
  const { user, loading } = useAuth();

  if (loading) return null; // ⛔ prevent premature redirects

  const roleDashboard = {
    admin: "/admin",
    manager: "/manager",
    employee: "/employee",
    client_admin: "/client-admin",
  };

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ROOT */}
      <Route
        path="/"
        element={
          user
            ? <Navigate to={roleDashboard[user.role]} replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* DASHBOARDS */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client-admin"
        element={
          <ProtectedRoute allowed={["client_admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute allowed={["manager"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute allowed={["employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* TIMESHEETS */}
      <Route
        path="/timesheets"
        element={
          <ProtectedRoute>
            <TimesheetList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/timesheets/new"
        element={
          <ProtectedRoute>
            <TimesheetForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/timesheets/:id/edit"
        element={
          <ProtectedRoute>
            <TimesheetForm editMode />
          </ProtectedRoute>
        }
      />

      <Route path="/view-timesheets" element={<ViewTimesheets />} />

      {/* EMPLOYEES */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute allowed={["admin", "manager"]}>
            <EmployeeTable />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
