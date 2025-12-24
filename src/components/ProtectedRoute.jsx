import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (!auth?.access) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
