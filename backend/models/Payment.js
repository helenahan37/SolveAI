const mongoose = require('mongoose');

// Create payment schema
const paymentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		reference: {
			type: String,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: 'pending',
			reqiore: true,
		},
		subscriptionPlan: {
			type: String,
			required: true,
		},
		amounts: {
			type: Number,
			default: 0,
		},
		monthlyRequestCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

//! Create User model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
