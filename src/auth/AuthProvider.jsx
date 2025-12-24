import { createContext, useContext, useState, useEffect } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (access && role) {
      setAuth({ access, role, username });
    }
  }, []);

  const login = async (username, password) => {
    const data = await authApi.login(username, password);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);

    setAuth({
      access: data.access,
      role: data.role,
      username: data.username,
    });

    return data;
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
