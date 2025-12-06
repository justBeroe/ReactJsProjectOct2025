const express = require('express');
const router = express.Router();
const User = require('../models/User');

// PUT /api/users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;