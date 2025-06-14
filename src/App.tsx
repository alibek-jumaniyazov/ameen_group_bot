import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { MainRoute } from "./routes/MainRoutes";
import { RequireAuth } from "./pages/require-auth/RequireAuth";

function App() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("isAuthenticated");
  const isLoginPage = window.location.pathname === "/login";

  useEffect(() => {
    if (isAuthenticated && isLoginPage) {
      navigate("/");
    }
  }, [isAuthenticated, isLoginPage, navigate]);

  return (
    <>
      <Routes>
        {!isAuthenticated ? (
          MainRoute.public.map(({ id, path, element, fallback }) => (
            <Route
              key={id}
              path={path}
              element={<Suspense fallback={fallback}>{element}</Suspense>}
            />
          ))
        ) : (
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
          element={
            <Navigate to={!isAuthenticated ? "/login" : "/login"} replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
