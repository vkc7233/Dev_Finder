import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Feed = () => {
  const { user } = useAuth();
  const firstname = user?.user_metadata?.firstname || 'Dev';
  const avatar = Array.isArray(user?.photos) && user.photos.length > 0
    ? user.photos[0]
    : "https://api.dicebear.com/7.x/thumbs/svg?seed=developer";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <img
          src={avatar}
          alt="avatar"
          className="mx-auto w-28 h-28 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-4xl mt-4 font-extrabold">Welcome, {firstname} 👋</h1>
        <p className="mt-2 text-lg text-purple-300">Ready to connect with dev minds like yours?</p>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <Link to="/explore" className="bg-purple-700 p-4 rounded-xl shadow hover:scale-105 transition">
          <div className="text-3xl">🧭</div>
          <div className="mt-2">Explore</div>
        </Link>
        <Link to="/matches" className="bg-pink-600 p-4 rounded-xl shadow hover:scale-105 transition">
          <div className="text-3xl">❤️</div>
          <div className="mt-2">Matches</div>
        </Link>
        <Link to="/messages" className="bg-sky-600 p-4 rounded-xl shadow hover:scale-105 transition">
          <div className="text-3xl">💬</div>
          <div className="mt-2">Messages</div>
        </Link>
        <Link to="/profile" className="bg-emerald-600 p-4 rounded-xl shadow hover:scale-105 transition">
          <div className="text-3xl">👤</div>
          <div className="mt-2">My Profile</div>
        </Link>
      </div>

      {/* Daily Dev Match */}
      <div className="mt-12 bg-white/10 p-6 rounded-xl shadow text-center">
        <h2 className="text-2xl font-semibold mb-2">🔥 Your DevMatch of the Day</h2>
        <p className="text-lg text-purple-200">Sanya, React.js + Node.js enthusiast 💡</p>
        <Link to="/explore" className="btn btn-sm mt-4 bg-white text-purple-800 font-semibold">Say Hi 👋</Link>
      </div>
    </div>
  );
};

export default Feed;
