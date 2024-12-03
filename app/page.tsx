'use client';

import { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';
import { SongList } from '@/components/SongList';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { categoryBackgrounds } from '@/lib/backgrounds';
import { fetchSongs } from '@/lib/api';
import type { Song } from '@/lib/types';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backgroundTransition, setBackgroundTransition] = useState(false);

  useEffect(() => {
    async function loadSongs() {
      try {
        const fetchedSongs = await fetchSongs();
        setSongs(fetchedSongs);
        setCurrentSong(fetchedSongs[0]);
      } catch (err) {
        setError('Failed to load songs. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadSongs();
  }, []);

  useEffect(() => {
    if (currentSong) {
      document.body.style.backgroundImage = `url('${categoryBackgrounds[currentSong.category].url}')`;
      setBackgroundTransition(true);
      const timer = setTimeout(() => setBackgroundTransition(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSong?.category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen bg-black/40 backdrop-blur-sm transition-all duration-1000 ${
      backgroundTransition ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-12">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <Moon className="h-10 w-10 text-white" />
              <h1 className="text-5xl font-light tracking-wide text-white">Lullaby</h1>
            </div>
            <p className="text-lg text-white/80 font-light">
              Find peace in gentle melodies
            </p>
          </div>

          <div className="w-full max-w-6xl grid gap-12 md:grid-cols-2">
            {currentSong && (
              <div className="flex flex-col items-center space-y-8">
                <div className="relative w-full aspect-square max-w-md rounded-3xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-b ${categoryBackgrounds[currentSong.category].gradient} animate-gradient`} />
                  <AudioPlayer song={currentSong} />
                </div>
              </div>
            )}
            
            <div className="space-y-8">
              <SongList
                songs={songs}
                onSelect={setCurrentSong}
                currentSong={currentSong}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}