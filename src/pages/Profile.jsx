/* import React from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  const userData = {
    image: user?.user_metadata?.avatar_url || "https://randomuser.me/api/portraits/men/75.jpg",
    name: user?.user_metadata?.full_name || 'Anonymous User',
    title: user?.user_metadata?.title || 'Developer',
    description: user?.user_metadata?.bio || 'No bio available.'
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <Card
        image={userData.image}
        name={userData.name}
        title={userData.title}
        description={userData.description}
        className="hover:shadow-xl transition-shadow duration-300"
      />
    </div>
  );
};

export default Profile;
 */

import Card from "../components/Card";

const Profile = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

        {/* Left: Profile Preview */}
        <div className="md:w-1/3">
          <Card
            imageUrl="https://source.unsplash.com/300x300?developer"
            name="Vikas Sharma"
            title="Frontend Developer"
            description="React | Tailwind | Supabase"
          />
        </div>

        {/* Right: Form Section */}
        <div className="md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

          <form className="space-y-4">
            {/* Name */}
            <div className="flex gap-4">
              <input className="input" placeholder="First Name" />
              <input className="input" placeholder="Last Name" />
            </div>

            {/* DOB + Gender */}
            <div className="flex gap-4">
              <input className="input" placeholder="DD" />
              <input className="input" placeholder="MM" />
              <input className="input" placeholder="YYYY" />
            </div>
            <div>
              <label className="block mb-2">Gender</label>
              <select className="input">
                <option>Man</option>
                <option>Woman</option>
                <option>Other</option>
              </select>
            </div>

            {/* Profession */}
            <input className="input" placeholder="Profession (e.g. Full Stack Developer)" />

            {/* Bio */}
            <textarea className="input" rows={3} placeholder="Tell us about yourself..."></textarea>

            {/* Location */}
            <input className="input" placeholder="Location (e.g. Delhi, India)" />

            {/* Upload */}
            <div>
              <label className="block mb-2">Upload Profile Image</label>
              <input type="file" className="text-sm" />
            </div>

            {/* Save Button */}
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
