import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return isLoggedIn ? children : <Navigate to="/" replace />;
};
