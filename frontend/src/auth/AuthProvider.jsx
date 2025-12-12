import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh") || null);

  // Load user profile if token exists
  useEffect(() => {
    async function loadProfile() {
      if (!token) return;
      try {
        const profile = await authApi.profile(token);
        setUser(profile);
      } catch (err) {
        logout();
      }
    }
    loadProfile();
  }, [token]);

  async function login(username, password) {
    const data = await authApi.login(username, password);

    setToken(data.access);
    setRefresh(data.refresh);
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const profile = await authApi.profile(data.access);
    setUser(profile);

    // Redirect without useNavigate
    window.location.href = "/dashboard";
  }

  async function register(username, email, password) {
    await authApi.register(username, email, password);
    window.location.href = "/login";
  }

  function logout() {
    setUser(null);
    setToken(null);
    setRefresh(null);

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/login";
  }

  const value = {
    user,
    token,
    refresh,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
