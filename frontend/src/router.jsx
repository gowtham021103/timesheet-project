import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useAuth } from "./auth/AuthProvider";

/* DASHBOARDS */
import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";
import ClientDashboard from "./dashboard/ClientDashboard";
import TeamLeadDashboard from "./dashboard/TeamLeadDashboard";
import TeamLeadHome from "./modules/teamleads/Dashboard";
import HRDashboard from "./dashboard/HRDashboard";
import HRHome from "./modules/hr/Dashboard";

/* ADMIN MODULES */
import AdminClients from "./modules/admin/AdminClients";
import ClientAccesses from "./modules/admin/ClientAccesses";
import ViewAccesses from "./modules/admin/ViewAccesses";

/* CLIENT MODULES */
import TeamCreation from "./modules/clients/TeamCreation";
import TeamView from "./modules/clients/TeamView";
import CreateProject from "./modules/clients/CreateProject";
import AssignProject from "./modules/clients/AssignProject";
import ProjectList from "./modules/clients/ProjectList";
import ClientReports from "./modules/clients/ClientReports";
import AddEmployee from "./modules/clients/AddEmployee";

/* TEAM LEAD MODULES */
import TeamLeadProjects from "./modules/teamleads/TeamLeadProject";
import TeamLeadAssignTask from "./modules/teamleads/AssignTask";
import TeamLeadTasks from "./modules/teamleads/TeamLeadTask";

/* HR MODULES */
import HREmployees from "./modules/hr/HREmployees";
import HRTimesheets from "./modules/hr/HRTimesheets";
import HRPayroll from "./modules/hr/HRPayroll";

/* TIMESHEETS */
import TimesheetList from "./pages/TimesheetList";
import TimesheetForm from "./pages/TimesheetForm";
import ViewTimesheets from "./pages/timesheet/viewtimesheet";

/* EMPLOYEES */
import EmployeeTable from "./components/EmployeeTable";

/* LAYOUT & GUARDS */
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

/* MISC */
import NotFound from "./pages/NotFound";

export default function Router() {
  const { user, loading } = useAuth();
  if (loading) return null;

  const roleRedirect = {
    admin: "/admin",
    manager: "/manager",
    employee: "/employee",
    client_admin: "/client-dashboard",
    team_lead: "/team-lead",
    hr: "/hr",
  };

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ROOT */}
      <Route
        path="/"
        element={
          user
            ? <Navigate to={roleRedirect[user.role]} replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <AdminClients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients/accesses"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <ClientAccesses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients/view-accesses"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <ViewAccesses />
          </ProtectedRoute>
        }
      />

      {/* MANAGER */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowed={["manager"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowed={["employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* TEAM LEAD */}
      <Route
        path="/team-lead"
        element={
          <ProtectedRoute allowed={["team_lead"]}>
            <TeamLeadDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeamLeadHome />} />
        <Route path="projects" element={<TeamLeadProjects />} />
        <Route path="tasks" element={<TeamLeadTasks />} />
        <Route path="assign-task" element={<TeamLeadAssignTask />} />
      </Route>

      {/* HR */}
      <Route
        path="/hr"
        element={
          <ProtectedRoute allowed={["hr"]}>
            <HRDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<HRHome />} />
        <Route path="employees" element={<HREmployees />} />
        <Route path="timesheets" element={<HRTimesheets />} />
        <Route path="payroll" element={<HRPayroll />} />
      </Route>

      {/* CLIENT (LAYOUT BASED) */}
      <Route
        element={
          <ProtectedRoute allowed={["client_admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/team-creation" element={<TeamCreation />} />
        <Route path="/team-view" element={<TeamView />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/assign-project" element={<AssignProject />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="/reports" element={<ClientReports />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Route>

      {/* TIMESHEETS */}
      <Route
        path="/timesheets"
        element={<ProtectedRoute><TimesheetList /></ProtectedRoute>}
      />
      <Route
        path="/timesheets/new"
        element={<ProtectedRoute><TimesheetForm /></ProtectedRoute>}
      />
      <Route
        path="/timesheets/:id/edit"
        element={<ProtectedRoute><TimesheetForm editMode /></ProtectedRoute>}
      />
      <Route
        path="/view-timesheets"
        element={<ProtectedRoute><ViewTimesheets /></ProtectedRoute>}
      />

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
