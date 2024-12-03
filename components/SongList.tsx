'use client';

import { useState } from 'react';
import { Song } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Music2, Wind, Moon, Waves } from 'lucide-react';

interface SongListProps {
  songs: Song[];
  onSelect: (song: Song) => void;
  currentSong?: Song | null;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'classical':
      return <Music2 className="h-4 w-4" />;
    case 'nature':
      return <Wind className="h-4 w-4" />;
    case 'lullaby':
      return <Moon className="h-4 w-4" />;
    case 'white-noise':
      return <Waves className="h-4 w-4" />;
    default:
      return null;
  }
};

export function SongList({ songs, onSelect, currentSong }: SongListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Song['category'] | 'all'>('all');

  const categories = ['all', ...new Set(songs.map(song => song.category))];
  
  const filteredSongs = selectedCategory === 'all'
    ? songs
    : songs.filter(song => song.category === selectedCategory);

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "whitespace-nowrap text-white border border-white/20",
              selectedCategory === category ? "bg-white/20" : "hover:bg-white/10"
            )}
          >
            {category !== 'all' && (
              <span className="mr-2">
                <CategoryIcon category={category} />
              </span>
            )}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredSongs.map((song) => (
          <button
            key={song.id}
            onClick={() => onSelect(song)}
            className={cn(
              "w-full p-4 rounded-xl transition-all duration-300",
              "hover:bg-white/15",
              "flex items-center justify-between",
              currentSong?.id === song.id
                ? "glass-morphism text-white"
                : "bg-white/5 text-white/90"
            )}
          >
            <div className="flex items-center space-x-4">
              <CategoryIcon category={song.category} />
              <div className="text-left">
                <p className="font-light">{song.title}</p>
                <p className="text-sm text-white/60">{song.artist}</p>
              </div>
            </div>
            <span className="text-sm text-white/60">{song.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}