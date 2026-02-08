const express = require('express');
const axios = require('axios');
const Song2 = require('../models/song2');

const router = express.Router();

/**
 * ============================================================
 *  GET /api/fetch-jamendo?artistId=9
 *  Only fetch from Jamendo API if DB is empty for this artist
 * ============================================================
 */
router.get('/api/fetch-jamendo', async (req, res) => {
  try {
    const artistId = req.query.artistId || '9';

    // 1️⃣ Check if DB already has songs for this artist
    const existingCount = await Song2.countDocuments({
      'artist.id': Number(artistId),
    });

    if (existingCount > 0) {
      return res.json({
        message: `DB already has ${existingCount} songs for artist ${artistId}. Skipping Jamendo fetch.`,
        skipped: true,
      });
    }

    // 2️⃣ Fetch from Jamendo ONLY if DB is empty
    const response = await axios.get(`https://api.jamendo.com/v3.0/tracks`, {
      params: {
        client_id: '544cca3f',
        format: 'json',
        limit: 200,
        artist_id: artistId,
      },
    });

    const tracks = response.data.results;

    if (!Array.isArray(tracks)) {
      return res.status(500).json({ error: 'Unexpected Jamendo data format' });
    }

    const cleanedTracks2 = tracks.map((track) => ({
      id: track.id,
      title: track.name,
      preview: track.audio,
      artist: {
        id: track.artist_id,
        name: track.artist_name,
        picture: track.album_image || '',
      },
      album: track.album_name,
    }));

    // 3️⃣ Insert into MongoDB
    const bulkOps = cleanedTracks2.map((track) => ({
      updateOne: {
        filter: { id: track.id },
        update: { $set: track },
        upsert: true,
      },
    }));

    await Song2.bulkWrite(bulkOps);

    res.json({
      message: `Fetched ${cleanedTracks2.length} tracks from Jamendo and saved to DB.`,
      skipped: false,
    });
  } catch (error) {
    console.error('Error fetching from Jamendo:', error.message);
    res.status(500).json({
      error: 'Failed to fetch Jamendo data',
      details: error.message,
    });
  }
});

/**
 * ============================================================
 *  GET /api/songs2?artistId=9
 *  Load songs from MongoDB only
 * ============================================================
 */
router.get('/api/songs2', async (req, res) => {
  const artistId = Number(req.query.artistId);

  try {
    const filter = artistId ? { 'artist.id': artistId } : {};
    const songs = await Song2.find(filter);
    res.json(songs);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve songs',
      details: error.message,
    });
  }
});

module.exports = router;
