const express = require('express');
const axios = require('axios');
const Song = require('../models/song');

const router = express.Router();

// GET /api/artists
router.get('/api/deezer-artists', async (req, res) => {
  try {
    // Use aggregation to get distinct artist.id and artist.name pairs
    const artists = await Song.aggregate([
      {
        $group: {
          _id: '$artist.id',       // group by artist ID
          name: { $first: '$artist.name' }  // get first artist name in the group
        }
      },
      {
        $project: {
          _id: 0,      // exclude MongoDB default _id field
          id: '$_id',  // rename _id to id
          name: 1      // include name field
        }
      },
      {
        $sort: { name: 1 }  // optional: sort alphabetically by name
      }
    ]);

    res.json(artists);  // return list of {id, name}
  } catch (error) {
    console.error('Error fetching artists:', error.message);
    res.status(500).json({ error: 'Failed to retrieve artists', details: error.message });
  }
});

module.exports = router;