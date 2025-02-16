const mockChannels = [
  {
    name: "Tech News Daily",
    channel_id: "tech-123",
    id: 0,
    created_at: "2025-02-16T06:52:50.000Z",
    videos: [{}, {}, {}]
  },
  {
    name: "World News",
    channel_id: "world-456",
    id: 1,
    created_at: "2025-02-17T06:52:50.000Z",
    videos: [{}, {}]
  },
  {
    name: "Sports Highlights",
    channel_id: "sports-789",
    id: 2,
    created_at: "2025-02-18T06:52:50.000Z",
    videos: [{}]
  }
];

export const fetchChannels = () => {
  return new Promise((resolve) => 
    setTimeout(() => resolve(mockChannels), 800)
  );
};

export const fetchVideos = async (skip = 0, limit = 10) => {
  const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const response = await fetch(`${VITE_BACKEND_BASE_URL}/videos/?skip=${skip}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
};
