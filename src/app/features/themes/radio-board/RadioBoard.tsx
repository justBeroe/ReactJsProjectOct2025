import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioItem, type RadioStation } from '../radio-item/RadioItem';
import './radio-board.css';

export const RadioBoard: React.FC = () => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<RadioStation[]>('http://localhost:4000/api/top-radio-stations')
      .then(response => {
        setStations(response.data);
      })
      .catch(err => {
        console.error('Error fetching radio stations', err);
        setError('Failed to load radio stations');
      });
  }, []);

  return (
    <div className="theme-title">
      <div className="radio-board">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {stations.map((station, index) => (
          // ✅ FIX: Added `index` to the key to guarantee uniqueness
          // Previously: key={station.stationuuid || station.name}
          // Problem: Some stations had the same name (e.g. "France Inter"), causing duplicate keys
          <RadioItem
            key={`${station.stationuuid || station.name}-${index}`}
            station={station}
          />
        ))}
      </div>
    </div>
  );
};
