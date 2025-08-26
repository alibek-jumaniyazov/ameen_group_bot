import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const url = searchParams.get("url");
	useEffect(() => {
		const timer = setTimeout(() => {
			if (url) window.location.replace(url);
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
