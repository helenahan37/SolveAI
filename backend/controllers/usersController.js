const User = require('../models/User');
const bycrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Registration
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
	const salt = await bycrypt.genSalt(10);
	const hashedPassword = await bycrypt.hash(password, salt);

	// Create a new user
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	//calcuate the trial end date
	newUser.tiralExpries = new Date(new Date().getTime() + newUser.tialPeriod * 24 * 60 * 60 * 1000);

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

// login
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//validation
	const user = await User.findOne({ email });
	if (!user) {
		res.status(401);
		throw new Error('Invalid email or password');
	}
	//check if the password is correct
	const isPasswordMatch = await bycrypt.compare(password, user?.password);
	if (!isPasswordMatch) {
		res.status(401);
		throw new Error('Invalid email or password');
	}

	//Generate token
	//set token in cookie

	//send response
	res.json({
		status: 'Success',
		_id: user?._id,
		message: 'User logged in successfully',
		username: user?.username,
		email: user?.email,
	});
});

module.exports = {
	register,
	login,
};
