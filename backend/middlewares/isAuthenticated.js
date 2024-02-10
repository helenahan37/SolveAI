const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = asyncHandler(async (req, res, next) => {
	if (req.cookies.token) {
		//decode the token
		const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
		req.user = await User.findById(decode?.id).select('-password');
		return next();
	} else {
		res.status(401).json({ message: 'Not authorized' });
	}
});

module.exports = { isAuthenticated };
