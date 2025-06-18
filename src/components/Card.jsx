import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaGithub, FaCode, FaHeart, FaTimes } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const TechSkillBadge = ({ skill }) => (
    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
        {skill}
    </span>
);

// Define defaultDeveloper before the component
const defaultDeveloper = {
    firstname: "Vikas",
    profileImage: "/camera.jpg",
    yearsOfExperience: "5",
    bio: "Full Stack Developer | MERN Stack Specialist",
    location: "Bangalore, India",
    techStack: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "TailwindCSS"],
    githubProfile: "https://github.com/yourusername",
    githubRepos: "25",
    leetcodeProfile: "https://leetcode.com/yourusername",
    leetcodeScore: "1500+"
};

const Card = ({ developer = defaultDeveloper, onSwipe }) => {
    const [direction, setDirection] = useState(null);
    const [imageError, setImageError] = useState(false);

    const handleSwipe = (swipeDirection) => {
        setDirection(swipeDirection);
        setTimeout(() => {
            onSwipe?.(swipeDirection === 'right');
        }, 200);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 1 }}
                animate={{
                    scale: 1,
                    rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
                    x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
                    opacity: direction ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-xl overflow-hidden"
            >
                {/* Profile Image */}
                <div className="relative h-96">
                    <img
                        src={!imageError ? developer.profileImage : '/default-dev-image.jpg'}
                        alt={`${developer.firstname}'s profile`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-2xl font-bold text-white">{developer.firstname}</h2>
                        <span className="px-2 py-1 bg-blue-500 text-xs rounded-full text-white">
                            {developer.yearsOfExperience}+ YOE
                        </span>
                    </div>

                    <div className="space-y-3 mb-6">
                        <p className="text-gray-300 text-sm line-clamp-2">{developer.bio}</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                            {developer.techStack.slice(0, 4).map((tech, index) => (
                                <TechSkillBadge key={index} skill={tech} />
                            ))}
                            {developer.techStack.length > 4 && (
                                <span className="text-gray-400 text-sm">
                                    +{developer.techStack.length - 4} more
                                </span>
                            )}
                        </div>

                        {/* Stats & Links */}
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            {developer.githubProfile && (
                                <a
                                    href={developer.githubProfile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                                >
                                    <FaGithub /> {developer.githubRepos}
                                </a>
                            )}
                            {developer.leetcodeProfile && (
                                <a
                                    href={developer.leetcodeProfile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                                >
                                    <SiLeetcode /> {developer.leetcodeScore}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-6 mt-4">
                        <button
                            onClick={() => handleSwipe('left')}
                            className="p-4 bg-gray-700 rounded-full text-red-400 hover:bg-red-400 hover:text-white transition-colors"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        <button
                            onClick={() => handleSwipe('right')}
                            className="p-4 bg-gray-700 rounded-full text-green-400 hover:bg-green-400 hover:text-white transition-colors"
                        >
                            <FaHeart className="text-xl" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Card;