import React from 'react';
import { LyricsSegment } from '../lib/types';

interface Props {
  lyrics: LyricsSegment[];
}

export const LyricsDisplay: React.FC<Props> = ({ lyrics }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Lyrics</h2>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {lyrics.length === 0 ? (
          <p className="text-gray-500 italic">No lyrics detected yet...</p>
        ) : (
          lyrics.map((segment, index) => (
            <div 
              key={`${segment.timestamp}-${index}`}
              className="p-3 bg-gray-50 rounded-lg"
            >
              <p className="text-lg">{segment.text}</p>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{segment.timestamp}</span>
                <span>Confidence: {(segment.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};