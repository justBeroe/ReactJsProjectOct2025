import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Song2 } from '../../../models/song2.model';
import { ThemeItem2 } from '../song2-item/ThemeItem2';
import './theme-board.css';
import { useParams } from 'react-router-dom';

// interface ThemeBoard2Props {
//   artistId?: number;
// }

export const ThemeBoard2: React.FC = () => {
  
  const { artistId } = useParams<{ artistId: string }>();   // ✅ FIXED: read param
  const numericId = artistId ? Number(artistId) : undefined; // ✅ FIXED: convert to number
  
  const [songs, setSongs] = useState<Song2[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        if (artistId) {
          // ✅ First trigger Jamendo fetch, then load from MongoDB
          await axios.get(`http://localhost:4000/api/fetch-jamendo?artistId=${artistId}`);
          const res = await axios.get<Song2[]>(`http://localhost:4000/api/songs2?artistId=${artistId}`);
          if (!res.data || res.data.length === 0) {
            setError('No songs found');
          } else {
            setSongs(res.data);
          }
        }
      } catch (err) {
        console.error('Error fetching songs2', err);
        setError('Failed to load songs');
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [artistId]);

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="theme-title">
      {songs.map(song => (
        <ThemeItem2 key={song.id} song2={song} variant="compact" />
      ))}
    </div>
  );
};
