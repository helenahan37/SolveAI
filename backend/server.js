const express = require('express');
const usersRouter = require('./routes/usersRouter');
const { errorHandler } = require('./middlewares/errorMiddleware');
require('./utils/connectDB')();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//===Middleware===//
//pass incoming jaon data
app.use(express.json());

//===Routes===//
app.use('/api/users', usersRouter);

//===Error Handler===//
app.use(errorHandler);

// Serve static files
app.listen(PORT, console.log(`Server started on port ${PORT}`));
