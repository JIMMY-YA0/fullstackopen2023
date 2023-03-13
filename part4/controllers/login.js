const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  //Encapsulate username,id into token
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1d' })

  res.status(200).send({ token, username: user.username, name: user.name })
}

module.exports = { login }
