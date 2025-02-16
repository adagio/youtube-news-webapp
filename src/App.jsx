import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import { supabase } from './lib/supabase';
import Home from './pages/Home/Home';
import NewsForMe from './pages/NewsForMe/NewsForMe';

// Create a separate component for auth state handling
const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/news-for-me', { replace: true });
      }
    });

    return () => subscription?.unsubscribe();
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news-for-me" element={<NewsForMe />} />
          <Route 
            path="/auth/callback" 
            element={
              <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
              </div>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
