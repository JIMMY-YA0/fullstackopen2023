const mongoose = require('mongoose');
const logger = require('./logger');
require('dotenv').config();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB_TEST = process.env.TEST_MONGODB_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const MONGODB_URL = process.env.NODE_ENV === 'development' ? DB_TEST : DB;

const mongoConnect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => logger.info('DB connection successful'))
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);
    });
};

const mongoDisconnect = () => {
  mongoose
    .disconnect(DB)
    .then(() => logger.info('DB disconnection successful'))
    .catch((err) => {
      logger.error('error disconnecting MongoDB:', err.message);
    });
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
