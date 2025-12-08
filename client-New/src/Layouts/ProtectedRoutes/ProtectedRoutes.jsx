import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoaderIcon } from "../../Components/LoaderIcon";

export const ProtectedLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoaderIcon />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Outlet />
    </>
  );
};
