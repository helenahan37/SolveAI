import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { handleFreeSubscriptionAPI } from '../../apis/stripePayment/stripePayment';
import StatusMessage from '../Alert/statusMessage';

const FreePlanSubscription = () => {
	const planDetails = {
		name: 'Free',
		price: '$0.00/month',
		features: ['10 Credits', '1 User', 'Basic Support'],
	};
	const mutation = useMutation({ mutationFn: handleFreeSubscriptionAPI });

	//confirm payment handler
	const handleConfirmPayment = () => {
		mutation.mutate();
	};
	console.log(mutation);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
			<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
				<h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Confirm Your {planDetails.name} Plan</h2>

				{/* display loading */}
				{mutation.isPending && <StatusMessage type="loading" message="Loading..." />}
				{/* display error */}
				{mutation.isError && <StatusMessage type="error" message={mutation?.error?.response?.data?.error} />}
				{/* display success*/}
				{mutation.isSuccess && <StatusMessage type="success" message="Subscription success" />}

				<p className="text-center text-gray-600 mb-4 mt-3">
					Enjoy our free plan with no costs involved. Get started now and upgrade anytime to access more features.
				</p>
				<ul className="list-disc list-inside mb-6 text-gray-600">
					{planDetails.features.map((feature, index) => (
						<li key={index}>{feature}</li>
					))}
				</ul>
				<div className="text-center text-green-600 font-bold mb-6">{planDetails.price} - No Payment Required</div>
				<button
					onClick={handleConfirmPayment}
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Confirm Free Plan : $0.00/month
				</button>
			</div>
		</div>
	);
};

export default FreePlanSubscription;
