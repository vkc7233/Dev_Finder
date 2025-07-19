import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import { supabase } from "../utils/supabase";
import { Search, Rocket, Stars } from "lucide-react";
import ProfileCard from "../components/ProfileCard";

const formatUserProfiles = (rawData) => {
  if (!rawData) return [];

  return rawData.map((u) => ({
    id: u.id,
    name: u.fullname || "Developer",
    image: u.user_profiles?.profile_image || "/default-avatar.png",
    dob: u.user_profiles?.dob || "",
    gender: u.user_profiles?.gender || "",
    jobTitle: u.user_profiles?.job_title || "",
    company: u.user_profiles?.company || "",
    location: u.user_profiles?.location || "",
    bio: u.user_profiles?.bio || "",
    experience: u.user_profiles?.years_of_experience
      ? `${u.user_profiles.years_of_experience}+ years`
      : "",
    skills: Array.isArray(u.user_profiles?.skills)
      ? u.user_profiles.skills
      : [],
    interests: Array.isArray(u.user_profiles?.interests)
      ? u.user_profiles.interests
      : [],
    learning: Array.isArray(u.user_profiles?.current_learning)
      ? u.user_profiles.current_learning
      : [],
    github: u.user_profiles?.github_url || "",
    linkedin: u.user_profiles?.linkedin_url || "",
    portfolio: u.user_profiles?.portfolio_url || "",
    available: u.user_profiles?.availability === "available",
    bgGradient: "from-slate-900 via-slate-800 to-slate-700",
    accentColor: ["blue", "purple", "emerald", "cyan"][
      Math.floor(Math.random() * 4)
    ],
  }));
};

const ExploreGalaxy = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (!u) return false;
      const q = searchQuery.toLowerCase();
      return (
        u.name?.toLowerCase().includes(q) ||
        u.jobTitle?.toLowerCase().includes(q) ||
        u.location?.toLowerCase().includes(q) ||
        u.skills?.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [users, searchQuery]);

  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      try {
        const {
          data: { user },
          error: userErr,
        } = await supabase.auth.getUser();
        if (userErr) throw userErr;
        if (!user) throw new Error("No authenticated user found");

        if (mounted) setCurrentUserId(user.id);

        const { data, error: fetchErr } = await supabase
          .from("user_auth")
          .select("id, fullname, user_profiles(*)")
          .neq("id", user.id);

        if (fetchErr) throw fetchErr;

        const formattedUsers = formatUserProfiles(data);
        if (mounted) setUsers(formattedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users. Please try again.");
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredUsers]);

  const handleSwipe = () => {
    if (!filteredUsers.length) return;
    setCurrentIndex((prev) => (prev + 1) % filteredUsers.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('/stars.svg')] bg-repeat opacity-10 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5">
        {/* header & search */}
        <div className="text-center mb-5">
          <h1 className="mb-2 text-5xl font-extrabold drop-shadow-lg">
            🌌{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-pink-500">
              Discover DevStars
            </span>
          </h1>
          <p className="text-lg text-slate-300 mt-2">
            Explore the galaxy of developers to connect, collaborate & conquer
            🚀
          </p>
        </div>
        <div className="max-w-2xl mx-auto mb-6 relative group">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-400 transition-colors"
          />
          <input
            type="text"
            placeholder="Search by name, skills, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] text-white px-12 py-4 rounded-full shadow-inner border border-slate-700 focus:ring-2 focus:ring-indigo-500/40 transition-all duration-300 hover:border-indigo-500/40"
          />
        </div>

        {/* feedback states */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <Stars className="animate-spin text-indigo-500" size={40} />
          </div>
        )}
        {error && (
          <div className="text-center py-32">
            <div className="text-red-500 bg-red-500/10 px-4 py-3 rounded-lg inline-flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          </div>
        )}

        {/* card display */}
        {!loading && !error && (
          <div className="flex justify-center">
            {filteredUsers.length > 0 && filteredUsers[currentIndex] ? (
              <ProfileCard
                key={filteredUsers[currentIndex].id}
                profile={filteredUsers[currentIndex]}
                onSwipe={handleSwipe}
              />
            ) : (
              <div className="text-center text-slate-400 mt-24">
                <Rocket className="mx-auto mb-4 text-indigo-500" size={48} />
                <h2 className="text-xl font-bold">
                  No developers found in this quadrant.
                </h2>
                <p className="text-slate-500 mt-1">
                  Try adjusting your search parameters 🌟
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreGalaxy;
