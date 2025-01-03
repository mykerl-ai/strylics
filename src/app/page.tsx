'use client';

import { useState } from 'react';
import { AudioRecorder } from '../components/AudioRecorder';
import { LyricsDisplay } from '../components/LyricsDisplay';
import type { LyricsSegment } from '../lib/types';

export default function Home() {
  const [lyrics, setLyrics] = useState<LyricsSegment[]>([]);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Live Lyrics Extractor
      </h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <AudioRecorder />
        <LyricsDisplay lyrics={lyrics} />
      </div>
    </main>
  );
}