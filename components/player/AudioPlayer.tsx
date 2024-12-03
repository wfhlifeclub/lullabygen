'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Song } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  song: Song;
}

export function AudioPlayer({ song }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Reset state when song changes
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(null);
  }, [song]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          setError('Unable to play audio. Please try again.');
          console.error('Playback failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-morphism w-full h-full flex items-center justify-center p-8 rounded-3xl">
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onError={(e) => {
          setError('Unable to load audio file.');
          console.error('Audio loading error:', e);
        }}
      />
      
      <div className="w-full max-w-sm flex flex-col space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <h3 className="text-2xl font-light text-white">{song.title}</h3>
          <p className="text-sm text-white/70">{song.artist}</p>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-20 w-20 rounded-full bg-white/20 hover:bg-white/30 mx-auto"
        >
          {isPlaying ? 
            <Pause className="h-10 w-10 text-white" /> : 
            <Play className="h-10 w-10 text-white ml-1" />
          }
        </Button>

        <div className="space-y-2 w-full">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={(value) => {
              if (audioRef.current) {
                audioRef.current.currentTime = value[0];
              }
            }}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8 rounded-full hover:bg-white/10"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-white" />
            ) : (
              <Volume2 className="h-4 w-4 text-white" />
            )}
          </Button>
          <Slider
            value={[volume * 100]}
            max={100}
            onValueChange={(value) => setVolume(value[0] / 100)}
            className="w-28"
          />
        </div>
      </div>
    </div>
  );
}