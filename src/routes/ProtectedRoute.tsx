import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/cookie";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [token, setToken] = useState<string | undefined>(getToken());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = getToken();
      setToken(currentToken);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
