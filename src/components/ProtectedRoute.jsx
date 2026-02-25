import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

function ProtectedRoute({ children, allowedRole }) {
  const role = getRole();

  // If not logged in → go to login
  if (!role) {
    return <Navigate to="/login" />;
  }

  // If wrong role → go home
  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;