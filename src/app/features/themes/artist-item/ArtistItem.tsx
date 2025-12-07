import React from "react";
import type { Artist } from "../../../models/artist.model";
import { CommentBox } from "../comment-box/CommentBox";
import { Link } from "react-router-dom";
import "./theme-item.css";

interface ThemeItemProps {
  artist: Artist;
  variant?: "compact" | "full";
}

export const ArtistItem: React.FC<ThemeItemProps> = ({ artist, variant = "full" }) => {
  return (
    <div className="theme-container">
      <div className="theme-name-wrapper">
        <div className="theme-name">
          <Link to="#" className="normal">
            <h2>{artist.name}</h2>
          </Link>
          <div className="columns">
            <div className={variant}>
              <p>
                <Link to={`/songs/${artist.id}`}>
                  Artist id: <time>{artist.id}</time>
                </Link>
              </p>
            </div>
            <CommentBox artistId={artist.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
