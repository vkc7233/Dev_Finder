import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Card from '../components/Card';

const Explore = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch users with their profile data in a single query
                const { data, error } = await supabase
                    .from('user_auth')
                    .select(`
                        *,
                        user_profiles!inner(*)
                    `);

                if (error) throw error;

                // Format the data to match the Card component's expectations
                const formattedUsers = data.map(user => {
                    // Get public URL for profile image
                    const { data: { publicUrl } } = supabase.storage
                        .from('profile-images')
                        .getPublicUrl(user.user_profiles?.profile_image || '');

                    return {
                        id: user.id,
                        firstname: user.firstname,
                        email: user.email,
                        ...user.user_profiles,
                        profileImage: user.user_profiles?.profile_image ? publicUrl : null
                    };
                });

                setUsers(formattedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Explore Developers</h1>

                {/* Search and Filter Section */}
                <div className="mb-8 bg-[#1c1c1c] p-4 rounded-lg">
                    <input
                        type="text"
                        placeholder="Search developers..."
                        className="w-full bg-[#2b2b2b] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <Card
                            key={user.id}
                            formData={user}
                            stats={{
                                projects: user.projects_count || 0,
                                followers: user.followers_count || 0,
                                views: user.profile_views || 0
                            }}
                        />
                    ))}
                </div>

                {users.length === 0 && !loading && (
                    <div className="text-center text-gray-400 mt-8">
                        No developers found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;