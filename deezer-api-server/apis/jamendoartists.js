const express = require('express');
const axios = require('axios');
const Song2 = require('../models/song2');

const router = express.Router();

// GET /api/artists - return unique artists (id + name)
router.get('/api/jamen-artists', async (req, res) => {
  try {
    // Use MongoDB aggregation to get distinct artist.id and artist.name pairs
    const artists = await Song2.aggregate([
      {
        $group: {
          _id: '$artist.id',
          name: { $first: '$artist.name' }
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1
        }
      },
      {
        $sort: { name: 1 } // optional: sort alphabetically by artist name
      }
    ]);

    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error.message);
    res.status(500).json({ error: 'Failed to retrieve artists', details: error.message });
  }
});

module.exports = router;