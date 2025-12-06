const express = require('express');
const axios = require('axios');

const router = express.Router();

// GET /api/top-radio-stations - return top 40 radio stations
router.get('/api/top-radio-stations', async (req, res) => {
  try {
    const response = await axios.get('https://de1.api.radio-browser.info/json/stations/topclick/40');

    // Map only the required fields
    const stations = response.data.map(station => ({
      name: station.name,
      url: station.url_resolved || station.url,
      favicon: station.favicon,
      country: station.country
    }));

    res.json(stations);
  } catch (error) {
    console.error('Error fetching radio stations:', error.message);
    res.status(500).json({ error: 'Failed to fetch radio stations', details: error.message });
  }
});

module.exports = router;
