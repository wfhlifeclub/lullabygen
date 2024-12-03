import { Song } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchSongs(): Promise<Song[]> {
  try {
    const response = await fetch(`${API_URL}/songs`);
    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(error.message || 'Failed to fetch songs', response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch songs', 500);
  }
}

export async function fetchSongById(id: string): Promise<Song> {
  try {
    const response = await fetch(`${API_URL}/songs/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(error.message || 'Failed to fetch song', response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Failed to fetch song with id ${id}`, 500);
  }
}