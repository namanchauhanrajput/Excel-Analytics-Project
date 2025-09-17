import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const PublicRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return !isLoggedIn ? children : <Navigate to="/dashboard" replace />;
};
