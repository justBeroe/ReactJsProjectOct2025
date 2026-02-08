const express = require('express');
const axios = require('axios');
const Song = require('../models/song');

const router = express.Router();

/**
 * ============================================================
 *  GET /api/fetch-deezer?artistId=85
 *  Only fetch from Deezer API if DB is empty for this artist
 * ============================================================
 */
router.get('/api/fetch-deezer', async (req, res) => {
  try {
    const artistId = req.query.artistId || '85';

    // 1️⃣ Check if DB already has songs for this artist
    const existingCount = await Song.countDocuments({
      'artist.id': Number(artistId),
    });

    if (existingCount > 0) {
      return res.json({
        message: `DB already has ${existingCount} songs for artist ${artistId}. Skipping Deezer fetch.`,
        skipped: true,
      });
    }

    // 2️⃣ Fetch from Deezer ONLY if DB is empty
    const response = await axios.get(
      `https://api.deezer.com/artist/${artistId}/top?limit=50`
    );

    const tracks = response.data.data;

    if (!Array.isArray(tracks)) {
      return res.status(500).json({ error: 'Unexpected Deezer data format' });
    }

    const cleanedTracks = tracks.map((track) => ({
      id: track.id,
      title: track.title,
      preview: track.preview,
      artist: {
        id: track.artist.id,
        name: track.artist.name,
        picture: track.artist.picture,
      },
      album: {
        id: track.album.id,
        title: track.album.title,
        cover: track.album.cover,
      },
    }));

    // 3️⃣ Insert into MongoDB
    const bulkOps = cleanedTracks.map((track) => ({
      updateOne: {
        filter: { id: track.id },
        update: { $set: track },
        upsert: true,
      },
    }));

    await Song.bulkWrite(bulkOps);

    res.json({
      message: `Fetched ${cleanedTracks.length} tracks from Deezer and saved to DB.`,
      skipped: false,
    });
  } catch (error) {
    console.error('Error fetching from Deezer:', error.message);
    res.status(500).json({
      error: 'Failed to fetch Deezer data',
      details: error.message,
    });
  }
});

/**
 * ============================================================
 *  GET /api/songs?artistId=85
 *  Load songs from MongoDB only
 * ============================================================
 */
router.get('/api/songs', async (req, res) => {
  const artistId = Number(req.query.artistId);

  try {
    const filter = artistId ? { 'artist.id': artistId } : {};
    const songs = await Song.find(filter);
    res.json(songs);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve songs',
      details: error.message,
    });
  }
});

/**
 * ============================================================
 *  PUT /api/songs/:id
 * ============================================================
 */
router.put('/api/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id;
    const updateData = req.body;

    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json({ message: 'Song updated successfully', song: updatedSong });
  } catch (error) {
    console.error('Error updating song:', error.message);
    res.status(500).json({
      error: 'Failed to update song',
      details: error.message,
    });
  }
});

/**
 * ============================================================
 *  DELETE /api/songs/:id
 * ============================================================
 */
router.delete('/api/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id;

    const deletedSong = await Song.findByIdAndDelete(songId);

    if (!deletedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json({ message: 'Song deleted successfully', song: deletedSong });
  } catch (error) {
    console.error('Error deleting song:', error.message);
    res.status(500).json({
      error: 'Failed to delete song',
      details: error.message,
    });
  }
});

/**
 * ============================================================
 *  GET /api/fetch-deezer?start=1&end=100
 *  Multi-artist fetch — optimized to skip artists already in DB
 * ============================================================
 */
router.get('/api/fetch-deezer-range', async (req, res) => {
  try {
    const start = Number(req.query.start) || 1;
    const end = Number(req.query.end) || 100;

    const allTracks = [];

    for (let artistId = start; artistId <= end; artistId++) {
      try {
        // Skip if DB already has songs for this artist
        const existingCount = await Song.countDocuments({
          'artist.id': artistId,
        });

        if (existingCount > 0) {
          console.log(`Skipping artist ${artistId} — already in DB`);
          continue;
        }

        const response = await axios.get(
          `https://api.deezer.com/artist/${artistId}/top?limit=50`
        );

        const tracks = response.data.data;
        if (!Array.isArray(tracks)) continue;

        const cleanedTracks = tracks.map((track) => ({
          id: track.id,
          title: track.title,
          preview: track.preview,
          artist: {
            id: track.artist.id,
            name: track.artist.name,
            picture: track.artist.picture,
          },
          album: {
            id: track.album.id,
            title: track.album.title,
            cover: track.album.cover,
          },
        }));

        allTracks.push(...cleanedTracks);
      } catch (innerErr) {
        console.warn(
          `⚠️ Failed to fetch artist ${artistId}: ${innerErr.message}`
        );
      }
    }

    if (allTracks.length > 0) {
      const bulkOps = allTracks.map((track) => ({
        updateOne: {
          filter: { id: track.id },
          update: { $set: track },
          upsert: true,
        },
      }));

      await Song.bulkWrite(bulkOps);
    }

    res.json({
      message: `Processed artists ${start}–${end}`,
      totalTracks: allTracks.length,
    });
  } catch (error) {
    console.error('Error fetching from Deezer:', error.message);
    res.status(500).json({
      error: 'Failed to fetch Deezer data',
      details: error.message,
    });
  }
});

module.exports = router;
