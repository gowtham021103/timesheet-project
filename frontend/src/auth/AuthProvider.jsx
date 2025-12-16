import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom"; // ✅ FIX

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ FIX

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

  // 🔐 Login (NO navigation here)
  async function login(username, password) {
    const data = await authApi.login(username, password);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const profile = await authApi.profile();
    setUser(profile);

    return profile; // ✅ correct
  }

  // 📝 Register
  async function register(username, email, password) {
    await authApi.register(username, email, password);
  }

  // 🚪 Logout (FIXED)
  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    navigate("/login", { replace: true }); // ✅ FIX
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
