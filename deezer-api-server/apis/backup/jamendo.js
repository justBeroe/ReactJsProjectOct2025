const express = require('express');
const axios = require('axios');
const Song2 = require('../models/song2');

const router = express.Router();

// GET /api/fetch-deezer?artistId=85
router.get('/api/fetch-jamendo', async (req, res) => {
  try {
    const artistId = req.query.artistId || '9';

    //Modification in progress 
    // https://api.jamendo.com/v3.0/tracks/?client_id=544cca3f&format=json&limit=200&artist_id=9

    // FROM checking ---> https://api.deezer.com/artist/${artistId}/top?limit=50
    const response = await axios.get(`https://api.jamendo.com/v3.0/tracks`, {
      params: {
        client_id: '544cca3f', // ✅ replace with your actual Jamendo client ID
        format: 'json',
        limit: 200,
        artist_id: artistId
      }
    });
    const tracks = response.data.results;

    if (!Array.isArray(tracks)) {
      return res.status(500).json({ error: 'Unexpected Deezer data format' });
    }

    const cleanedTracks2 = tracks.map(track => ({
      id: track.id,
      title: track.name,
      preview: track.audio, // or use 'audiodownload' if you prefer full track download
      artist: {
        id: track.artist_id,
        name: track.artist_name,
        picture: track.album_image || '' // or provide a default artist image if needed
      },
      album: track.album_name
    }));

    // await Song2.deleteMany({});
    // await Song2.insertMany(cleanedTracks);

    // Put all in MongoDB

     const bulkOps = cleanedTracks2.map(track => ({
      updateOne: {
        filter: { id: track.id },
        update: { $set: track },
        upsert: true
      }
    }));

    const result = await Song2.bulkWrite(bulkOps);

    res.json({ message: `✅ Data fetched for artist ${artistId} and saved to MongoDB`, count: cleanedTracks2.length });
  } catch (error) {
    console.error('Error fetching from Deezer:', error.message);
    res.status(500).json({ error: 'Failed to fetch Deezer data', details: error.message });
  }
});

// GET /api/songs
// router.get('/api/songs2', async (req, res) => {
//   try {
//     const songs = await Song2.find({});
//     res.json(songs);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve songs', details: error.message });
//   }
// });
router.get('/api/songs2', async (req, res) => {
  const artistId = Number(req.query.artistId);
  try {
    const filter = artistId ? { 'artist.id': artistId } : {};
    const songs = await Song2.find(filter);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve songs', details: error.message });
  }
});
module.exports = router;
