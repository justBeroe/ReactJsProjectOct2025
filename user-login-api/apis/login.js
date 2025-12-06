const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /loginin
router.post('/loginin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const userData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  res.json(userData);
});

module.exports = router;
