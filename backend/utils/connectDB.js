const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
	try {
		const connectDB = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB Connected: ${connectDB.connection.host}`);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`);
		process.exit(1);
	}
};
module.exports = connectDB;
