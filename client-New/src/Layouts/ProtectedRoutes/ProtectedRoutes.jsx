import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoaderIcon } from "../../Components/LoaderIcon";
import { ServerHealth } from "../../Components/ServerHealth";

export const ProtectedLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoaderIcon />
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <Outlet />
      <ServerHealth />
    </div>
  );
};
