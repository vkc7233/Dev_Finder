import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';


const Login = () => {
    const { user } = useAuth();
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email: input.email,
                password: input.password,
            });

            if (data?.user) {
                navigate('/');
            } else {
                setError(loginError?.message || "Login failed");
            }
        } catch (error) {
            setError("An unexpected error occurred", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center w-full h-screen bg-black px-4">
            <div className="p-8 bg-black border border-gray-700 shadow-xl rounded-lg max-w-sm w-full text-white">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6" aria-label="Login form">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email ID</label>
                        <input
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 bg-black text-white border border-gray-600 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={input.password}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                required
                                placeholder="Enter your password"
                                minLength="8"
                                className="w-full px-4 py-2 bg-black text-white border border-gray-600 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-gray-200 focus:outline-none"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        {error && <p className="text-red-500 pt-2 text-sm">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-400 text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
