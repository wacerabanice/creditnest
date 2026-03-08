import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;