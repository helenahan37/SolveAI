const asyncHandler = require('express-async-handler');
const axios = require('axios');
const User = require('../models/User');
const ContentHistory = require('../models/ContentHistory');

//* OpenAI Controller
const openAIController = asyncHandler(async (req, res) => {
	const { prompt } = req.body;
	console.log(prompt);

	try {
		const response = await axios.post(
			'https://api.openai.com/v1/completions',
			{
				model: 'gpt-3.5-turbo-instruct',
				prompt,
				max_tokens: 10,
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		//send the response
		const content = response?.data?.choices[0].text?.trim();
		//create generate history
		const newContent = await ContentHistory.create({
			user: req.user._id,
			content,
		});
		//send response
		res.status(200).json(content);
		// push content history into user
		const user = await User.findById(req?.user?._id);
		user.contentHistory.push(newContent?._id);

		// update user apiRequestCount
		user.apiRequestCount += 1;
		await user.save();
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = { openAIController };
