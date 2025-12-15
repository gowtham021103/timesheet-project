import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  // ⛑️ Prevent crash
  if (!auth) return null;

  const { user, loading } = auth;

  if (loading) return null; // or spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
