import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const validateToken = () => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      const payload = decodeToken(savedToken);
      if (payload && Date.now() / 1000 < payload.exp) {
        setIsAuthenticated(true);
        setRole(payload.role);
        setToken(savedToken);
      } else {
        console.warn("Token expired. Logging out...");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  };

  const login = (userData, token) => {
    setIsAuthenticated(true);
    setRole(userData.role);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: getUsernameFromToken(token) }),
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setRole(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUsernameFromToken = (token) => {
    if (!token) return null;
    const payload = decodeToken(token);
    return payload ? payload.username : null;
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        token,
        login,
        logout,
        isLoading,
      }}
    >
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
