const mongoose = require('mongoose');

// Create payment schema
const historySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		content: {
			type: String,
			required: true,
		},
		prompt: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

//! Create User model
const ContentHistory = mongoose.model('ContentHistory', historySchema);

module.exports = ContentHistory;
