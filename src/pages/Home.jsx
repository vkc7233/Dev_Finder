import React, { useState, useEffect } from "react";

// Reusable stats data
const stats = [
  { value: "1,200+", label: "Active Developers" },
  { value: "350+", label: "Projects Completed" },
  { value: "95%", label: "Success Rate" },
  { value: "34", label: "Live Connections" },
];

const recentMatches = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "AWS"],
    avatar: "👩‍💻",
    matchType: "Collaboration",
    online: true,
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    role: "Senior Backend Engineer",
    skills: ["Python", "Docker", "Kubernetes"],
    avatar: "👨‍💻",
    matchType: "Mentorship",
    online: false,
  },
  {
    id: 3,
    name: "Maria Kim",
    role: "UI/UX Developer",
    skills: ["Figma", "React", "TypeScript"],
    avatar: "🎨",
    matchType: "Job Opportunity",
    online: true,
  },
];

const activeChats = [
  {
    name: "Sarah",
    message: "Hey! Love your portfolio project",
    time: "2m",
    unread: true,
  },
  {
    name: "Alex",
    message: "Thanks for the mentorship session!",
    time: "1h",
    unread: false,
  },
  {
    name: "Dev Crew",
    message: "John: When's our next standup?",
    time: "3h",
    unread: true,
  },
  {
    name: "Maria",
    message: "Interested in your React position",
    time: "1d",
    unread: false,
  },
];

const projectShowcase = [
  {
    id: 1,
    title: "AI Code Reviewer",
    author: "You",
    tech: ["Python", "OpenAI", "FastAPI"],
    likes: 24,
    views: 156,
    type: "Open Source",
    status: "Looking for Contributors",
  },
  {
    id: 2,
    title: "Real-time Chat App",
    author: "DevTeam",
    tech: ["Socket.io", "React", "Express"],
    likes: 18,
    views: 89,
    type: "Collaboration",
    status: "In Progress",
  },
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    setIsVisible(true);

    // Animate stats numbers
    const timer = setTimeout(() => {
      stats.forEach((stat, index) => {
        const numValue = parseInt(stat.value.replace(/[^0-9]/g, ""));
        let current = 0;
        const increment = numValue / 60;

        const counter = setInterval(() => {
          current += increment;
          if (current >= numValue) {
            current = numValue;
            clearInterval(counter);
          }

          setAnimatedStats((prev) => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, 30);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatStatValue = (originalValue, animatedValue) => {
    if (originalValue.includes("+")) {
      return `${animatedValue}+`;
    } else if (originalValue.includes("%")) {
      return `${animatedValue}%`;
    }
    return animatedValue.toString();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -right-32 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-0 px-6 py-20 md:py-32 text-center min-h-screen flex items-center justify-center">
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm"></div>

        <div
          className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Main heading with gradient text */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Connect with Developers.
              </span>
              <br />
              <span className="text-white">Build Wild Projects</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Together.
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-purple-600 font-bold text-4xl animate-pulse ">
              Stop Scrolling!
            </span>{" "}
            It's time to squad up. Match with devs who code hard, vibe harder,
            and don't ghost on deadlines. Mentors, teammates, or your next
            startup cofounder — all in one click.
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className="flex justify-center gap-6 flex-wrap mb-16">
            <button
              onClick={() => (window.location.href = "/swipe")}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 focus:ring-4 focus:ring-pink-400/50 transition-all duration-300 rounded-full text-lg font-semibold shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              aria-label="Start Swiping"
            >
              <span className="relative z-10">💖 Compile Connections</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => (window.location.href = "/messages")}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 focus:ring-4 focus:ring-white/20 transition-all duration-300 rounded-full text-lg font-semibold shadow-xl transform hover:scale-105 hover:-translate-y-1"
              aria-label="Open Messages"
            >
              <span className="relative z-10">💬 Reveal Your Inbox</span>
            </button>
          </div>

          {/* Floating elements animation */}
          <div className="absolute top-20 left-10 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-bounce animation-delay-1000"></div>
          <div className="absolute top-40 right-16 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-bounce animation-delay-2000"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-indigo-400 rounded-full opacity-50 animate-bounce animation-delay-3000"></div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section with glassmorphism */}
      <section className="relative py-20 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Vibes are on Point ✨
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join a thriving community of developers creating the next
              generation of digital experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label }, index) => (
              <div
                key={label}
                className="group relative p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

                <div className="relative z-10">
                  <h3 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {formatStatValue(value, animatedStats[index])}
                  </h3>
                  <p className="text-gray-300 text-lg font-medium">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Matches Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                💖 Catch of the Day
              </h2>
              <p className="text-gray-400 text-lg">
                Looks like you found some gems in the dev pool✨
              </p>
            </div>
            <a
              href="/matches"
              className="hidden md:inline-flex items-center px-6 py-3 bg-pink-500/20 backdrop-blur-md border border-pink-500/30 hover:bg-pink-500/30 hover:border-pink-400/50 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 text-pink-300"
            >
              View All Matches →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentMatches.map((match, index) => (
              <div
                key={match.id}
                className="group relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-pink-500/30 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
              >
                {/* Online status */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`flex items-center space-x-1 ${
                      match.online ? "text-green-400" : "text-gray-500"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        match.online
                          ? "bg-green-400 animate-pulse"
                          : "bg-gray-500"
                      }`}
                    ></div>
                    <span className="text-xs">
                      {match.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {match.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-white group-hover:text-pink-300 transition-colors duration-300">
                      {match.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{match.role}</p>
                  </div>
                </div>

                {/* Match type badge */}
                <div className="mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      match.matchType === "Collaboration"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : match.matchType === "Mentorship"
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                    }`}
                  >
                    {match.matchType}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {match.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 opacity-0 group-hover:opacity-100 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm font-medium transition-all duration-300">
                    💬 Chat
                  </button>
                  <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-all duration-300">
                    👁️ Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Chats & Project Showcase Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Active Chats */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  💬 Active Chats
                </h2>
                <a
                  href="/chat"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Slide into DMs✨ →
                </a>
              </div>
              <div className="space-y-4">
                {activeChats.map((chat, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center font-semibold">
                            {chat.name.charAt(0)}
                          </div>
                          {chat.unread && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {chat.name}
                          </p>
                          <p
                            className={`text-sm ${
                              chat.unread
                                ? "text-white font-medium"
                                : "text-gray-400"
                            }`}
                          >
                            {chat.message}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Showcase */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  🚀 Project That Slay
                </h2>
                <a
                  href="/projects"
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  Manage Projects →
                </a>
              </div>
              <div className="space-y-6">
                {projectShowcase.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          by {project.author}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.status.includes("Looking")
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>❤️ {project.likes}</span>
                        <span>👁️ {project.views}</span>
                      </div>
                      <span className="text-purple-400 font-medium">
                        {project.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Be That Developer? 💯
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              It's giving main character energy - choose your next move bestie!
              ✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors duration-300">
                Start Something Iconic
              </h3>
              <p className="text-gray-300">
                Drop that fire project idea and watch the squad assemble 🔥
              </p>
            </button>

            <button className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                👥
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-green-300 transition-colors duration-300">
                Find Your Tribe
              </h3>
              <p className="text-gray-300">
                Discover developers who match your vibe and energy ✨
              </p>
            </button>

            <button className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                Glow Up Time
              </h3>
              <p className="text-gray-300">
                Level up your profile and watch the opportunities pull up 💅
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

/* import React from "react";
import { Link } from "react-router-dom";

// Reusable stats data
const stats = [
  { value: "1,200+", label: "Active Developers" },
  { value: "350+", label: "Projects Completed" },
  { value: "95%", label: "Success Rate" },
  { value: "34", label: "Live Connections" },
];

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <section className="px-6 py-20 md:py-32 text-center bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Connect with Developers. <br /> Build Amazing Projects Together.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            DevTinder helps you find passionate devs to collaborate, innovate,
            and launch something extraordinary.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              to="/register"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition rounded-full text-lg font-medium"
              aria-label="Join as Developer"
            >
              Join as Developer
            </Link>
            <Link
              to="/explore"
              className="px-6 py-3 border border-indigo-500 hover:bg-indigo-600 hover:text-white focus:ring-4 focus:ring-indigo-400 transition rounded-full text-lg font-medium"
              aria-label="Find Developers"
            >
              Find Developers
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Platform Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xl font-semibold">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <h3 className="text-indigo-400 text-4xl mb-2">{value}</h3>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
 */
