import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ FIXED: React Router navigation
import { getSongsWithIDMongoDB } from '../../../core/services/useSongs'; // ✅ FIXED: service helper
import type { Song } from '../../../models/song.model';
import './new-theme.css';

export const NewTheme: React.FC = () => {
  const navigate = useNavigate();
  const [artistId, setArtistId] = useState<number>(27); // ✅ FIXED: default artistId
  const [songs, setSongs] = useState<Song[]>([]);       // ✅ FIXED: local state for fetched songs
  const [submitted, setSubmitted] = useState(false);

  // ✅ FIXED: load songs on mount
  useEffect(() => {
    loadSongs(artistId);
  }, [artistId]);

  const loadSongs = async (id: number) => {
    try {
      const fetchedSongs = await getSongsWithIDMongoDB(id);
      setSongs(fetchedSongs);
    } catch (err) {
      console.error('Error loading songs:', err);
    }
  };

  const onCancel = () => {
    navigate('/home'); // ✅ FIXED: cancel navigates home
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fetchedSongs = await getSongsWithIDMongoDB(artistId);
      setSongs(fetchedSongs);
      setSubmitted(true);
      navigate(`/songs/${artistId}`); // ✅ FIXED: redirect after fetching
    } catch (err) {
      console.error('Error loading songs:', err);
    }
  };

  return (
    <div className="new-theme-border">
      <div className="header-background">
        <span>Change songs by ID</span>
      </div>
      <form onSubmit={onSubmit}>
        <div className="new-theme-title">
          <label htmlFor="themeName">
            Change artist ID <span className="red">*</span>
          </label>
          <input
            type="number"
            name="themeName"
            id="themeName"
            value={artistId}
            onChange={e => setArtistId(Number(e.target.value))} // ✅ FIXED: bind to state
          />
        </div>
        <div className="new-theme-buttons">
          <button type="button" className="cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="public">
            Post
          </button>
        </div>
      </form>

      {/* ✅ FIXED: optional debug output */}
      {submitted && (
        <div>
          <h3>Fetched Songs for Artist {artistId}</h3>
          <ul>
            {songs.map(song => (
              <li key={song._id}>{song.title} — {song.artist.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
