import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { FaUserLarge } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const getGreetingMessage = (user) => {
  const FirstName = user?.fullname?.split(" ")[0];
  return `Welcome, ${FirstName || "Developer"} !`;
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error.message);
      toast.error("Logout failed. Please try again.");
    }
  }, [navigate]);

  return (
    // Navbar container: Provides the main structure and styling for the navigation bar
    <div className="navbar bg-base-200 shadow-sm px-4 py-4">
      {/* Left section: Contains the brand logo and link to the homepage */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl">Dev<span className="text-blue-500">Tinder</span></Link>
        <Link to="/" className="btn btn-ghost text-2xl">
          DevTinder
        </Link>
      </div>

      {/* Middle section: Placeholder for navigation links (currently commented out) */}
      <div className="flex font-semibold text-lg mr-4">
        {/* <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/matches" className="hover:text-blue-500">Matches</Link>
        <Link to="/messages" className="hover:text-blue-500">Messages</Link>
        <Link to="/explore" className="hover:text-blue-500">Explore</Link> */}
      </div>

      {/* Right section: Displays user-specific options or login/register buttons */}
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end mr-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full">
                <img
                  alt={`${user?.fullname || "User"}'s avatar`}
                  src={
                    user?.profile_data?.profile_image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 right-0"
            >
              <li>
                <p className="font-semibold text-lg text-center">
                  {getGreetingMessage(user)}
                </p>
              </li>
              <li>
                <Link
                  className="text-base flex items-center justify-between w-full"
                  to="/profile"
                >
                  Profile <FaUserLarge />
                </Link>
              </li>
              <li>
                <Link
                  className="text-base flex items-center justify-between w-full"
                  to="/settings"
                >
                  Settings <IoSettingsOutline />
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary mt-2 font-bold w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-md">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-md">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
