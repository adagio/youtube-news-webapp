import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/Auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { fetchVideos } from '../../services/api';
import VideoGrid from '../../components/VideoGrid/VideoGrid';

const NewsForMe = () => {
  const { user, signOut } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async (loadMore = false) => {
    try {
      setLoading(true);
      const skip = loadMore ? videos.length : 0;
      const data = await fetchVideos(skip, LIMIT);
      setVideos(loadMore ? [...videos, ...data] : data);
      setHasMore(data.length === LIMIT);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    loadVideos(true);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <span>{user.email}</span>
        <button onClick={signOut}>Logout</button>
      </header>
      <main>
        <h1 className="text-2xl font-bold p-4">News For Me</h1>
        <VideoGrid 
          videos={videos} 
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </main>
    </div>
  );
};

export default NewsForMe;
