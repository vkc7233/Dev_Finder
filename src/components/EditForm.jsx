import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaBriefcase, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import { BiSolidUserDetail } from "react-icons/bi";

const EditForm = ({ formData, handleChange, handleSubmit, loading, handleImageUpload }) => {
    return (
        <form className="w-full max-w-2xl space-y-6" onSubmit={handleSubmit}>
            <div className="border-b border-gray-700 pb-4 mb-6">
                <h2 className="text-3xl font-bold text-blue-500">Edit Profile</h2>
                <p className="text-gray-400 mt-1">Update your personal information</p>
            </div>

            {/* Image Upload Section */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="profile-image"
                        />
                        <label
                            htmlFor="profile-image"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                        >
                            <span>Choose Image</span>
                        </label>
                    </div>
                    {formData.profileImage && <span className="text-sm text-green-400">Image selected</span>}
                </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-500" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-500" />
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBriefcase className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        name="profession"
                        placeholder="Profession"
                        value={formData.profession}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLinkedin className="text-gray-500" />
                    </div>
                    <input
                        type="url"
                        name="linkedin"
                        placeholder="LinkedIn"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                </div>
            </div>

            {/* Bio */}
            <div className="relative">
                <div className="absolute top-3 left-3">
                    <BiSolidUserDetail className="text-gray-500" />
                </div>
                <textarea
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                />
            </div>

            {/* Location */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-500" />
                </div>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                />
            </div>

            {/* Date of Birth */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                <div className="grid grid-cols-3 gap-4">
                    <input type="text" name="day" placeholder="DD" value={formData.dob.day} onChange={handleChange} 
                        className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200" />
                    <input type="text" name="month" placeholder="MM" value={formData.dob.month} onChange={handleChange} 
                        className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200" />
                    <input type="text" name="year" placeholder="YYYY" value={formData.dob.year} onChange={handleChange} 
                        className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200" />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving Changes...
                    </div>
                ) : 'Save Changes'}
            </button>
        </form>
    );
};

export default EditForm;

/* import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import Card from '../components/Card';
import EditForm from '../components/EditForm';
import { updateProfileImage, getImageUrl } from '../utils/imageHelpers';

const Profile = () => {
  const [formData, setFormData] = useState({
    // Basic info (user_auth table)
    firstname: '',   
    email: '',
    // Extended info (user_profiles table)
    lastname: '',
    phone: '',
    linkedin: '',
    profession: '',
    bio: '',
    location: '',
    dob: { day: '', month: '', year: '' },
    profileImage: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch basic info
        const { data: authData } = await supabase
          .from('user_auth')
          .select('*')
          .eq('id', user.id)
          .single();

        // Fetch profile info
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Combine the data
        setFormData({
          firstname: authData?.firstname || '',
          email: authData?.email || '',
          lastname: profileData?.lastname || '',
          phone: profileData?.phone || '',
          linkedin: profileData?.linkedin || '',
          profession: profileData?.profession || '',
          bio: profileData?.bio || '',
          location: profileData?.location || '',
          dob: profileData?.dob ? {
            day: new Date(profileData.dob).getDate(),
            month: new Date(profileData.dob).getMonth() + 1,
            year: new Date(profileData.dob).getFullYear()
          } : { day: '', month: '', year: '' },
          profileImage: profileData?.profile_image || null
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else if (["day", "month", "year"].includes(name)) {
      setFormData({ ...formData, dob: { ...formData.dob, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Update basic info
      const { error: authError } = await supabase
        .from('user_auth')
        .update({
          firstname: formData.firstname,
          email: formData.email
        })
        .eq('id', user.id);

      if (authError) throw authError;

      // Update profile info
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          lastname: formData.lastname,
          phone: formData.phone,
          linkedin: formData.linkedin,
          profession: formData.profession,
          bio: formData.bio,
          location: formData.location,
          dob: new Date(
            formData.dob.year,
            formData.dob.month - 1,
            formData.dob.day
          ).toISOString(),
          profile_image: formData.profileImage,
          updated_at: new Date()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const publicUrl = await updateProfileImage(file, user.id, formData.profileImage);

      setFormData(prev => ({
        ...prev,
        profileImage: publicUrl
      }));

    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row bg-[#1c1c1c] rounded-xl shadow-lg p-6 max-w-6xl w-full gap-8">
        <Card formData={formData} />
        <EditForm 
          formData={formData} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default Profile;
 */