import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, token } = useAuth();

  // If user is not authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
