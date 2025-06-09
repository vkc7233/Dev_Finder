import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import Card from '../components/Card';
import EditForm from '../components/EditForm';
import { uploadProfileImage } from '../utils/imageHelpers';

const Profile = () => {
  const [formData, setFormData] = useState({
    // Basic info (user_auth table)
    firstname: '',
    email: '',
    // Extended info (user_profiles table)
    lastname: '',
    phone: '',
    website: '',
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
          website: profileData?.website || '',
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
          website: formData.website,
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

      const publicUrl = await uploadProfileImage(file, user.id);

      // Update profile with new image URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          profile_image: publicUrl
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setFormData(prev => ({
        ...prev,
        profileImage: publicUrl
      }));

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
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
