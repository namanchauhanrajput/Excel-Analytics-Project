import { createContext, useContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!token;

  // ✅ Store token in localStorage
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // ✅ Logout function
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  // ✅ Get user data from backend  on token change
  useEffect(() => { 
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://excel-analytics-project.onrender.com/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ used directly, no external variable needed
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.userData);
        } else {
          console.error("User fetch failed");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getUser();
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [token]); // ✅ No eslint warning now

  // ✅ Context value
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        logoutUser,
        token,
        user,
        isLoading,
        authorizationToken: `Bearer ${token}` // optional: still exported if needed elsewhere
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
