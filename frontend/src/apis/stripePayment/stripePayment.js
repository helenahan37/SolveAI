import axios from 'axios';

//* =========Plan Payment============
export const handleFreeSubscriptionAPI = async () => {
	const response = await axios.post(
		'http://localhost:5000/api/stripe/free-plan',
		{},
		{
			withCredentials: true,
		}
	);
	return response?.data;
};

//* =========Creat Payemnt Intent============
export const createPaymentIntentAPI = async (payment) => {
	const response = await axios.post(
		'http://localhost:5000/api/stripe/checkout',
		{ amount: Number(payment?.amount), subscriptionPlan: payment?.plan },

		{
			withCredentials: true,
		}
	);
	return response?.data;
};
