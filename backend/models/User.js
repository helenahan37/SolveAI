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
		trialPeriod: {
			type: Number,
			default: 3,
		},
		trialExpries: {
			type: Date,
		},
		subscriptionPlan: {
			type: String,
			enum: ['Trial', 'Free', 'Basic', 'Premium'],
			default: 'Trial',
		},
		apiRequestCount: {
			type: Number,
			default: 0,
		},
		monthlyRequestCount: {
			type: Number,
			default: 5, //5 credit for 3 days
		},
		nextBillingDate: Date,
		payments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Payment',
			},
		],
		contentHistory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ContentHistory',
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add a virtual field to the schema
userSchema.virtual('isTrialActive').get(function () {
	return this.trialAcitive && new Date() < this.trialExpries;
});

//! Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
