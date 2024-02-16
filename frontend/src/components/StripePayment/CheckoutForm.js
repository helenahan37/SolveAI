import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams, useSearchParams } from 'react-router-dom';
import { createPaymentIntentAPI } from '../../apis/stripePayment/stripePayment';
import { useMutation } from '@tanstack/react-query';
import StatusMessage from '../Alert/statusMessage';
import payment from '../../assets/payment.jpg';

const CheckoutForm = () => {
	//get payment params
	const params = useParams();
	const [searchParams] = useSearchParams();
	const plan = params.plan;
	const amount = searchParams.get('amount');

	const mutation = useMutation({ mutationFn: createPaymentIntentAPI });

	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState(null);

	//handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (elements === null) {
			return;
		}
		const { error: submitError } = await elements.submit();
		if (submitError) {
			return;
		}
		try {
			// Prepare our data for payment
			const data = {
				amount,
				plan,
			};

			// Make the HTTP request and wait for it to complete
			mutation.mutate(data, {
				onSuccess: async (data) => {
					const clientSecret = data.clientSecret;
					if (!clientSecret) {
						console.error('Missing clientSecret');
						return;
					}

					// Proceed with the payment confirmation using the clientSecret
					const { error } = await stripe.confirmPayment({
						elements,
						clientSecret: clientSecret,
						confirmParams: {
							return_url: `${window.location.origin}/success`,
						},
					});

					if (error) {
						setErrorMessage(error.message);
					}
				},
				onError: (error) => {
					setErrorMessage(error.message || 'An error occurred');
				},
			});
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<div
			className="h-screen -mt-4 flex justify-center items-center bg-gray-900"
			style={{
				backgroundImage: `url(${payment})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<form onSubmit={handleSubmit} className="m-8 p-12  bg-white rounded-lg shadow-md mx-auto">
				<div>
					<PaymentElement />
				</div>
				{/* display loading */}
				{mutation.isPending && <StatusMessage type="loading" message="Payment Processing, please wait..." />}
				{/* display error */}
				{mutation.isError && <StatusMessage type="error" message={mutation?.error?.response?.data?.message} />}
				{/* display success*/}
				{mutation.isSuccess && <StatusMessage type="success" message="Payment success" />}

				<button className="w-full py-2 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Pay
				</button>
				{errorMessage && <div className="text-red-500 text-xs mt-2">{errorMessage}</div>}
			</form>
		</div>
	);
};

export default CheckoutForm;
