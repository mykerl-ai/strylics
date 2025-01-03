import React from 'react';
import { useAudioProcessing } from '../hooks/useAudioProcessing';

export const AudioRecorder: React.FC = () => {
  const { isProcessing, error, startProcessing, stopProcessing } = useAudioProcessing();

  const handleToggleRecording = () => {
    if (isProcessing) {
      stopProcessing();
    } else {
      startProcessing();
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleToggleRecording}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors
            ${isProcessing 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {isProcessing ? 'Stop Recording' : 'Start Recording'}
        </button>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};