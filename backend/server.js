const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const User = require('./models/User');
const cron = require('node-cron');
require('dotenv').config();

const { errorHandler } = require('./middlewares/errorMiddleware');
const stripeRouter = require('./routes/stripeRouter');
const usersRouter = require('./routes/usersRouter');
const openAIRouter = require('./routes/openAIRouter');
require('./utils/connectDB')();

const app = express();
const PORT = process.env.PORT || 5000;

//*===Cron Jobs===//
//* Cron for trial period
// cron check pay period on every single day
cron.schedule('0 0 * * * *', async () => {
	try {
		const today = new Date();
		await User.updateMany(
			{
				trialAcitive: true,
				nextBillingDate: { $lt: today },
			},
			{
				trialAcitive: false,
				subscriptionPlan: 'Free', //put user to free plan after trail expires
				monthlyRequestCount: 10, //reset request count
			}
		);
	} catch (error) {
		console.error(error);
	}
});

// *  Cron for Free plan
// cron check pay period on every end of the month
cron.schedule('0 0 1 * * *', async () => {
	try {
		const today = new Date();
		await User.updateMany(
			{
				subscriptionPlan: 'Free',
				nextBillingDate: { $lt: today },
			},
			{
				monthlyRequestCount: 0, //reset request count
			}
		);
	} catch (error) {
		console.error(error);
	}
});

// *  Cron for Basic plan
// cron check pay period on every end of the month
cron.schedule('0 0 1 * * *', async () => {
	try {
		const today = new Date();
		await User.updateMany(
			{
				subscriptionPlan: 'Basic',
				nextBillingDate: { $lt: today },
			},
			{
				monthlyRequestCount: 0, //reset request count
			}
		);
	} catch (error) {
		console.error(error);
	}
});

// *  Cron for Premium plan
// cron check pay period on every end of the month
cron.schedule('0 0 1 * * *', async () => {
	try {
		const today = new Date();
		await User.updateMany(
			{
				subscriptionPlan: 'Premium',
				nextBillingDate: { $lt: today },
			},
			{
				monthlyRequestCount: 0, //reset request count
			}
		);
	} catch (error) {
		console.error(error);
	}
});

//*===Middleware===//
//pass incoming jaon data
app.use(express.json());
//parse cookies
app.use(cookieParser());

//*===CORS===//
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};
app.use(cors(corsOptions));

//*===Routes===//
app.use('/api/users', usersRouter);
app.use('/api/openai', openAIRouter);
app.use('/api/stripe', stripeRouter);

//*===Error Handler===//
app.use(errorHandler);

// Serve static files
app.listen(PORT, console.log(`Server started on port ${PORT}`));
