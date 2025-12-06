const express = require('express');
const axios = require('axios');
const Song = require('../models/song');

const router = express.Router();

// DELETE /api/songs -> Delete all songs
router.delete('/api/delete-songs', async (req, res) => {
  try {
    const result = await Song.deleteMany({});
    res.json({
      message: '✅ All songs deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting all songs:', error.message);
    res.status(500).json({
      error: 'Failed to delete all songs',
      details: error.message
    });
  }
});

module.exports = router;