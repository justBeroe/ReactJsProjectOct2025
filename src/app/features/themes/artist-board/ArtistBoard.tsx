import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArtistItem } from "../artist-item/ArtistItem";
import type { Artist } from "../../../models/artist.model";
import "./theme-board.css";

export const ArtistBoard: React.FC = () => {
  const [deezerArtists, setDeezerArtists] = useState<Artist[]>([]);
  const [jamendoArtists, setJamendoArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const backendUrl = "http://localhost:4000";

  useEffect(() => {
    axios.get<Artist[]>(`${backendUrl}/api/deezer-artists`).then(res => setDeezerArtists(res.data));
    axios.get<Artist[]>(`${backendUrl}/api/jamen-artists`).then(res => setJamendoArtists(res.data));
  }, []);

  const filteredDeezer = deezerArtists.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredJamendo = jamendoArtists.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchDeezerAll = async () => {
    try {
      const res = await axios.get<{ message: string; totalTracks: number }>(
        `${backendUrl}/api/fetch-deezer-all?start=1&end=100`
      );
      alert(`${res.data.message}\nTotal tracks: ${res.data.totalTracks}`);
      const refreshed = await axios.get<Artist[]>(`${backendUrl}/api/deezer-artists`);
      setDeezerArtists(refreshed.data);
    } catch (err) {
      alert("❌ Failed to fetch Deezer artists");
    }
  };

  const deleteAllSongs = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete all songs? This cannot be undone.")) {
      return;
    }
    try {
      const res = await axios.delete<{ message: string; deletedCount: number }>(
        `${backendUrl}/api/delete-songs`
      );
      alert(`${res.data.message}\nDeleted count: ${res.data.deletedCount}`);
      const refreshed = await axios.get<Artist[]>(`${backendUrl}/api/deezer-artists`);
      setDeezerArtists(refreshed.data);
    } catch (err) {
      alert("❌ Failed to delete songs");
    }
  };

  return (
    <div className="theme-board">
      <div className="fetch-btn-container">
        <button onClick={fetchDeezerAll} className="fetch-btn">Fetch Deezer Artists</button>
        <button onClick={deleteAllSongs} className="delete-btn">Delete All Deezer Songs</button>
        <input
          type="text"
          placeholder="Search artists..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === "Enter" && setSearchTerm(searchTerm)}
          className="search-input"
        />
        <button onClick={() => setSearchTerm(searchTerm)} className="search-btn">Search Deezer</button>
      </div>

      <h2>Deezer Artists</h2>
      <p>Filtered Deezer count: {filteredDeezer.length}</p>
      {filteredDeezer.map(artist => (
        <ArtistItem key={artist.id} artist={artist} variant="compact" />
      ))}

      <h2>Jamendo Artists</h2>
      {filteredJamendo.map(artist => (
        <ArtistItem key={artist.id} artist={artist} variant="compact" />
      ))}
    </div>
  );
};
