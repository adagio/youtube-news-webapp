import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../components/Auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { fetchVideos, preloadVideos } from '../../services/api';
import VideoGrid from '../../components/VideoGrid/VideoGrid';
import { Video } from '../../types/video';

const NewsForMe = () => {
  const { user, signOut } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;
  const isInitialLoadComplete = useRef(false);

  const loadVideos = async (loadMore = false) => {
    if (loading) return;

    try {
      setLoading(true);
      const skip = loadMore ? videos.length : 0;
      const { videos: newVideos, total: totalCount } = await fetchVideos(skip, LIMIT);

      setVideos(prev => loadMore ? [...prev, ...newVideos] : newVideos);
      setTotal(totalCount);
      setHasMore(skip + newVideos.length < totalCount);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Updated handlePreloadNews to use a reload after preloading
  const handlePreloadNews = async () => {
    try {
      setLoading(true);
      await preloadVideos();
      window.location.reload();
    } catch (error) {
      console.error('Error preloading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialLoadComplete.current) return; // Prevent duplicate initial fetch
    const initialFetch = async () => {
      await loadVideos(false);
      isInitialLoadComplete.current = true;
    };

    initialFetch();
  }, []);

  const handleLoadMore = () => {
    if (isInitialLoadComplete.current) {
      loadVideos(true);
    }
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
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">News For Me</h1>
          <button 
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handlePreloadNews}
          >
            Preload News
          </button>
        </div>
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