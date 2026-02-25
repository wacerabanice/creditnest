// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user_id = localStorage.getItem("user_id");
  if (!user_id) {
    // Redirect to login if not authenticated
    return <Navigate to="/profile" replace />;
  }

  // Render children (protected page)
  return children;
};

export default ProtectedRoute;