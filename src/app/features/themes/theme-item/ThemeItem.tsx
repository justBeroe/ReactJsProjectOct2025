import React, { useState } from 'react';
import type { Song } from '../../../models/song.model';
import { updateSong, deleteSong, getSongsWithIDMongoDB } from '../../../core/services/useSongs'; // ✅ service helpers
import './theme-item.css';

interface ThemeItemProps {
  song: Song;
  variant?: 'compact' | 'full';
  onSongUpdated?: (song: Song) => void;
  onSongDeleted?: (songId: number) => void;   // ✅ FIXED: new prop
}

export const ThemeItem: React.FC<ThemeItemProps> = ({ song, variant = 'full', onSongUpdated, onSongDeleted }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [artistName, setArtistName] = useState(song.artist.name);
  const [albumTitle, setAlbumTitle] = useState(song.album.title);

  const handleSave = async () => {
    try {
      const updatedData = {
        artist: { ...song.artist, name: artistName },
        album: { ...song.album, title: albumTitle },
      };

    //   const updatedSong = await updateSong(song._id, updatedData);
          // 🔧 FIXED: unwrap .data from AxiosResponse
      const updatedSong = await updateSong(song._id, updatedData);   // ✅ returns AxiosResponse
    //   const updatedSong: Song = response.data;                    // ✅ FIXED LINE

     // ✅ FIXED: immediately re-fetch fresh song from MongoDB
      const freshSongs = await getSongsWithIDMongoDB(song.artist.id);
      const freshSong = freshSongs.find(s => s._id === song._id);
      
      setIsEditMode(false);


        if (freshSong) {
        onSongUpdated?.(freshSong); // ✅ FIXED: pass fresh DB record to parent
      }

    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await deleteSong(song._id);
        alert('Song deleted successfully!');
        onSongDeleted?.(song._id);   // ✅ FIXED: notify parent to update DOM
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  return (
    <div className="theme-container">
      {!isEditMode ? (
        <div className="theme-name-wrapper">
          <div className="theme-name">
            <h2>{song.title}</h2>
            <div className="columns">
              <div className={variant}>
                <p>Artist name: <time>{song.artist.name}</time></p>
                <p>Album title: <span>{song.album.title}</span></p>
                <div className="audio-preview">
                  <p>Preview:</p>
                  {song.preview && <audio controls src={song.preview} />}
                  <p>Album cover:</p>
                  <a href={song.album.cover} target="_blank" rel="noopener noreferrer">
                    <img src={song.album.cover} alt="Album Cover" style={{ maxWidth: '100px' }} />
                  </a>
                </div>
              </div>
            </div>
            <div className="subscribers">
              <p>Artist ID: <span>{song.artist.id}</span></p>
              <button onClick={() => setIsEditMode(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <label>Artist Name:</label>
          <input value={artistName} onChange={e => setArtistName(e.target.value)} />
          <label>Album Title:</label>
          <input value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} />
          <button type="button" onClick={() => setIsEditMode(false)}>Cancel</button>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};
