const express = require('express');
const axios = require('axios');
const Song = require('../models/song');
// const pLimit = require('p-limit');
const pLimit = require('p-limit').default;

const router = express.Router();

// GET /api/fetch-deezer-all?start=1&end=100
router.get('/api/fetch-deezer-all', async (req, res) => {
  try {
    const start = Number(req.query.start) || 1;
    const end = Number(req.query.end) || 100;

    const limit = pLimit(5); // max 5 requests at the same time
    const allTracks = [];

    // Build tasks for each artist
    const tasks = [];
    for (let artistId = start; artistId <= end; artistId++) {
      tasks.push(
        limit(async () => {
          try {
            const response = await axios.get(`https://api.deezer.com/artist/${artistId}/top?limit=50`);
            const tracks = response.data.data;

            if (!Array.isArray(tracks)) return [];

            return tracks.map(track => ({
              id: track.id,
              title: track.title,
              preview: track.preview,
              artist: {
                id: track.artist.id,
                name: track.artist.name,
                picture: track.artist.picture
              },
              album: {
                id: track.album.id,
                title: track.album.title,
                cover: track.album.cover
              }
            }));
          } catch (innerErr) {
            console.warn(`⚠️ Failed to fetch artist ${artistId}: ${innerErr.message}`);
            return [];
          }
        })
      );
    }

    // Run all tasks with concurrency
    const results = await Promise.all(tasks);

    // Flatten results
    results.forEach(tracks => allTracks.push(...tracks));

    // Bulk upsert into MongoDB
    if (allTracks.length > 0) {
      const bulkOps = allTracks.map(track => ({
        updateOne: {
          filter: { id: track.id },
          update: { $set: track },
          upsert: true
        }
      }));

      await Song.bulkWrite(bulkOps);
    }

    res.json({
      message: `✅ Data fetched for artists ${start}–${end} and saved to MongoDB`,
      totalTracks: allTracks.length
    });
  } catch (error) {
    console.error('Error fetching from Deezer:', error.message);
    res.status(500).json({ error: 'Failed to fetch Deezer data', details: error.message });
  }
});

module.exports = router;
