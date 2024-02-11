const asyncHandler = require('express-async-handler');
const { shouldRenewalSubscription } = require('../utils/shouldRenewalSubscription');
const { calculateNextBillingDate } = require('../utils/nextBillingDate');
const Payment = require('../models/Payment');
const User = require('../models/User');

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
		console.log(payment);
		res.json({
			clientSecret: payment?.client_secret,
			paymentId: payment?.id,
			metadata: payment?.metadata,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

//* Vefify payment
const verifyPayment = asyncHandler(async (req, res) => {
	const { paymentId } = req.params;
	try {
		const payment = await stripe.paymentIntents.retrieve(paymentId);
		if (payment.status === 'succeeded') {
			//get info from metadata
			const metadata = payment?.metadata;
			const subscriptionPlan = metadata?.subscriptionPlan;
			const userEmail = metadata?.userEmail;
			const userId = metadata?.userId;

			// find user
			//find the user
			const userFound = await User.findById(userId);
			if (!userFound) {
				return res.status(404).json({
					status: 'false',
					message: 'User not found',
				});
			}

			//get payment details
			const amount = payment?.amount / 100;
			const currency = payment?.currency;
			const paymentId = payment?.id;

			//update payment
			const newPayment = await Payment.create({
				user: userId,
				email: userEmail,
				subscriptionPlan,
				amount,
				currency,
				status: 'Success',
				reference: paymentId,
			});

			//check subscription plan
			if (subscriptionPlan === 'Basic') {
				const updateUser = await User.findByIdAndUpdate(userId, {
					trialPeriod: 0,
					monthlyRequestCount: 50,
					nextBillingDate: calculateNextBillingDate(),
					apiRequestCount: 0,
					subscriptionPlan: 'Basic',
					$addToSet: { payments: newPayment?._id },
				});

				res.json({
					status: 'Success',
					message: 'Payment successful, subscription plan updated',
					updateUser,
				});
			}

			if (subscriptionPlan === 'Premium') {
				const updateUser = await User.findByIdAndUpdate(userId, {
					trialPeriod: 0,
					monthlyRequestCount: 100,
					nextBillingDate: calculateNextBillingDate(),
					subscriptionPlan: 'Premium',
					apiRequestCount: 0,
					$addToSet: { payments: newPayment?._id },
				});

				res.json({
					status: 'Success',
					message: 'Payment successful, subscription plan updated',
					updateUser,
				});
			}
		}
	} catch (error) {
		console.log(error);
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

module.exports = { handlePayment, handleFreeSubscription, verifyPayment };
