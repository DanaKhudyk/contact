const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
	try {
		await mongoose
		.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('MongoDB connect');
	} catch (err) {
		console.log(err.messege);
		process.exit(1);
	};
};
module.exports = connectDB;