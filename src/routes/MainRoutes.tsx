import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PaymentHistory from "../pages/paymentHistory/PaymentHistory";
import Subscribe from "../pages/subscribe/Subscribe";
import SubscriptionListPage from "../pages/SubscriptionList/SubscriptionListPage";
import SubscriptionStatistics from "../pages/subscriptionStatistics/SubscriptionStatistics";
import User from "../pages/user/User";
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
      path: "/user/:id",
      element: <User />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 4,
      path: "/subscribe",
      element: <Subscribe />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 5,
      path: "/payment-history",
      element: <PaymentHistory />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 6,
      path: "/subscription-list",
      element: <SubscriptionListPage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 7,
      path: "/subscription-statistics",
      element: <SubscriptionStatistics />,
      fallback: <h1>Loading...</h1>,
    },
  ],
};
