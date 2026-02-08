const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

/**
 * POST /api/comments
 * Create a new comment
 */
router.post('/api/comments', async (req, res) => {
  try {
    const { text, created_at, updated_at, userId, artistId } = req.body;

    const comment = new Comment({ text, created_at, updated_at, userId, artistId });
    await comment.save();

    res.json({ message: '✅ Comment created', comment });
  } catch (error) {
    console.error('Error creating comment:', error.message);
    res.status(500).json({ error: 'Failed to create comment', details: error.message });
  }
});

/**
 * GET /api/comments?artistId=123&userId=456
 * Get comments (filtered by artistId & userId if provided)
 */
router.get('/api/comments', async (req, res) => {
  try {
    const { artistId, userId } = req.query;
    const filter = {};

    if (artistId) filter.artistId = artistId;
    if (userId) filter.userId = userId;

    const comments = await Comment.find(filter);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    res.status(500).json({ error: 'Failed to fetch comments', details: error.message });
  }
});

/**
 * PUT /api/comments/:id
 * Update a comment by its MongoDB _id
 */
router.put('/api/comments/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    const updateData = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: '✅ Comment updated', comment: updatedComment });
  } catch (error) {
    console.error('Error updating comment:', error.message);
    res.status(500).json({ error: 'Failed to update comment', details: error.message });
  }
});

/**
 * DELETE /api/comments/:id
 * Delete a comment by its MongoDB _id
 */
router.delete('/api/comments/:id', async (req, res) => {
  try {
    const commentId = req.params.id;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: '✅ Comment deleted', comment: deletedComment });
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    res.status(500).json({ error: 'Failed to delete comment', details: error.message });
  }
});

module.exports = router;
