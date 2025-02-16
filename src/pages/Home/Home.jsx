import React, { useState } from 'react';
import { useAuth } from '../../components/Auth/AuthContext';

const Home = () => {
  const { signInWithOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Add this line

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithOtp(email);
      setMessage('Check your email for the login link');
    } catch (error) {
      setMessage('Failed to send login link');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to YouTube News</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Login with Email
      </button>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Send Login Link</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
