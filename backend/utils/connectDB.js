const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connectDB = await mongoose.connect(
			'mongodb+srv://admin:FrlIdOeFDbQMWShF@ai-blog-generator.xax5esf.mongodb.net/?retryWrites=true&w=majority'
		);
		console.log(`MongoDB Connected: ${connectDB.connection.host}`);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`);
		process.exit(1);
	}
};
module.exports = connectDB;
