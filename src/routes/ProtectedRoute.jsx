import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
