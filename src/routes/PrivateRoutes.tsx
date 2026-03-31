import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import tokenCache from "@/utils/token-cache";
import { PUBLIC_ROUTES } from "./routes";

export default function PrivateRoute() {
  const isAuthenticated = tokenCache.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
