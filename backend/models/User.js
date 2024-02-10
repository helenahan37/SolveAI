const mongoose = require('mongoose');

// Create a schema
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		trialAcitive: {
			type: Boolean,
			default: true,
		},
		tialPeriod: {
			type: Number,
			default: 3,
		},
		tiralExpries: {
			type: Date,
		},
		subscription: {
			type: Boolean,
			enum: ['Trial', 'Free', 'Basic', 'Premium'],
		},
		apiRequestCount: {
			type: Number,
			default: 0,
		},
		monthlyRequestCount: {
			type: Number,
			default: 0,
		},
		nextBillingDate: Date,
		payments: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Payment',
		},
		historys: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'History',
		},
	},
	{
		timestamps: true,
	}
);

//! Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
