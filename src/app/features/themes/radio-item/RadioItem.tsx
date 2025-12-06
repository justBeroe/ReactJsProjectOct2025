import React from 'react';
import './radio-item.css';

export interface RadioStation {
  stationuuid?: string;
  name: string;
  url: string;
  country: string;
  favicon?: string;
}

interface RadioItemProps {
  station: RadioStation;
  variant?: 'compact' | 'full';
}

export const RadioItem: React.FC<RadioItemProps> = ({ station, variant = 'full' }) => {
  return (
    <div className="theme-container">
      <div className="theme-name-wrapper">
        <div className="theme-name">
          {/* Station header */}
          <a href={station.url} target="_blank" rel="noopener noreferrer" className="normal">
            <h2>{station.name}</h2>
          </a>

          <div className="columns">
            <div className={variant}>
              {/* Station info */}
              <p>
                Country: <time>{station.country}</time>
              </p>

              <div className="nick-name">
                <p>Favicon:</p>
                <p>
                  {station.favicon && (
                    <img
                      src={station.favicon}
                      alt={station.name}
                      style={{ maxWidth: '100px', height: 'auto' }}
                    />
                  )}
                </p>
              </div>

              {/* Audio preview */}
              <div className="audio-preview">
                <p>Listen:</p>
                {station.url && (
                  <audio controls src={station.url}>
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          </div>

          <div className="subscribers">
            {/* Optional extra info */}
            {/* <p>Station ID: <span>{station.stationuuid}</span></p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
