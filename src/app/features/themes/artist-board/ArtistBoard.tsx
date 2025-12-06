import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSongs, deleteSong } from "../../../core/services/useSongs"; // ✅ useSongs + deleteSong
import type { Song } from "../../../models/song.model";
import { ThemeItem } from "../theme-item/ThemeItem"; // ✅ reuse ThemeItem for songs
import "./theme-board.css";

interface ArtistBoardProps {
  artistId?: number;
}

export const ArtistBoard: React.FC<ArtistBoardProps> = ({ artistId }) => {
  const backendUrl = "http://localhost:4000";

  // ✅ useSongs hook to fetch songs
  const { songs: initialSongs, loading } = useSongs(artistId);

  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ sync local state when hook data changes
  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  const fetchDeezerAll = async () => {
    try {
      const res = await axios.get<{ message: string; totalTracks: number }>(
        `${backendUrl}/api/fetch-deezer-all?start=1&end=100`
      );
      alert(`${res.data.message}\nTotal tracks: ${res.data.totalTracks}`);

      // ✅ FIXED: re-fetch songs from DB and update state
      const refreshed = await axios.get<Song[]>(`${backendUrl}/api/songs`);
      setSongs(refreshed.data); // <-- this triggers React re-render
    } catch (err) {
      console.error("Failed to fetch Deezer songs:", err);
      alert("❌ Failed to fetch Deezer songs");
    }
  };

  const deleteAllSongs = async () => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to delete all songs? This cannot be undone."
      )
    ) {
      return;
    }
    try {
      const res = await axios.delete<{ message: string; deletedCount: number }>(
        `${backendUrl}/api/delete-songs`
      );
      alert(`${res.data.message}\nDeleted count: ${res.data.deletedCount}`);

      // ✅ clear local state so browser updates immediately
      setSongs([]);
    } catch (err) {
      console.error("Failed to delete songs:", err);
      alert("❌ Failed to delete songs");
    }
  };

  const handleSongDeleted = async (songId: number) => {
    try {
      await deleteSong(songId); // ✅ call helper
      setSongs((prev) => prev.filter((s) => s._id !== songId)); // ✅ update local state
    } catch (err) {
      console.error("Failed to delete song:", err);
    }
  };

  // ✅ filter songs by search term
  const filteredSongs = songs.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading songs...</p>;

  return (
    <div>
      <div className="fetch-btn-container">
        <button onClick={fetchDeezerAll} className="fetch-btn">
          Fetch Deezer Songs
        </button>
        <button onClick={deleteAllSongs} className="delete-btn">
          Delete All Deezer Songs
        </button>

        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSearchTerm(searchTerm)}
          className="search-input"
        />
        <button
          onClick={() => setSearchTerm(searchTerm)}
          className="search-btn"
        >
          Search
        </button>
      </div>

      <h2>Deezer Songs</h2>
      <p>Filtered song count: {filteredSongs.length}</p>
      {filteredSongs.map((song) => (
        <ThemeItem
          key={song._id}
          song={song}
          variant="compact"
          onSongDeleted={handleSongDeleted} // ✅ pass delete callback
        />
      ))}
    </div>
  );
};
