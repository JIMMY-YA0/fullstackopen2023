const express = require('express');
const { login } = require('../controllers/login');
const LoginRouter = express.Router();

LoginRouter.route('/').post(login);

module.exports = LoginRouter;
