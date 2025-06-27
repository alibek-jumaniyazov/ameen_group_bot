import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

export function RequireAuth() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      const hasToken = Boolean(token);
      setIsAuthenticated(hasToken);
    } catch (error) {
      console.error("Failed to parse auth data:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-full w-full">
      <Sidebar />
    </div>
  );
}
