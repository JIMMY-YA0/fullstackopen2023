const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL).then(() => {
      console.log('Connecting to mongodb...');
    });
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  }
};

module.exports = connectDB;
