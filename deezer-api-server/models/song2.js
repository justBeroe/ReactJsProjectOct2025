const mongoose = require('mongoose');

const songSchema2 = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: String,
  preview: String,
  artist: {
    id: Number,
    name: String,
    picture: String
  },
  album: String
});

module.exports = mongoose.model('Song2', songSchema2);

//creates a MongoDB collection named:
