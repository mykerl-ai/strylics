export class SpeechRecognizer {
    private recognition: any;
    private isRecording: boolean = false;
  
    constructor(language: string = 'en-US') {
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new (window as any).webkitSpeechRecognition();
        this.setupRecognition(language);
      } else {
        throw new Error('Speech recognition not supported in this browser');
      }
    }
  
    private setupRecognition(language: string): void {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = language;
    }
  
    start(onResult: (text: string, isFinal: boolean) => void): void {
      if (this.isRecording) return;
  
      this.recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        const text = result[0].transcript;
        onResult(text, result.isFinal);
      };
  
      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
  
      this.recognition.start();
      this.isRecording = true;
    }
  
    stop(): void {
      if (!this.isRecording) return;
      this.recognition.stop();
      this.isRecording = false;
    }
  }