import { useState, useEffect } from "react";
import axios from "axios";

export interface Comment {
  _id?: string;
  text: string;
  created_at: string;
  userId?: string;
  artistId?: number;
}

const apiUrl = "http://localhost:4000/api/comments";

export const useComments = (artistId: number, userId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load comments
  useEffect(() => {
    if (!artistId || !userId) {
      setLoading(false);
      return;
    }

    axios
      .get<Comment[]>(`${apiUrl}?artistId=${artistId}&userId=${userId}`)
      .then(res => {
        setComments(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load comments");
        setLoading(false);
      });
  }, [artistId, userId]);

  // Create
  const addComment = async (comment: Comment) => {
    const res = await axios.post(apiUrl, comment);
    setComments(prev => [...prev, res.data.comment]);
  };

  // Update
  const updateComment = async (id: string, text: string) => {
    const res = await axios.put(`${apiUrl}/${id}`, { text });
    setComments(prev =>
      prev.map(c => (c._id === id ? res.data.comment : c))
    );
  };

  // Delete
  const deleteComment = async (id: string) => {
    await axios.delete(`${apiUrl}/${id}`);
    setComments(prev => prev.filter(c => c._id !== id));
  };

  return { comments, loading, error, addComment, updateComment, deleteComment };
};
