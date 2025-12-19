import { Routes, Route } from "react-router-dom";

// Auth
import Login from "./auth/Login";

// Layouts
import AdminLayout from "./layout/AdminLayout";

// Admin pages
import AdminDashboard from "./dashboard/AdminDashboard";
import AddEmployee from "./modules/admin/adminemployee";
import AssignProject from "./modules/admin/assignproject";
import CreateProject from "./modules/admin/createproject";

export default function App() {
  return (
    <>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard (entry point after login) */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Admin Protected Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="assign-project" element={<AssignProject />} />
          <Route path="create-project" element={<CreateProject />} />
        </Route>
      </Routes>
    </>
  );
}
