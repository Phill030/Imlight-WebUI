import type { ReactNode } from "react";
import { UseAuth } from "../context/AuthContext";
import { useLocation, Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredScope?: string;
}

/**
 * Protects routes by requiring the user to be authenticated and optionally
 * possess a specific permission scope.
 *
 * - Displays a loading state while authentication is being resolved.
 * - Redirects unauthenticated users to the login page, preserving their
 * intended destination for post-login navigation.
 * - Redirects authenticated users without the required scope to the dashboard.
 *
 * @param children - The content to render when access is granted.
 * @param requiredScope - Optional permission scope required to access the route.
 */
export function ProtectedRoute({ children, requiredScope }: ProtectedRouteProps) {
  const { account, loading, hasScope } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!account) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredScope && !hasScope(requiredScope)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
