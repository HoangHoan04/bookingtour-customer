import { Navigate } from "react-router-dom";

export default function PrivateRoute() {
  return <Navigate to="/login" replace />;
}
