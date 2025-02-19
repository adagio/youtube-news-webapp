import { Video } from '../types/video.js';

export const fetchVideos = async (skip = 0, limit = 10) => {
  console.log(`fetchVideos called with skip=${skip}, limit=${limit}`);
  
  const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  if (!VITE_BACKEND_BASE_URL) {
    throw new Error('VITE_BACKEND_BASE_URL is not defined');
  }

  const response = await fetch(`${VITE_BACKEND_BASE_URL}/videos/?skip=${skip}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    videos: data.items || [],
    total: data.total
  };
};

export const preloadVideos = async () => {
  console.log(`preloadVideos called with /preloader/videos`);
  
  const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  if (!VITE_BACKEND_BASE_URL) {
    throw new Error('VITE_BACKEND_BASE_URL is not defined');
  }

  const response = await fetch(`${VITE_BACKEND_BASE_URL}/preloader/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ limit: 10 }) // adjust payload as needed
  });
  if (!response.ok) {
    throw new Error('Failed to preload videos');
  }
  return response.json();
};
