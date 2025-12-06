import React, { useEffect, useState } from "react";
import { ThemeItem } from "../theme-item/ThemeItem";
import type { Song } from "../../../models/song.model";
import { useSongs } from "../../../core/services/useSongs"; // ✅ service hook
import "./theme-board.css";
import { useParams } from 'react-router-dom';

// interface ThemeBoardProps {
//   artistId?: number; // optional
// }

export const ThemeBoard: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();   // ✅ FIXED: read param
  const numericId = artistId ? Number(artistId) : undefined; // ✅ FIXED: convert to number
  
    const { songs: initialSongs, loading } = useSongs(numericId);
  const [songs, setSongs] = useState<Song[]>(initialSongs); // ✅ FIXED: local state to allow updates
  const [error, setError] = useState<string | null>(null);

  // ✅ FIXED: sync local state when hook data changes
  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  const handleSongUpdated = (updatedSong: Song) => {
    // Replace updated song in local state
    const updated = songs.map((s) =>
      s._id === updatedSong._id ? updatedSong : s
    );

    setSongs(updated); // ✅ FIXED: actually use `updated` instead of leaving unused
    console.log("Song updated in ThemeBoard:", updatedSong);
  };

  const handleSongDeleted = (songId: number) => {
    // ✅ FIXED: remove deleted song from local state
    setSongs((prev) => prev.filter((s) => s._id !== songId));
    console.log("Song deleted in ThemeBoard:", songId);
  };

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="theme-title">
      <div className="radio-board">
        {songs.map((song) => (
          <ThemeItem
            key={song._id}
            song={song}
            variant="compact"
            onSongUpdated={handleSongUpdated}
            onSongDeleted={handleSongDeleted}   // ✅ FIXED: pass callback
          />
        ))}
      </div>
    </div>
  );
};
