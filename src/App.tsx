import { useEffect, Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { MainRoute } from "./routes/MainRoutes";
import { RequireAuth } from "./pages/require-auth/RequireAuth";

const isUserAuthenticated = (): boolean => {
  return !!localStorage.getItem("accessToken");
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = isUserAuthenticated();

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {!isAuthenticated &&
          MainRoute.public.map(({ id, path, element, fallback }) => (
            <Route
              key={id}
              path={path}
              element={<Suspense fallback={fallback}>{element}</Suspense>}
            />
          ))}

        {isAuthenticated && (
          <Route element={<RequireAuth />}>
            {MainRoute.private.map(({ id, path, element, fallback }) => (
              <Route
                key={id}
                path={path}
                element={<Suspense fallback={fallback}>{element}</Suspense>}
              />
            ))}
          </Route>
        )}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
