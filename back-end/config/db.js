const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.set('strictQuery', true); // or false, depending on your preference
        console.log('DB Connected !');
    } catch (error) {
        console.log('DB Disconnected.. ', error);
        process.exit(1);
    }
};

module.exports = connectDB;
