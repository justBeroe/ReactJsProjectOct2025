const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  created_at: String,
  updated_at: String,
  userId: { type: String, required: true },
  artistId: { type: Number, required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
