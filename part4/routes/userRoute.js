const express = require('express');
const UserRouter = express.Router();

const { signUp, getAllUsersInfo } = require('../controllers/usersController');

UserRouter.route('/').post(signUp).get(getAllUsersInfo);

module.exports = UserRouter;
