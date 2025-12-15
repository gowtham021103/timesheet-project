import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";     // ✅ FIXED IMPORT
import "../styles/login.css";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Adjust this based on your backend role strings
  const rolePathMap = {
  admin: "/admin",
  manager: "/manager",
  employee: "/employee",
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!employeeId || !password) {
      setError("Employee ID and Password are required");
      return;
    }

    try {
      setLoading(true);

      // 🔥 NEW: call SimpleJWT login endpoint
      const data = await authApi.login(employeeId, password);

      // Backend returns: {access, refresh}
      if (!data.access) {
        setError("Invalid login response from server");
        return;
      }

      // Save tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("role", data.role);


      // 🔥 Get profile to know role
      const profile = await authApi.profile();

      if (!profile?.role) {
        setError("User role not found in profile");
        return;
      }

      localStorage.setItem("role", profile.role);

      // 🔥 Redirect by role
      const path = rolePathMap[profile.role];
      if (path) navigate(path);
      else setError("Unknown role received from server");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Invalid Employee ID or Password";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">Timesheet Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Employee ID"
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
