import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  currentRole: string | undefined;
  redirectPath?: string;
}

export default function ProtectedRoutes({
  allowedRoles,
  currentRole,
  redirectPath,
}: ProtectedRouteProps) {
  if (!currentRole) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to={`${redirectPath}`} replace />;
  }

  return <Outlet />;
}
