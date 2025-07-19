import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  Plus,
  X,
} from "lucide-react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthContext";
import { uploadProfileImage, deleteProfileImage } from "../utils/imageHelpers";

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    image: "",
    name: user?.fullname || "",
    dob: "",
    gender: "",
    jobTitle: "",
    company: "",
    location: "",
    bio: "",
    experienceLevel: "",
    yearsOfExperience: "",
    education: "",
    github: "",
    linkedin: "",
    portfolio: "",
    lookingFor: "",
    availability: "",
  });

  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [interests, setInterests] = useState(["Open Source", "AI/ML"]);
  const [currentLearning, setCurrentLearning] = useState([
    "Next.js",
    "TypeScript",
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newLearning, setNewLearning] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = (item, setItem, items, setItems) => {
    if (item.trim() && !items.includes(item.trim())) {
      setItems([...items, item.trim()]);
      setItem("");
    }
  };

  const removeItem = (itemToRemove, items, setItems) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.id) return;

    try {
      const newImageUrl = await uploadProfileImage(file, user.id);

      // Optionally delete old image if you store paths, not just URLs
      // await deleteProfileImage(oldImagePath);

      setFormData((prev) => ({
        ...prev,
        image: newImageUrl,
      }));
      console.log("Image uploaded successfully!");
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.log("Failed to upload image: " + error.message);
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    const profileData = {
      id: user.id,
      profile_image: formData.image,
      dob: formData.dob,
      gender: formData.gender,
      job_title: formData.jobTitle,
      company: formData.company,
      location: formData.location,
      bio: formData.bio,
      years_of_experience: parseInt(formData.yearsOfExperience),
      skills,
      interests,
      current_learning: currentLearning,
      github_url: formData.github,
      linkedin_url: formData.linkedin,
      portfolio_url: formData.portfolio,
      availability: formData.availability,
      education: formData.education,
      looking_for: formData.lookingFor,
    };

    const today = new Date();
    const dob = new Date(formData.dob);
    const ageDiff = today.getFullYear() - dob.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    const actualAge = hasHadBirthdayThisYear ? ageDiff : ageDiff - 1;

    if (actualAge < 18) {
      toast.error("You must be at least 18 years old to register.");
      return;
    }

    console.log("Submitting profile data:", profileData);

    const upsertPromise = supabase
      .from("user_profiles")
      .upsert(profileData, { onConflict: ["id"] });

    toast.promise(upsertPromise, {
      loading: "Saving profile...",
      success: "Profile saved successfully!",
      error: "Failed to save profile.",
    });

    const { error } = await upsertPromise;

    if (error) {
      console.error("Error saving profile:", error.message);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFormData((prev) => ({
          ...prev,
          image: data.profile_image || prev.image,
          dob: data.dob || prev.dob,
          gender: data.gender || prev.gender,
          jobTitle: data.job_title || prev.jobTitle,
          company: data.company || prev.company,
          location: data.location || prev.location,
          bio: data.bio || prev.bio,
          yearsOfExperience:
            data.years_of_experience?.toString() || prev.yearsOfExperience,
          education: data.education || prev.education,
          github: data.github_url || prev.github,
          linkedin: data.linkedin_url || prev.linkedin,
          portfolio: data.portfolio_url || prev.portfolio,
          availability: data.availability || prev.availability,
          lookingFor: data.looking_for || prev.lookingFor,
        }));

        setSkills(data.skills || []);
        setInterests(data.interests || []);
        setCurrentLearning(data.current_learning || []);
      }
    };

    fetchProfile();
  }, [user]);

  const addSkill = () => addItem(newSkill, setNewSkill, skills, setSkills);
  const removeSkill = (skill) => removeItem(skill, skills, setSkills);

  const addInterest = () =>
    addItem(newInterest, setNewInterest, interests, setInterests);
  const removeInterest = (interest) =>
    removeItem(interest, interests, setInterests);

  const addLearning = () =>
    addItem(newLearning, setNewLearning, currentLearning, setCurrentLearning);
  const removeLearning = (learning) =>
    removeItem(learning, currentLearning, setCurrentLearning);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {" "}
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Dev<span className="text-blue-500">Profile</span>
              </h1>
              <p className="text-gray-400">Customize Your Developer Identity</p>
            </div>
            <div className="space-y-6">
              {/* Profile Picture Section */}
              <div className="bg-[#1c1c1c] rounded-xl p-4 border border-gray-800">
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative w-36 h-36">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden flex items-center justify-center text-white text-4xl font-bold">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt={formData.name.charAt(0)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{formData.name?.charAt(0) || "U"}</span>
                      )}
                    </div>

                    <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md">
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Click camera icon to update profile picture
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Briefcase className="mr-3 text-blue-500" />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      <Calendar className="inline mr-1" size={16} />
                      Date Of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition duration-200"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                      placeholder="e.g., Full Stack Developer"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                      placeholder="Current workplace"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      <MapPin className="inline mr-1" size={16} />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                      placeholder="City, State or Remote"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition duration-200"
                    >
                      <option value="Junior">Junior (0-2 years)</option>
                      <option value="Mid-level">Mid-level (2-5 years)</option>
                      <option value="Senior">Senior (5+ years)</option>
                      <option value="Lead">Lead/Principal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                      placeholder="Years"
                      min="0"
                      max="50"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Bio/About Me
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200 resize-none"
                    placeholder="Tell other developers about yourself, your passion for coding, and what drives you..."
                  />
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Code className="mr-3 text-blue-500" />
                  Technical Skills
                </h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-400 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                    className="flex-1 px-4 py-2 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                    placeholder="Add a skill (e.g., JavaScript, React, Python)"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Links Section */}
              <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Globe className="mr-3 text-blue-500" />
                  Professional Links
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      <Github className="inline mr-1" size={16} />
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      <Linkedin className="inline mr-1" size={16} />
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      <Globe className="inline mr-1" size={16} />
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    <GraduationCap className="inline mr-1" size={16} />
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200"
                    placeholder="Degree, University or Bootcamp, Self-taught"
                  />
                </div>
              </div>

              {/* Interests & Learning */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Interests */}
                <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Star className="mr-2 text-blue-500" />
                    Interests
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {interests.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-2 text-white hover:text-gray-200"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addInterest())
                      }
                      className="flex-1 px-3 py-2 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200 text-sm"
                      placeholder="Add interest"
                    />
                    <button
                      type="button"
                      onClick={addInterest}
                      className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Currently Learning */}
                <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <GraduationCap className="mr-2 text-blue-500" />
                    Currently Learning
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentLearning.map((learning, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1  bg-blue-500/20 text-blue-400  text-sm rounded-full"
                      >
                        {learning}
                        <button
                          type="button"
                          onClick={() => removeLearning(learning)}
                          className="ml-2 text-white hover:text-gray-200"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLearning}
                      onChange={(e) => setNewLearning(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addLearning())
                      }
                      className="flex-1 px-3 py-2 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-200 text-sm"
                      placeholder="Add technology"
                    />
                    <button
                      type="button"
                      onClick={addLearning}
                      className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Preferences & Goals
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Looking For
                    </label>
                    <select
                      name="lookingFor"
                      value={formData.lookingFor || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition duration-200"
                    >
                      <option value="">Select Interest</option>
                      <option value="networking">Networking</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="mentorship">Mentorship</option>
                      <option value="job-opportunities">
                        Job Opportunities
                      </option>
                      <option value="learning">Learning Partners</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition duration-200"
                    >
                      <option value="">Select Availability</option>
                      <option value="available-for-projects">
                        Available for Projects
                      </option>
                      <option value="open-to-opportunities">
                        Open to Opportunities
                      </option>
                      <option value="networking-only">Networking Only</option>
                      <option value="not-available">Not Available</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message above submit button 
              {submitMessage.text && (
                <div
                  className={`mb-4 px-4 py-3 rounded-lg text-center font-semibold ${
                    submitMessage.type === "success"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}*/}

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
