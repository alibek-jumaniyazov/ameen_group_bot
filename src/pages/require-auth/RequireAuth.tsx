import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

export function RequireAuth() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("isAuthenticated") || "");
    if (auth?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return isAuthenticated ? (
    <div className="!h-full !w-full">
      <Sidebar />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
