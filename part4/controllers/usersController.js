const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json({ error: 'Please provide all required inputs' });
  }
  if (password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const createdUser = await User.create({
    username,
    name,
    passwordHash,
  });
  res.status(201).json({
    status: 'success',
    data: createdUser,
  });
};

const getAllUsersInfo = async (req, res) => {
  const usersInfo = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
  res.status(201).json({
    status: 'success',
    data: usersInfo,
  });
};

module.exports = { signUp, getAllUsersInfo };
