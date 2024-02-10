const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { errorHandler } = require('./middlewares/errorMiddleware');
const stripeRouter = require('./routes/stripeRouter');
const usersRouter = require('./routes/usersRouter');
const openAIRouter = require('./routes/openAIRouter');
require('./utils/connectDB')();

const app = express();
const PORT = process.env.PORT || 5000;

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
