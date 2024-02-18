import axios from 'axios';
import baseURL from '../../utils';

//* =========Plan Payment============
export const handleFreeSubscriptionAPI = async () => {
	const response = await axios.post(
		`${baseURL}/stripe/free-plan`,
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
		`${baseURL}/stripe/checkout`,
		{ amount: Number(payment?.amount), subscriptionPlan: payment?.plan },

		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);
	return response?.data;
};

//* =========Verify Payment============
export const verifyPaymentAPI = async (paymentId) => {
	const response = await axios.post(
		`${baseURL}/stripe/verify-payment/${paymentId}`,
		{},

		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);
	return response?.data;
};
