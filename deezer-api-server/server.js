const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/deezerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Load all route files from apis/
const apisPath = path.join(__dirname, 'apis');
fs.readdirSync(apisPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const route = require(path.join(apisPath, file));
    app.use('/', route);
    console.log(`✔ Loaded route: ${file}`);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
