import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔄 Load user profile on app start
  useEffect(() => {
    async function loadProfile() {
      const access = localStorage.getItem("access");

      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authApi.profile();
        setUser(profile);
      } catch (err) {
        console.warn("Session expired");
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

    return profile;
  }

  // 📝 Register
  async function register(username, email, password) {
    await authApi.register(username, email, password);
  }

  // 🚪 Logout
  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    navigate("/login", { replace: true });
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
