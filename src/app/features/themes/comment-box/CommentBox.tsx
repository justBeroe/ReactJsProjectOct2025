import React, { useEffect, useState } from 'react';
import './comment-box.css';

export interface Comment {
  _id?: string;        // MongoDB ObjectId
  text: string;
  created_at: string;
  userId?: string;
  artistId?: number;
}

interface CommentBoxProps {
  artistId: number;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ artistId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // ✅ Load user + comments on mount
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUserId(user.id);
      } catch {
        setCurrentUserId(null);
      }
    }

    if (!artistId || !currentUserId) return;

    const stored = localStorage.getItem(storageKey(currentUserId, artistId));
    setComments(stored ? JSON.parse(stored) : []);

    // TODO: Replace with API call
    // Example: CommentService.getByArtist(artistId, currentUserId)
  }, [artistId, currentUserId]);

  const storageKey = (userId: string, artistId: number) =>
    `comments_${userId}_${artistId}`;

  const saveToLocalStorage = (updated: Comment[]) => {
    if (!currentUserId) return;
    localStorage.setItem(storageKey(currentUserId, artistId), JSON.stringify(updated));
  };

  const addOrUpdateComment = () => {
    if (!commentText.trim() || !currentUserId) return;

    if (editingIndex !== null) {
      // ✅ Update existing comment
      const updated = [...comments];
      updated[editingIndex].text = commentText.trim();
      setComments(updated);
      saveToLocalStorage(updated);
      setEditingIndex(null);
    } else {
      // ✅ Create new comment
      const newComment: Comment = {
        text: commentText.trim(),
        created_at: new Date().toISOString(),
        userId: currentUserId,
        artistId,
      };
      const updated = [...comments, newComment];
      setComments(updated);
      saveToLocalStorage(updated);
    }

    setCommentText('');
  };

  const editComment = (index: number) => {
    setEditingIndex(index);
    setCommentText(comments[index].text);
  };

  const deleteComment = (index: number) => {
    const updated = comments.filter((_, i) => i !== index);
    setComments(updated);
    saveToLocalStorage(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setCommentText('');
    }
  };

  return (
    <div className="comment-box">
      <div className="comment-input">
        <input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Enter comment"
        />
        <button onClick={addOrUpdateComment}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="comment-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <div className="comment-text">{comment.text}</div>
            <div className="comment-date">
              <small>Added: {new Date(comment.created_at).toLocaleString()}</small>
            </div>
            <div className="comment-actions">
              <button onClick={() => editComment(index)}>Edit</button>
              <button onClick={() => deleteComment(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
