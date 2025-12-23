import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "../styles/login.css";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Align with router paths
  const rolePathMap = {
    admin: "/admin",
    manager: "/manager",
    employee: "/employee",
    client_admin: "/client-dashboard",
    team_lead: "/team-lead",
    hr: "/hr",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    try {
      setLoading(true);
      const profile = await login(username, password);
      if (!profile?.role) {
        setError("User role not found");
        return;
      }
      const path = rolePathMap[profile.role];
      if (!path) {
        setError("Unknown role received from server");
        return;
      }
      navigate(path, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Invalid Username or Password";
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="new-password"
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
