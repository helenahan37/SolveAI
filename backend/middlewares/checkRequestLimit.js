const asyncHandler = require('express-async-handler');
const User = require('../models/User');

//* Check Request Limit
const checkRequestLimit = asyncHandler(async (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const user = await User.findById(req?.user?.id);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	// Set request limit based on the user's current plan
	if (user.trialActive) {
		requestLimit = user.monthlyRequestCount; // Limit for trial users
	} else {
		switch (user.subscriptionPlan) {
			case 'Free':
				requestLimit = 5; // Example limit for Free plan users
				break;
			case 'Basic':
				requestLimit = 50; // Example limit for Basic plan users
				break;
			case 'Premium':
				requestLimit = 500; // Example limit for Premium plan users
				break;
			// Add more cases for additional plans
		}
	}

	// check if the use is exceeding the limit
	if (user?.apiRequestCount >= requestLimit) {
		throw new Error(
			'You have exceeded your monthly request limit, please upgrade your plan to continue using the service.'
		);
	}
	next();
});

module.exports = { checkRequestLimit };
