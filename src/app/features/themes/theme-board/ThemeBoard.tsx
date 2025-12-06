import React, { useEffect, useState } from 'react';
import { ThemeItem } from '../theme-item/ThemeItem';
import type { Song } from '../../../models/song.model';
import { useSongs } from '../../../core/services/useSongs'; // ✅ service hook
import './theme-board.css';

interface ThemeBoardProps {
  artistId?: number; // optional
}

export const ThemeBoard: React.FC<ThemeBoardProps> = ({ artistId }) => {
  const { songs: initialSongs, loading } = useSongs(artistId);
  const [songs, setSongs] = useState<Song[]>(initialSongs);   // ✅ FIXED: local state to allow updates
  const [error, setError] = useState<string | null>(null);

  // ✅ FIXED: sync local state when hook data changes
  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  const handleSongUpdated = (updatedSong: Song) => {
    // Replace updated song in local state
    const updated = songs.map(s => (s._id === updatedSong._id ? updatedSong : s));
    setSongs(updated);   // ✅ FIXED: actually use `updated` instead of leaving unused
    console.log('Song updated in ThemeBoard:', updatedSong);
  };

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="theme-title">
      <div className="radio-board">
        {songs.map(song => (
          <ThemeItem
            key={song._id}
            song={song}
            variant="compact"
            onSongUpdated={handleSongUpdated}
          />
        ))}
      </div>
    </div>
  );
};
