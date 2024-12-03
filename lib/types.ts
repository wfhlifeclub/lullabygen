export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  category: 'classical' | 'nature' | 'lullaby' | 'white-noise';
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}