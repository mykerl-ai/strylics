import { useState, useEffect, useCallback } from 'react';
import { AudioProcessor } from '../lib/audioProcessing';

export function useAudioProcessing() {
  const [processor, setProcessor] = useState<AudioProcessor | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initProcessor = async () => {
      try {
        const newProcessor = new AudioProcessor();
        await newProcessor.initialize();
        setProcessor(newProcessor);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize audio processor');
      }
    };

    initProcessor();

    return () => {
      if (processor) {
        processor.dispose();
      }
    };
  }, [processor]);

  const startProcessing = useCallback(async () => {
    if (!processor) return;

    try {
      setIsProcessing(true);
      await processor.startRecording();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start processing');
      setIsProcessing(false);
    }
  }, [processor]);

  const stopProcessing = useCallback(() => {
    if (!processor) return;
    
    processor.stopRecording();
    setIsProcessing(false);
  }, [processor]);

  return { isProcessing, error, startProcessing, stopProcessing };
}