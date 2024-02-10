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

	let requestLimit = 0;
	if (user?.trialAcitive) {
		requestLimit = user?.monthlyRequestCount;
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
