import AdminProfile from "../pages/profile/AdminProfile";
import AutoPayment from "../pages/autoPayment/AutoPayment";
import AutoPaymentUser from "../pages/autoPayment/AutoPaymentUser";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import PaymentCardPage from "../pages/atmos/PaymentCardPage";
import PaymentHistory from "../pages/paymentHistory/PaymentHistory";
import PaymentOtpPage from "../pages/atmos/PaymentOtpPage";
import PaymentSuccess from "../pages/atmos/PaymentSuccess";
import SendMessage from "../pages/SendMessage/SendMessage";
import SettingsPage from "../pages/settings/SettingsPage";
import Subscribe from "../pages/subscribe/Subscription";
import SubscriptionListPage from "../pages/SubscriptionList/SubscriptionListPage";
import SubscriptionStatistics from "../pages/subscriptionStatistics/SubscriptionStatistics";
import User from "../pages/user/User";
import UserMessage from "../pages/SendMessage/UserMessage";
import Users from "../pages/users/Users";

export const MainRoute = {
  public: [
    {
      id: 1,
      path: "/login",
      element: <Login />,
      fallback: <h1>Loading...</h1>,
    },
    // {
    //   id: 1,
    //   path: "/atmos",
    //   element: <AtmosPayment />,
    //   fallback: <h1>Loading...</h1>,
    // },
    {
      id: 1,
      path: "/atmos/card",
      element: <PaymentCardPage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 1,
      path: "/atmos/otp",
      element: <PaymentOtpPage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 1,
      path: "/success",
      element: <PaymentSuccess />,
      fallback: <h1>Loading...</h1>,
    },
  ],
  private: [
    {
      id: 1,
      path: "/atmos/card",
      element: <PaymentCardPage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 1,
      path: "/atmos/otp",
      element: <PaymentOtpPage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 1,
      path: "/success",
      element: <PaymentSuccess />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 1,
      path: "/",
      element: <Dashboard />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 2,
      path: "/profile",
      element: <AdminProfile />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 3,
      path: "/users",
      element: <Users />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 4,
      path: "/user/:id",
      element: <User />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 5,
      path: "/subscription",
      element: <Subscribe />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 6,
      path: "/payment-history",
      element: <PaymentHistory />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 7,
      path: "/subscription-statistics",
      element: <SubscriptionStatistics />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 8,
      path: "/subscription-list",
      element: <SubscriptionListPage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 9,
      path: "/auto-payment",
      element: <AutoPayment />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 10,
      path: "/user-payment/:id",
      element: <AutoPaymentUser />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 11,
      path: "/send-message",
      element: <SendMessage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 12,
      path: "/send-message/:id",
      element: <UserMessage />,
      fallback: <h1>Loading...</h1>,
    },
    {
      id: 13,
      path: "/settings",
      element: <SettingsPage />,
      fallback: <h1>Loading...</h1>,
    },
  ],
};
