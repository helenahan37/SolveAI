const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const verifyToken = require('../utils/verifyToken');
const getToken = require('../utils/getToken');

const isAuthenticated = asyncHandler(async (req, res, next) => {
	const token = getToken();
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = verifyToken(token);
		req.user = await User.findById(decoded?.id).select('-password');
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
});

module.exports = { isAuthenticated };
