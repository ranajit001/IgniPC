import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  if (!auth || !auth.user|| !auth.accessToken) return <Navigate to="/auth" />;
  return <Outlet />;
};

export default ProtectedRoute;
