export interface LyricsSegment {
    text: string;
    timestamp: string;
    confidence: number;
    language?: string;
  }
  
  export interface AudioProcessingConfig {
    fftSize: number;
    minConfidence: number;
    language: string;
  }