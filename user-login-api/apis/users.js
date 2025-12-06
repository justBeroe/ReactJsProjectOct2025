const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users → Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // get all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
