import { useEffect } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}
const PaymentSuccess = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.close();
      } else {
        window.close();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          To‘lovingiz uchun rahmat! 🎉
        </h1>
        <p className="text-gray-600">Sahifa 5 soniyadan so‘ng yopiladi...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
