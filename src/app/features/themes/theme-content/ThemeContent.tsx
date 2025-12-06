import React, { useState } from 'react';
import { useAuth } from '../../../core/services/AuthService'; // ✅ Auth context
import { createComment } from '../../../core/services/useComments'; // ✅ Comment service
import type { Comment } from '../../../models/comment';
import './theme-content.css';

export const ThemeContent: React.FC = () => {
  const { isLoggedIn, currentUser } = useAuth();

  const [themeTitle] = useState('Angular 18');
  const [themeDate] = useState('2024-10-10 12:08:28');
  const [subscribersCount, setSubscribersCount] = useState(456);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const toggleSubscribe = () => {
    setIsSubscribed(prev => !prev);
    setSubscribersCount(prev => prev + (isSubscribed ? -1 : 1));
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim().length < 10) {
      setCommentError(true);
      return;
    }
    setCommentError(false);
    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: currentUser?.username || 'Anonymous',
      date: new Date().toLocaleString(),
      likes: 0,
      liked: false,
      disliked: false,
    };
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    await createComment(comment); // ✅ persist to backend
  };

  const likeComment = (id: string) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked } : c
      )
    );
  };

  const dislikeComment = (id: string) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id ? { ...c, disliked: !c.disliked, liked: false } : c
      )
    );
  };

  return (
    <div className="theme-content">
      <div className="theme-title">
        <div className="theme-name-wrapper">
          <div className="theme-name">
            <h2>{themeTitle}</h2>
            <p>Date: <time>{themeDate}</time></p>
          </div>
          <div className="subscribers">
            <p>Subscribers: <span>{subscribersCount}</span></p>
            {isLoggedIn && (
              <button className={isSubscribed ? 'unsubscribe' : 'subscribe'} onClick={toggleSubscribe}>
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              </button>
            )}
          </div>
        </div>
      </div>

      {comments.map(c => (
        <div className="comment" key={c.id}>
          <header className="header">
            <p><span>{c.author}</span> posted on <time>{c.date}</time></p>
          </header>
          <div className="comment-main">
            <div className="userdetails">
              <img src="profile.png" alt="avatar" />
            </div>
            <div className="post-content">
              <p>{c.text}</p>
            </div>
          </div>
          <div className="footer">
            {isLoggedIn && (
              <>
                <i className={`fas fa-thumbs-up ${c.liked ? 'liked' : ''}`} onClick={() => likeComment(c.id)} />
                <i className={`fas fa-thumbs-down ${c.disliked ? 'disliked' : ''}`} onClick={() => dislikeComment(c.id)} />
              </>
            )}
            <p><span>{c.likes}</span