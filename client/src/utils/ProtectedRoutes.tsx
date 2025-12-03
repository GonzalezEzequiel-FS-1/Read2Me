// ProtectedRoute.tsx
import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/ContextDeclaration/AuthContext";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>; 
};
