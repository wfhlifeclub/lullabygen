import { Song } from '@/lib/types';

export const songs: Song[] = [
  {
    id: '1',
    title: 'Twinkle Twinkle Little Star',
    artist: 'Traditional',
    duration: '3:15',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-sweet-lullaby-2-2257.mp3',
    category: 'lullaby'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    duration: '5:00',
    audioUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-loop-1196.mp3',
    category: 'nature'
  },
  {
    id: '3',
    title: 'Brahms Lullaby',
    artist: 'Johannes Brahms',
    duration: '4:30',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    category: 'classical'
  },
  {
    id: '4',
    title: 'Soft Rain',
    artist: 'Nature Sounds',
    duration: '6:00',
    audioUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3',
    category: 'white-noise'
  }
];