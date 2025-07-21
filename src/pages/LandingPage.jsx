import React from "react";
import { FaUserFriends, FaLaptopCode, FaRocket, FaGlobe } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <section id="hero" className="px-6 py-20 text-center bg-gradient-to-b from-gray-900 to-gray-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Swipe Right on Your Next Developer Connection</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Connect with developers worldwide for collaboration, mentorship, and career opportunities.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <Link to="/home" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-semibold">
          Join DevTinder Free
         </Link>

          <a href="#how-it-works" className="border border-pink-600 text-pink-400 hover:text-white hover:border-white px-6 py-3 rounded-md">
            See How It Works
          </a>
        </div>
        <p className="text-sm text-gray-400">Join 10,000+ developers already connected</p>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-8 text-center bg-gray-800">
        {[
          ["🤝", "Find Your Perfect Dev Partner", "Match with developers for projects and collaboration"],
          ["\uD83D\uDC68\u200D\uD83D\uDCBC", "Get Mentored by Experts", "Connect with senior developers for guidance and growth"],
          ["\uD83D\uDCBC", "Discover Job Opportunities", "Showcase your projects and get discovered by recruiters"]
        ].map(([emoji, title, desc]) => (
          <div key={title}>
            <div className="text-3xl mb-4">{emoji}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 text-center bg-gray-900">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {[
            ["\uD83D\uDCF1", "Create Your Profile", "Add your skills, showcase projects, and set preferences"],
            ["\uD83D\uDC40", "Discover & Swipe", "Browse profiles, swipe, and match with developers"],
            ["\uD83D\uDCAC", "Connect & Collaborate", "Chat in real time, share code, and build together"]
          ].map(([emoji, title, desc]) => (
            <div key={title} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{emoji}</div>
              <h4 className="text-xl font-bold mb-2">{title}</h4>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Sections Omitted for Brevity - See Previous Message */}

      {/* Call to Action */}
      <section id="Call_to_action" className="py-20 px-6 text-center bg-pink-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Connect with Amazing Developers?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Link to="/signup/github" className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-md">
            Join with GitHub
          </Link>
          <Link to="/signup/email" className="border border-white px-6 py-3 rounded-md">
            Sign up with Email
          </Link>
          <Link to="/signup/google" className="border border-white px-6 py-3 rounded-md">
            Continue with Google
          </Link>
          <Link to="/signup/linkedin" className="border border-white px-6 py-3 rounded-md">
            Connect via LinkedIn
          </Link>
        </div>
        <p className="mt-4 text-sm">Free to join • No credit card required • Connect in minutes</p>
      </section>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="text-3xl mb-4 mx-auto text-pink-500">{icon}</div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-400">{desc}</p>
  </div>
);

export default LandingPage;
