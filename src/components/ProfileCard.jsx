import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Globe,
  MapPin,
  Code,
  Briefcase,
  Star,
  Heart,
  X,
  Coffee,
  Zap,
  Award,
  Calendar,
} from "lucide-react";

const ProfileCard = ({ profile, onSwipe }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded mb-4"></div>
            <div className="h-6 bg-slate-700 rounded mb-2"></div>
            <div className="h-6 bg-slate-700 rounded mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  const bgGradients = [
    "from-slate-900 via-slate-800 to-slate-700",
    "from-indigo-900 via-indigo-800 to-indigo-700",
    "from-zinc-800 via-gray-800 to-slate-900",
    "from-neutral-800 via-neutral-700 to-neutral-600",
    "from-blue-900 via-sky-800 to-blue-700",
    "from-purple-900 via-fuchsia-800 to-purple-700",
    "from-emerald-900 via-emerald-800 to-emerald-700",
  ];

  const getAccentColors = (color) => {
    const colors = {
      blue: {
        primary: "text-blue-400",
        bg: "bg-blue-500/20",
        border: "border-blue-500/30",
      },
      purple: {
        primary: "text-purple-400",
        bg: "bg-purple-500/20",
        border: "border-purple-500/30",
      },
      emerald: {
        primary: "text-emerald-400",
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/30",
      },
      cyan: {
        primary: "text-cyan-400",
        bg: "bg-cyan-500/20",
        border: "border-cyan-500/30",
      },
    };
    return colors[color] || colors.blue;
  };

  const accent = getAccentColors(profile.accentColor || "blue");

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSwipeDirection(direction);
    setTimeout(() => {
      onSwipe?.();
      setIsAnimating(false);
    }, 300);
  };

  const SkillTag = ({ skill, type }) => {
    const gradients = {
      skills: "from-slate-700 to-slate-600",
      learning: "from-amber-700 to-amber-600",
      interests: `from-${profile.accentColor || "blue"}-600 to-${
        profile.accentColor || "blue"
      }-700`,
    };

    return (
      <span
        className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${gradients[type]} mr-2 mb-2 shadow-sm`}
      >
        {skill}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-8">
      <div className="relative w-full max-w-sm">
        {/* Card Container */}
        <div
          className={`
          relative bg-gradient-to-br from-slate-900 to-black rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform border border-gray-600/50 backdrop-blur-xl
          ${
            isAnimating && swipeDirection === "left"
              ? "-translate-x-full -rotate-12 opacity-0"
              : ""
          }
          ${
            isAnimating && swipeDirection === "right"
              ? "translate-x-full rotate-12 opacity-0"
              : ""
          }
        `}
        >
          {/* Header */}
          <div
            className={`relative ${
              profile.bgGradient || bgGradients[0]
            } p-4 text-white`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="absolute top-0 right-0">
                <div
                  className={`w-3 h-3 rounded-full ${
                    profile.available
                      ? "bg-green-400 shadow-green-400/50"
                      : "bg-red-500"
                  } animate-pulse`}
                ></div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-28 h-28 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden`}
                >
                  <img
                    src={profile.image || "/default-avatar.png"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{profile.name}</h2>
                  <p className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2" />
                    {profile.dob || "Not specified"} &nbsp;&nbsp;{" "}
                    {profile.gender || "Not specified"}
                  </p>
                  <p className="flex items-center text-sm">
                    <Briefcase size={16} className="mr-2" />
                    {profile.jobTitle || "Not specified"}
                  </p>
                  <p className="text-sm flex items-center text-white/70 mt-1">
                    <MapPin size={14} className="mr-2" />
                    {profile.location || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-white/80">
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                  <Award size={14} className="mr-2" />
                  {profile.experience || "0 years"}
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                  <Coffee size={14} className="mr-2" />
                  {profile.company || "Not specified"}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 bg-gradient-to-b from-slate-900 to-black -mb-2">
            <p className="text-slate-300">
              {profile.bio || "No bio available"}
            </p>

            {["skills", "learning", "interests"].map((type) => (
              <div key={type}>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                  {type === "skills" && <Code size={16} className="mr-2" />}
                  {type === "learning" && (
                    <Zap size={16} className="mr-2 text-yellow-400" />
                  )}
                  {type === "interests" && (
                    <Star size={16} className="mr-2 text-yellow-300" />
                  )}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </h3>
                <div className="flex flex-wrap">
                  {(profile[type] || []).map((item, idx) => (
                    <SkillTag key={idx} skill={item} type={type} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex justify-around p-2 border-t border-slate-700 bg-black/30">
            {profile.github && (
              <a
                href={`https://${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-slate-400"
              >
                <Github />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 text-slate-400"
              >
                <Linkedin />
              </a>
            )}
            {profile.portfolio && (
              <a
                href={`https://${profile.portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 text-slate-400"
              >
                <Globe />
              </a>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-12 mt-8 relative z-20">
          <button
            onClick={() => handleSwipe("left")}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
          >
            <X size={24} />
          </button>
          <button
            onClick={() => handleSwipe("right")}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
