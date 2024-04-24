const User = require('../models/User');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');
const getToken = require('../utils/getToken');

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
	newUser.trialExpires = new Date(new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000);

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
	//Find the user in db by email only
	const user = await User.findOne({
		email,
	});
	if (user && (await bcrypt.compare(password, user?.password))) {
		res.json({
			status: 'success',
			message: 'User logged in successfully',
			user,
			token: generateToken(user?._id),
		});
	} else {
		throw new Error('Invalid login credentials');
	}
});

//*logout
const logout = asyncHandler((req, res) => {
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
	const token = getToken(req); // Extract the token from the request
	if (!token) {
		return res.json({ isAuthenticated: false }); // No token found
	}
	// Verify the token
	const decoded = verifyToken(token);
	if (decoded) {
		// Token is valid
		res.json({ isAuthenticated: true });
	} else {
		// Token verification failed
		res.json({ isAuthenticated: false });
	}
});

module.exports = {
	register,
	login,
	logout,
	userProfile,
	checkAuth,
};
