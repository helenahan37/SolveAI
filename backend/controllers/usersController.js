const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

//* Registration
const register = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	//validation
	if (!username || !email || !password) {
		res.status(400);
		throw new Error('Please enter all fields');
	}

	//check if the email already exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create a new user
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	//calcuate the trial end date
	newUser.trialExpries = new Date(new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000);

	// Save the user
	await newUser.save();

	res.json({
		status: 'Success',
		message: 'User registered successfully',
		user: {
			username,
			email,
		},
	});
});

//* login
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//validation
	const user = await User.findOne({ email });
	if (!user) {
		res.status(401);
		throw new Error('Invalid email or password');
	}
	//check if the password is correct
	const isPasswordMatch = await bcrypt.compare(password, user?.password);
	if (!isPasswordMatch) {
		res.status(401);
		throw new Error('Invalid email or password');
	}

	//Generate token
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '7d', // token will expire in 7 days
	});
	//set token in cookie
	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'none',
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
	});

	//send response
	res.json({
		status: 'Success',
		_id: user?._id,
		message: 'User logged in successfully',
		username: user?.username,
		email: user?.email,
	});
});

//*logout
const logout = asyncHandler((req, res) => {
	res.clearCookie('token');
	res.json({
		status: 'Success',
		message: 'User logged out successfully',
	});
});

//*user profile
const userProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req?.user?.id).select('-password').populate('payments').populate('contentHistory');
	if (user) {
		res.json({
			status: 'Success',
			user,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//* Check user auth
const checkAuth = asyncHandler(async (req, res, next) => {
	const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
	if (decode) {
		res.json({
			isAuthenticated: true,
		});
	} else {
		res.json({
			isAuthenticated: false,
		});
	}
});

module.exports = {
	register,
	login,
	logout,
	userProfile,
	checkAuth,
};
