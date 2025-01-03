import * as tf from '@tensorflow/tfjs';

export class AudioProcessor {
  private audioContext: AudioContext;
  private analyzer: AnalyserNode;
  private model: tf.LayersModel | null = null;
  private stream: MediaStream | null = null;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = 2048;
    this.stream = null;
  }

  async initialize(): Promise<void> {
    await tf.ready();
    try {
      // Load a pre-trained model for vocal isolation
      // You'll need to provide your own model or use a public one
      this.model = await tf.loadLayersModel('/models/model.json');
    } catch (error) {
      console.error('Model loading error:', error);
      throw new Error('Failed to initialize audio processor');
    }
  }

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      const source = this.audioContext.createMediaStreamSource(this.stream);
      source.connect(this.analyzer);
    } catch (error) {
      console.error('Recording error:', error);
      throw new Error('Failed to start recording');
    }
  }

  async processAudioChunk(): Promise<Float32Array> {
    const bufferLength = this.analyzer.frequencyBinCount;
    const audioData = new Float32Array(bufferLength);
    this.analyzer.getFloatTimeDomainData(audioData);
    
    // Convert audio data to tensor
    const tensor = tf.tensor(audioData);
    const processedTensor = this.model!.predict(tensor.expandDims(0)) as tf.Tensor;
    const processedData = await processedTensor.data() as Float32Array;
    
    // Cleanup
    tensor.dispose();
    processedTensor.dispose();
    
    return processedData;
  }

  stopRecording(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  dispose(): void {
    this.stopRecording();
    if (this.model) {
      this.model.dispose();
    }
  }
}

