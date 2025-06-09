import React, { useState } from 'react';
/* import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {supabase} from '../utils/supabase';
import { useDispatch } from 'react-redux';  

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        day: '',
        month: '',
        year: '',
        gender: '',
        profession: '',
        location: '',
        bio: 'Hello, I am Vikas!',
        photos: [],
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (files) => {
        console.log('Files uploaded:', files);
        const newPhotos = [...input.photos, ...files].slice(0, 2); // limit to 2
            console.log('Updated photo list:', newPhotos);
        setInput({ ...input, photos: newPhotos });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changed field: ${name}, Value: ${value}`);
        setInput({ ...input, [name]: value });
    };

    const handleGenderSelect = (gender) => {
        console.log(`Selected Gender: ${gender}`);
        setInput({ ...input, gender });
    };
 
    const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submission started');
  setError('');
  setLoading(true);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(input.password)) {
    setError("Password must be at least 8 characters long and include a number, a lowercase letter, and an uppercase letter.");
    setLoading(false);
    return;
  }

  try {
    // Step 1: Sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
        }
      }
    });

    if (signUpError) throw signUpError;
    const userId = signUpData.session?.user?.id || signUpData.user?.id;
    if (!userId) throw new Error("User ID not returned.");

    // Step 2: Upload photos
    const photoUrls = [];
    for (let i = 0; i < input.photos.length; i++) {
      const file = input.photos[i];
      const extension = file.name.split('.').pop();
      const filePath = `${userId}_photo_${i}.${extension}`;

      const { error: uploadError } = await supabase
        .storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);

      photoUrls.push(urlData.publicUrl);
    }

    // Step 3: Insert profile into users table
    const { error: insertError } = await supabase
      .from('users')
      .insert([{
        id: userId,
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        dob: `${input.year}-${input.month}-${input.day}`,
        gender: input.gender,
        profession: input.profession,
        location: input.location,
        bio: input.bio,
        photos: photoUrls,
        created_at: new Date().toISOString(),
      }]);

    if (insertError) throw insertError;

    navigate('/login');
  } catch (err) {
    console.error("An error occurred during registration:", err);
    setError(err.message || "Unexpected error");
  } finally {
    setLoading(false);
  }
};

 





    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white py-2 px-4">
            <div className="bg-black border border-gray-700 p-8 rounded-lg shadow-xl w-full max-w-5xl">

                <h2 className="text-3xl font-bold mb-6 text-center">Create account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col ">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Side Form *}
                        <div className="flex-1 space-y-4">
                            {/* First Name and Last Name on same line *}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstname" className="block text-md font-semibold  mb-2">
                                        First name
                                    </label>
                                    <input
                                        name="firstname"
                                        type="text"
                                        value={input.firstname}
                                        onChange={handleChange}
                                        required
                                        placeholder="First name"
                                        className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-md font-semibold mb-2">
                                        Last name
                                    </label>
                                    <input
                                        name="lastname"
                                        type="text"
                                        value={input.lastname}
                                        onChange={handleChange}
                                        required
                                        placeholder="Last name"
                                        className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Email *}
                            <div>
                                <label htmlFor='email' className="block text-md font-semibold mb-2">Email</label>
                                <input
                                    name="email"
                                    value={input.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* password *}
                            <div className="relative">
                                <label htmlFor="password" className="block text-md font-semibold mb-2">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={input.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    minLength="8"
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                    className="w-full px-4 py-2 pr-12 rounded-md bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-[50px] transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            </div>


                            {/* Birthday - smaller and round inputs *}
                            <div>
                                <h3 className="text-md font-semibold mb-2 text-white">Birthday</h3>
                                <div className="flex gap-3 justify-start items-center mb-2">
                                    <div className="text-center">
                                        <label className="block text-sm text-white mb-2">Day</label>
                                        <input
                                            name="day"
                                            type="number"
                                            value={input.day}
                                            onChange={handleChange}
                                            placeholder="DD"
                                            min="1"
                                            max="31"
                                            required
                                            className="w-[80px] h-[46px] text-center rounded-md bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <label className="block text-sm text-white mb-2">Month</label>
                                        <input
                                            name="month"
                                            type="number"
                                            value={input.month}
                                            onChange={handleChange}
                                            placeholder="MM"
                                            min="1"
                                            max="12"
                                            required
                                            className="w-[80px] h-[46px] text-center rounded-md bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <label className="block text-sm text-white mb-2">Year</label>
                                        <input
                                            name="year"
                                            type="number"
                                            value={input.year}
                                            onChange={handleChange}
                                            placeholder="YYYY"
                                            min="1900"
                                            max="2010"
                                            required
                                            className="w-[80px] h-[46px]  text-center rounded-md  bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Gender *}
                            <div>
                                <h3 className="text-md font-semibold mb-2 text-white">Gender</h3>
                                <div className="flex gap-2">
                                    {['Man', 'Woman', 'More'].map((g) => (
                                        <button
                                            key={g}
                                            type="button"
                                            required
                                            onClick={() => handleGenderSelect(g)}
                                            className={` w-[140px] h-[44px] px-6 py-3 rounded-full border transition-all font-medium ${input.gender === g
                                                ? 'border-red-500 bg-red-500 text-white'
                                                : 'border-gray-600 text-white bg-transparent hover:border-blue-400'
                                                }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Profession *}
                            <div>
                                <label className="block text-md font-semibold  mb-2">Profession</label>
                                <input
                                    name="profession"
                                    value={input.profession}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    placeholder="e.g. Software Engineer, Frontend Developer"
                                    className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Right Side Photos *}
                        <div className="flex-1 ">
                            {/* Profile Photos Upload Section *}
                            <label className="block text-md font-semibold mb-3">Profile photos</label>
                            <div
                                className="grid grid-cols-2 gap-4 mb-4"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const files = Array.from(e.dataTransfer.files);
                                    handleImageUpload(files);
                                }}
                            >
                                {input.photos.length < 2 && (
                                    <div
                                        onClick={() => document.getElementById('photoInput').click()}
                                        className="w-full aspect-square border-2 border-dashed border-gray-600 flex justify-center items-center text-blue-500 text-4xl rounded-md hover:border-blue-400 transition-colors cursor-pointer"
                                    >
                                        +
                                    </div>
                                )}
                                {input.photos.map((photo, i) => (
                                    <div key={i} className="w-full aspect-square rounded-md overflow-hidden border border-gray-600">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt={`upload-${i}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                <input
                                    type="file"
                                    id="photoInput"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(Array.from(e.target.files))}
                                />
                            </div>

                            <p className="text-sm text-gray-400 mb-2">
                                Hold, drag and drop or press the space bar and arrow keys to reorder your photos
                            </p>
                            <p className="text-sm text-gray-400 mb-4">
                                Upload 2 photos to start.
                            </p>
                            {/* location *}
                            <div>
                                <label className="block text-md mb-1">Location</label>
                                <input
                                    name="location"
                                    value={input.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Ghaziabad, UP"
                                    className="w-full px-4 py-2 mb-3 rounded-md bg-black border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Bio - moved below image section *}
                            <div>
                                <label className="block text-md font-semibold mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    value={input.bio}
                                    required
                                    onChange={handleChange}
                                    placeholder="Tell us about yourself..."
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    {/* Submit & Link *}
                    <div className="mt-8 flex flex-col items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full md:w-1/2 lg:w-1/3 py-3 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
              ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                        <p className="mt-4 text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-400 hover:underline">
                                Login in
                            </Link>
                        </p>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </form>

            </div>

        </div>

    );
};
*/
export default Register; 