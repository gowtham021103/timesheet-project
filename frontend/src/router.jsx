import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";

import TimesheetList from "./pages/TimesheetList";
import TimesheetForm from "./pages/TimesheetForm";
import EmployeeList from "./pages/EmployeeList";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./auth/AuthProvider";

export default function Router() {
  const { user } = useAuth() || {};

  // Role → dashboard mapping
  const roleDashboard = {
    admin: "/admin-dashboard",
    manager: "/manager-dashboard",
    employee: "/employee-dashboard",
  };

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DEFAULT REDIRECT */}
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
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Client Admin */}
      <Route
        path="/client-admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager-dashboard"
        element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
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

      {/* EMPLOYEES */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        }
      />

      {/* NOT FOUND */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
