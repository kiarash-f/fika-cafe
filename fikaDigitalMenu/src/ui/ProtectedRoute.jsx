import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const token = Cookies.get("token");

  if (!token) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
