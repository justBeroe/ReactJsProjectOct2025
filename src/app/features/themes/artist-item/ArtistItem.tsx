import React from 'react';
import type { Artist } from '../../../models/artist.model';
import { Link } from 'react-router-dom';
import { CommentBox } from '../comment-box/CommentBox'; // ✅ FIXED: import CommentBox 
import './theme-item.css';

interface ArtistItemProps {
  artist: Artist;
  variant?: 'compact' | 'full';
}

export const ArtistItem: React.FC<ArtistItemProps> = ({ artist, variant = 'full' }) => {
  return (
    <div className="theme-container">
      <div className="theme-name-wrapper">
        <div className="theme-name">
          <a href="#" className="normal">
            <h2>{artist.name}</h2>
          </a>
          <div className="columns">
            <div className={variant}>
              <p>
                <Link to={`/songs/${artist.id}`}>
                  Artist id: <time>{artist.id}</time>
                </Link>
              </p>
            </div>
            <CommentBox artistId={artist.id} /> {/* ✅ FIXED: pass artistId */}
          </div>
        </div>
      </div>
    </div>
  );
};
