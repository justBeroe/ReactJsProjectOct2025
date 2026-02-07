const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
// --- Changed/Added: use environment variable for security and proper Atlas URI ---
const MONGO_URI = process.env.MONGO_URI || 
  'mongodb+srv://beroe:beroe@beroecluster1.7pneahu.mongodb.net/userdb?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// --- Added: then/catch to log success or failure ---
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));


// Load API routes dynamically
const apisPath = path.join(__dirname, 'apis');
fs.readdirSync(apisPath).forEach((file) => {
  if (file.endsWith('.js')) {
    try {
      const route = require(path.join(apisPath, file));
      app.use('/', route);
      console.log(`✔ Loaded API route: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to load ${file}:`, err.message);
    }
  }
});

// --- Changed: use Render's dynamic port instead of hardcoded 5000 ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
