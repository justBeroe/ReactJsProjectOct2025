import React, { useState } from "react";
import { useComments, type Comment } from "../../../core/services/useComments";
import "./comment-box.css";

interface CommentBoxProps {
  artistId: number;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ artistId }) => {
  // Get current user from localStorage (like Angular version)
  const userData = localStorage.getItem("currentUser");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user?.id;

  const { comments, loading, error, addComment, updateComment, deleteComment } =
    useComments(artistId, userId);

  const [commentText, setCommentText] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrUpdate = async () => {
    const text = commentText.trim();
    if (!text || !userId) return;

    if (editingIndex !== null) {
      const comment = comments[editingIndex];
      if (comment._id) {
        await updateComment(comment._id, text);
      }
      setEditingIndex(null);
    } else {
      const newComment: Comment = {
        text,
        created_at: new Date().toISOString(),
        userId,
        artistId,
      };
      await addComment(newComment);
    }
    setCommentText("");
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setCommentText(comments[index].text);
  };

  const handleDelete = async (index: number) => {
    const comment = comments[index];
    if (comment._id) {
      await deleteComment(comment._id);
    }
    if (editingIndex === index) {
      setEditingIndex(null);
      setCommentText("");
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="comment-box">
      <div className="comment-input">
        <input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Enter comment"
        />
        <button onClick={handleAddOrUpdate}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="comment-list">
        {comments.map((comment, idx) => (
          <div className="comment-item" key={comment._id || idx}>
            <div className="comment-text">{comment.text}</div>
            <div className="comment-date">
              <small>Added: {new Date(comment.created_at).toLocaleString()}</small>
            </div>
            <div className="comment-actions">
              <button onClick={() => handleEdit(idx)}>Edit</button>
              <button onClick={() => handleDelete(idx)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
