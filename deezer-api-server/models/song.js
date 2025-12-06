const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: String,
  preview: String,
  artist: {
    id: Number,
    name: String,
    picture: String
  },
  album: {
    id: Number,
    title: String,
    cover: String
  }
});

module.exports = mongoose.model('Song', songSchema);

//creates a MongoDB collection named:
