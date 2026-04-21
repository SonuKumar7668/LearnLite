import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { userInfo } = useContext(AuthContext);

  // If NOT logged in → redirect
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → allow access
  return children;
}