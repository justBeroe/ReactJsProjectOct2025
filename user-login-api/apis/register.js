const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /registerin
router.post('/registerin', async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  if (!username || !email || password !== rePassword) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const user = new User({ username, email, password }); // plain text password
  await user.save();

  // res.status(201).json({ message: 'User created successfully (not hashed)' });
  res.status(201).json({
  message: 'User created successfully (not hashed)',
  user: {
    _id: user._id,
    username: user.username,
    email: user.email
  }
});



});

module.exports = router;
