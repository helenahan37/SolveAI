const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handlePayment = asyncHandler(async (req, res) => {
	const { amount, subscriptionPlan } = req.body;
	const user = req?.user;

	try {
		const payment = await stripe.paymentIntents.create({
			amount: Number(amount) * 100,
			currency: 'usd',
			//extra payment info
			metadata: {
				userId: user?._id?.toString(),
				userEmail: user?.email,
				subscriptionPlan,
			},
		});
		console.log(payment);

		res.json({
			clientSecret: payment?.client_secret,
			paymentId: payment?.id,
			metedata: payment?.metadata,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = { handlePayment };
