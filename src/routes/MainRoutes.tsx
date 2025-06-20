import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Subscribe from "../pages/subscribe/Subscribe";
import SubscriptionStatistics from "../pages/subscriptionStatistics/SubscriptionStatistics";
import Users from "../pages/users/Users";

export const MainRoute = {
  public: [
    {
      id: 1,
      path: "/login",
      element: <Login />,
      fallback: <h1>Loading...</h1>,
    },
  ],
  private: [
    {
      id: 1,
      path: "/",
      element: <Dashboard />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 2,
      path: "/users",
      element: <Users />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 3,
      path: "/subscribe",
      element: <Subscribe />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 3,
      path: "/subscription-statistics",
      element: <SubscriptionStatistics />,
      fallback: <h1>Loading...</h1>,
    },
  ],
};
