import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyTicketsGuard = ({ children }) => {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (role === "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default MyTicketsGuard;
