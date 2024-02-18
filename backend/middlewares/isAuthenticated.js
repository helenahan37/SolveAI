const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const verifyToken = require('../utils/verifyToken');
const getToken = require('../utils/getToken');

const isAuthenticated = asyncHandler(async (req, res, next) => {
	const token = getToken(req);

	if (token) {
		try {
			const decoded = verifyToken(token);

			if (!decoded) {
				return res.status(401).json({ message: 'Not authorized, token failed' });
			}

			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			console.error('Error in token verification:', error);
			res.status(401).json({ message: 'Not authorized, token failed' });
		}
	} else {
		res.status(401).json({ message: token });
	}
});

module.exports = { isAuthenticated };
