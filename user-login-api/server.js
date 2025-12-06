const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const apisPath = path.join(__dirname, 'apis');
fs.readdirSync(apisPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const fullPath = path.join(apisPath, file);
    try {
      const route = require(fullPath);
      app.use('/', route);
      console.log(`✔ Loaded API route from ${file}`);
    } catch (err) {
      console.error(`❌ Failed to load ${file}:`, err.message);
    }
  }
});


// Start the server
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
