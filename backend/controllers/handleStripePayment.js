const asyncHandler = require('express-async-handler');
const { shouldRenewalSubscription } = require('../utils/shouldRenewalSubscription');
const { calculateNextBillingDate } = require('../utils/nextBillingDate');
const Payment = require('../models/Payment');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//* Handle Payment
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

		res.json({
			clientSecret: payment?.client_secret,
			paymentId: payment?.id,
			metedata: payment?.metadata,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//* Handle free subscription plan
const handleFreeSubscription = asyncHandler(async (req, res) => {
	const user = req?.user;

	//check if user should renew subscription
	try {
		if (shouldRenewalSubscription(user)) {
			user.subscriptionPlan = 'Free';
			user.monthlyRequestCount = 10;
			user.apiRequestCount = 0;
			user.nextBillingDate = calculateNextBillingDate();
			// make new payment
			const newPayment = await Payment.create({
				user: user?._id,
				subscriptionPlan: 'Free',
				amount: 0,
				status: 'Success',
				reference: Math.random().toString(36).substring(7),
				monthlyRequestCount: 10,
				currency: 'usd',
			});
			// push payment to user and save
			user.payments.push(newPayment?._id);
			await user.save();

			res.json({
				status: 'Success',
				message: 'Subscription renewed successfully',
				user,
			});
		} else {
			res.status(403).json({ error: 'Subscription is not due yet' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
module.exports = { handlePayment, handleFreeSubscription };
