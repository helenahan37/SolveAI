const express = require('express');
const app = express();
const cors = require('cors');
//*===CORS===//
// const corsOptions = {
// 	origin: 'https://solveai.netlify.app',
// 	credentials: true,
// };

app.use('*', function (req, res, next) {
	if (req.headers.referer?.includes('https://solveai.netlify.app')) {
		res.header('Access-Control-Allow-Origin', 'https://solveai.netlify.app');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	}

	if (req.method === 'OPTIONS') {
		next();
	} else {
		next();
	}
});

require('dotenv').config();

const cookieParser = require('cookie-parser');

const User = require('./models/User');
const cron = require('node-cron');

const { errorHandler } = require('./middlewares/errorMiddleware');
const stripeRouter = require('./routes/stripeRouter');
const usersRouter = require('./routes/usersRouter');
const openAIRouter = require('./routes/openAIRouter');
require('./utils/connectDB')();

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

//*===Routes===//
app.use('/api/users', usersRouter);
app.use('/api/openai', openAIRouter);
app.use('/api/stripe', stripeRouter);

//*===Error Handler===//
app.use(errorHandler);

// Serve static files
app.listen(PORT, console.log(`Server started on port ${PORT}`));
