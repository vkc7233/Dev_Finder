import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        console.error("Session fetch error:", sessionError.message);
        setLoading(false);
        return;
      }

      const sessionUser = sessionData?.session?.user;
      if (!sessionUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Get user_auth details (e.g., firstname, email)
      const { data: userData, error: userError } = await supabase
        .from("user_auth")
        .select("*")
        .eq("id", sessionUser.id)
        .single();

      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", sessionUser.id)
        .single();

      if (userError || profileError) {
        console.error(
          "Error fetching user details:",
          userError.message || profileError.message
        );
        setUser(sessionUser);
        setLoading(false);
        return;
      }

      setUser({
        ...sessionUser,
        fullname: userData.fullname,
        profile_data: profileData || null,
        email: sessionUser.email,
      });
      setLoading(false);
    };

    getUserData();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user;
        if (!sessionUser) {
          setUser(null);
          setLoading(false);
        } else {
          getUserData();
        }
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe(); // Safe unmount
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
