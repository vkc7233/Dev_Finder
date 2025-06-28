import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Search, Rocket, Stars } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';

const ExploreGalaxy = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error('Unable to fetch current user.');
        }

        const currentId = user.id;
        setCurrentUserId(currentId);

        // Get all users with their profiles, excluding current user
        const { data, error: fetchError } = await supabase
          .from('user_auth')
          .select('*, user_profiles!inner(*)')
          .neq('id', currentId);

        if (fetchError) throw fetchError;

        // Format users and remove duplicates
        const uniqueUsersMap = new Map();
        
        data.forEach((user) => {
          if (!uniqueUsersMap.has(user.id)) {
            uniqueUsersMap.set(user.id, {
              id: user.id,
              name: user.fullname || 'Developer',
              image: user.user_profiles?.profile_image || '/default-avatar.png',
              dob: user.user_profiles?.dob || '',
              gender: user.user_profiles?.gender || '',
              jobTitle: user.user_profiles?.job_title || '',
              company: user.user_profiles?.company || '',
              location: user.user_profiles?.location || '',
              bio: user.user_profiles?.bio || '',
              experience: user.user_profiles?.years_of_experience
                ? `${user.user_profiles.years_of_experience}+ years`
                : '',
              skills: user.user_profiles?.skills || [],
              interests: user.user_profiles?.interests || [],
              learning: user.user_profiles?.current_learning || [],
              github: user.user_profiles?.github_url || '',
              linkedin: user.user_profiles?.linkedin_url || '',
              portfolio: user.user_profiles?.portfolio_url || '',
              available: user.user_profiles?.availability === 'available',
              bgGradient: 'from-slate-900 via-slate-800 to-slate-700',
              accentColor: ['blue', 'purple', 'emerald', 'cyan'][
                Math.floor(Math.random() * 4)
              ],
            });
          }
        });

        setUsers(Array.from(uniqueUsersMap.values()));
        setLoading(false);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white relative overflow-x-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('/stars.svg')] bg-repeat opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="mb-2 text-5xl font-extrabold drop-shadow-lg">
            <span>🌌</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-pink-500">
              Discover DevStars
            </span>
          </h1>
          <p className="text-lg text-slate-300 mt-2">
            Explore the galaxy of developers to connect, collaborate & conquer �
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-1 relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-400 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, skills, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] text-white px-12 py-4 rounded-full shadow-inner 
              border border-slate-700 focus:ring-2 focus:ring-indigo-500/40
              transition-all duration-300 hover:border-indigo-500/40"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <Stars className="animate-spin text-indigo-500" size={40} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-32">
            <div className="text-red-500 bg-red-500/10 px-4 py-3 rounded-lg inline-flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="flex justify-center items-center flex-wrap gap-6">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="w-full max-w-sm">
                  <ProfileCard formData={user} />
                </div>
              ))
            ) : (
              <div className="text-center text-slate-400 mt-24">
                <Rocket className="mx-auto mb-4 text-indigo-500" size={48} />
                <h2 className="text-xl font-bold">No developers found in this quadrant.</h2>
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