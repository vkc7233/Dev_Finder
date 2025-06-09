import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 text-center bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Connect with Developers. <br /> Build Amazing Projects Together.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            DevTinder helps you find passionate devs to collaborate, innovate, and launch something extraordinary.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/register"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium"
            >
              Join as Developer
            </Link>
            <Link
              to="/explore"
              className="px-6 py-3 border border-indigo-500 hover:bg-indigo-600 hover:text-white rounded-full text-lg font-medium"
            >
              Find Developers
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Platform Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xl font-semibold">
            <div>
              <h3 className="text-indigo-400 text-4xl mb-2">1,200+</h3>
              <p>Active Developers</p>
            </div>
            <div>
              <h3 className="text-indigo-400 text-4xl mb-2">350+</h3>
              <p>Projects Completed</p>
            </div>
            <div>
              <h3 className="text-indigo-400 text-4xl mb-2">95%</h3>
              <p>Success Rate</p>
            </div>
            <div>
              <h3 className="text-indigo-400 text-4xl mb-2">34</h3>
              <p>Live Connections</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
