import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children, allowed }) {
  const auth = useAuth();
  if (!auth) return null;
  const { user, loading } = auth;
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/404" replace />;
  }
  return children;
}
