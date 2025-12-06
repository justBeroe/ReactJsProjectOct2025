import  { useState } from 'react'; // ✅ FIXED: added useState for preview toggle
import React from 'react';
import type { Song2 } from '../../../models/song2.model';
import './theme-item.css';

interface ThemeItem2Props {
  song2: Song2;
  variant?: 'compact' | 'full';
}

export const ThemeItem2: React.FC<ThemeItem2Props> = ({ song2, variant = 'full' }) => {
  const [showPreview, setShowPreview] = useState(false); // ✅ FIXED: local state to toggle audio
  return (
    <div className="theme-container">
      <div className="theme-name-wrapper">
        <div className="theme-name">
          <h2>{song2.title}</h2>
          <div className="columns">
            <div className={variant}>
              <p>Artist name: <time>{song2.artist.name}</time></p>
              <div className="nick-name">
                <p>Album title: <span>{song2.album}</span></p>
              </div>
              <div className="audio-preview">
                <p>Preview:</p>
                {song2.preview && (
                  <audio controls src={song2.preview}>
                    Your browser does not support the audio element.
                  </audio>
                )}
                <p>Album cover:</p>
                <a href={song2.artist.name} target="_blank" rel="noopener noreferrer">
                  <img
                    src={song2.artist.picture}
                    alt="Album Cover"
                    style={{ maxWidth: '100px', height: 'auto' }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="subscribers">
            <p>Artist ID: <span>{song2.artist.id}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
