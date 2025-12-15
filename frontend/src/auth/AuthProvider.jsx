import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load profile on app start
  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("access");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authApi.profile();
        setUser(profile);
      } catch (err) {
        console.warn("Auth expired");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  // 🔐 Login
  async function login(username, password) {
    const data = await authApi.login(username, password);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const profile = await authApi.profile();
    setUser(profile);

    // 🚀 SPA navigation (no reload)
    const roleRoutes = {
      admin: "/admin",
      manager: "/manager",
      employee: "/employee",
      client_admin: "/client-admin",
    };

    window.history.replaceState(null, "", roleRoutes[profile.role] || "/");
  }

  // 📝 Register
  async function register(username, email, password) {
    await authApi.register(username, email, password);
    window.history.replaceState(null, "", "/login");
  }

  // 🚪 Logout
  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    window.history.replaceState(null, "", "/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
