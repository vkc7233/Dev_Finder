import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import DevCard from '../components/Card';

const Match = () => {
  const [developers, setDevelopers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_auth')
        .select(`
          *,
          user_profiles (*)
        `);

      if (error) throw error;

      const formattedDevs = data.map(dev => ({
        id: dev.id,
        firstname: dev.firstname,
        ...dev.user_profiles,
        techStack: dev.user_profiles?.skills?.split(',') || [],
        yearsOfExperience: calculateExperience(dev.user_profiles?.experience_start)
      }));

      setDevelopers(formattedDevs);
    } catch (error) {
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (isLike) => {
    const currentDev = developers[currentIndex];
    
    if (isLike) {
      // Record the match in database
      await supabase.from('matches').insert({
        user_id: currentDev.id,
        matched_with: (await supabase.auth.getUser()).data.user.id,
        status: 'pending'
      });
    }

    setCurrentIndex(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto pt-20">
        {currentIndex < developers.length ? (
          <Card 
            developer={developers[currentIndex]}
            onSwipe={handleSwipe}
          />
        ) : (
          <div className="text-center text-gray-400">
            <h3 className="text-xl font-semibold mb-2">No more developers</h3>
            <p>Check back later for more matches!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
