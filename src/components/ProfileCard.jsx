import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Calendar, Globe, MapPin, Code, Briefcase, Star, Heart, X, Coffee, Zap, Award } from 'lucide-react';
import developerProfiles from '../data/developerProfiles';

const ProfileCard = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState('');

    const bgGradients = [
        'from-slate-900 via-slate-800 to-slate-700',
        'from-indigo-900 via-indigo-800 to-indigo-700',
        'from-zinc-800 via-gray-800 to-slate-900',
        'from-neutral-800 via-neutral-700 to-neutral-600',
        'from-neutral-800 via-neutral-700 to-neutral-600',
        'from-blue-900 via-sky-800 to-blue-700',
        'from-purple-900 via-fuchsia-800 to-purple-700',
        'from-emerald-900 via-emerald-800 to-emerald-700',
        'from-rose-900 via-rose-800 to-rose-700',
        'from-yellow-900 via-amber-800 to-yellow-700',
        'from-cyan-900 via-cyan-800 to-cyan-700',
        'from-pink-900 via-pink-800 to-pink-700',
        'from-green-900 via-teal-800 to-green-700'
    ];

    const accentColors = ['blue', 'purple', 'emerald', 'rose', 'amber', 'cyan', 'pink', 'lime', 'indigo'];

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const assignRandomStyles = developerProfiles.map((profile) => ({
            ...profile,
            bgGradient: bgGradients[Math.floor(Math.random() * bgGradients.length)],
            accentColor: accentColors[Math.floor(Math.random() * accentColors.length)],
        }));
        setProfiles(assignRandomStyles);
    }, []);


    const currentProfile = profiles[currentCardIndex];
    const nextProfile = profiles[(currentCardIndex + 1) % profiles.length];
    if (!currentProfile) return null;

    const handleSwipe = (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setSwipeDirection(direction);

        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev + 1) % profiles.length);
            setIsAnimating(false);
            setSwipeDirection('');
        }, 300);
    };

    const getAccentColors = (color) => {
        const colors = {
            blue: {
                primary: 'text-blue-400',
                bg: 'bg-blue-500/20',
                border: 'border-blue-500/30',
                gradient: 'from-blue-600 to-blue-700',
                hover: 'hover:text-blue-300'
            },
            purple: {
                primary: 'text-purple-400',
                bg: 'bg-purple-500/20',
                border: 'border-purple-500/30',
                gradient: 'from-purple-600 to-purple-700',
                hover: 'hover:text-purple-300'
            },
            emerald: {
                primary: 'text-emerald-400',
                bg: 'bg-emerald-500/20',
                border: 'border-emerald-500/30',
                gradient: 'from-emerald-600 to-emerald-700',
                hover: 'hover:text-emerald-300'
            },
            rose: {
                primary: 'text-rose-400',
                bg: 'bg-rose-500/20',
                border: 'border-rose-500/30',
                gradient: 'from-rose-600 to-rose-700',
                hover: 'hover:text-rose-300'
            },
            amber: {
                primary: 'text-amber-400',
                bg: 'bg-amber-500/20',
                border: 'border-amber-500/30',
                gradient: 'from-amber-600 to-amber-700',
                hover: 'hover:text-amber-300'
            },
            cyan: {
                primary: 'text-cyan-400',
                bg: 'bg-cyan-500/20',
                border: 'border-cyan-500/30',
                gradient: 'from-cyan-600 to-cyan-700',
                hover: 'hover:text-cyan-300'
            },
            pink: {
                primary: 'text-pink-400',
                bg: 'bg-pink-500/20',
                border: 'border-pink-500/30',
                gradient: 'from-pink-600 to-pink-700',
                hover: 'hover:text-pink-300'
            },
            lime: {
                primary: 'text-lime-400',
                bg: 'bg-lime-500/20',
                border: 'border-lime-500/30',
                gradient: 'from-lime-600 to-lime-700',
                hover: 'hover:text-lime-300'
            },
            indigo: {
                primary: 'text-indigo-400',
                bg: 'bg-indigo-500/20',
                border: 'border-indigo-500/30',
                gradient: 'from-indigo-600 to-indigo-700',
                hover: 'hover:text-indigo-300'
            }
        };
        return colors[color] || colors.blue;
    };

    const accent = getAccentColors(currentProfile.accentColor);

    const SkillTag = ({ skill, type }) => {
        const gradients = {
            skills: 'from-slate-700 to-slate-600',
            learning: 'from-amber-700 to-amber-600',
            interests: accent.gradient
        };

        return (
            <span className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${gradients[type]} mr-2 mb-2 shadow-sm`}>
                {skill}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-8">
            <div className="relative w-full max-w-sm">

                {/* Card Stack Background with reduced height */}
                <div className="absolute top-0 left-0 w-full h-[600px] z-0">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm rounded-3xl transform rotate-3 scale-95 border border-gray-700/50"></div>
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm rounded-3xl transform rotate-1 scale-97 border border-gray-600/50"></div>
                </div>

                {/* Next Card */}
                {isAnimating && (
                    <div className="absolute inset-0 h-[595px] bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform scale-95 opacity-50 border border-gray-600/50">
                        <div className="w-full h-72 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white text-xl font-bold">
                            {nextProfile.name}
                        </div>
                    </div>
                )}

                {/* Main Card */}
                <div className={`
          relative bg-gradient-to-br from-slate-900 to-black rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform border border-gray-600/50 backdrop-blur-xl
          ${isAnimating && swipeDirection === 'left' ? '-translate-x-full -rotate-12 opacity-0' : ''}
          ${isAnimating && swipeDirection === 'right' ? 'translate-x-full rotate-12 opacity-0' : ''}
        `}>
                    {/* Header */}
                    <div className={`relative  ${currentProfile.bgGradient} p-4 text-white  overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                        <div className="relative z-10">
                            <div className="absolute top-0 right-0">
                                <div className={`w-3 h-3 rounded-full ${currentProfile.available ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-red-500'} animate-pulse`}></div>
                            </div>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className={`w-28 h-28 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white text-2xl font-bold border border-white/20 shadow-xl ${accent.bg}`}>
                                    <img
                                        src={currentProfile.image}
                                        alt={currentProfile.name}
                                        className="w-full h-full object-cover rounded-md shadow-md"
                                    />                </div>
                                <div>
                                    <h2 className="text-3xl font-bold mb-1">{currentProfile.name}</h2>
                                    <p className='flex items-center text-sm'>
                                        <Calendar size={16} className="mr-2" />
                                        {currentProfile.dob} &nbsp;&nbsp;  {currentProfile.gender}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Briefcase size={16} className="mr-2" />
                                        {currentProfile.jobTitle}
                                    </p>
                                    <p className="text-sm flex items-center text-white/70 mt-1">
                                        <MapPin size={14} className="mr-2" />
                                        {currentProfile.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-white/80">
                                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                                    <Award size={14} className="mr-2" />
                                    {currentProfile.experience}
                                </div>
                                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                                    <Coffee size={14} className="mr-2" />
                                    {currentProfile.company}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2 bg-gradient-to-b from-slate-900 to-black -mb-2">
                        <p className="text-slate-300">{currentProfile.bio}</p>

                        <div>
                            <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                                <Code size={16} className="mr-2" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap">
                                {currentProfile.skills.map((skill, idx) => <SkillTag key={idx} skill={skill} type="skills" />)}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                                <Zap size={16} className="mr-2 text-yellow-400" /> Learning
                            </h3>
                            <div className="flex flex-wrap">
                                {currentProfile.learning.map((item, idx) => <SkillTag key={idx} skill={item} type="learning" />)}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                                <Star size={16} className="mr-2 text-yellow-300" /> Interests
                            </h3>
                            <div className="flex flex-wrap">
                                {currentProfile.interests.map((item, idx) => <SkillTag key={idx} skill={item} type="interests" />)}
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex justify-around p-2 border-t border-slate-700 bg-black/30">
                        <a href={`https://${currentProfile.github}`} target="_blank" className="hover:text-white text-slate-400">
                            <Github />
                        </a>
                        <a href={`https://${currentProfile.linkedin}`} target="_blank" className="hover:text-blue-400 text-slate-400">
                            <Linkedin />
                        </a>
                        <a href={`https://${currentProfile.portfolio}`} target="_blank" className="hover:text-emerald-400 text-slate-400">
                            <Globe />
                        </a>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-12 mt-8 relative z-20">
                    <button
                        onClick={() => handleSwipe('left')}
                        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
                    >
                        <X size={24} />
                    </button>
                    <button
                        onClick={() => handleSwipe('right')}
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
