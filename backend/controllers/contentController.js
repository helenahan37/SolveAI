const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const contentHistory = require('../models/ContentHistory');

const deleteContent = asyncHandler(async (req, res) => {
	const deletedContent = await contentHistory.findByIdAndDelete(req?.params.contentId);
	if (!deletedContent) {
		return res.status(404).json({ status: 'error', message: 'Content not found' });
	}

	const user = await User.findById(req.user?._id);
	if (user) {
		user?.contentHistory.pull(deletedContent?._id);
		await user.save();
	}

	res.status(200).json({
		status: 'Success',
		message: 'Content deleted successfully',
	});
});

module.exports = { deleteContent };
