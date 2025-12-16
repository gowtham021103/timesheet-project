import { useAuth } from "../auth/AuthProvider";
export default function ManagerDashboard() {
  const { logout, user } = useAuth();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
      <p className="mt-2 text-gray-600">Oversee team tasks and timesheets.</p>

       <button onClick={logout} style={{ marginTop: "10px" }}>
        Logout
      </button>
    </div>
  );
}
