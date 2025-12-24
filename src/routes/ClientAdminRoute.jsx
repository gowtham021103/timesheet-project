import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ClientAdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || user.role !== "client_admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
