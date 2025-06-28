import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Session fetch error:", sessionError.message);
        return;
      }


      const sessionUser = sessionData?.session?.user;
      if (!sessionUser) return setUser(null);

      // Get user_auth details (e.g., firstname, email)
      const { data: userData, error: userError } = await supabase
        .from('user_auth')
        .select('*')
        .eq('id', sessionUser.id)
        .single();
       
      
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (userError || profileError) {
        console.error("Error fetching user details:", userError.message || profileError.message);
        return setUser(sessionUser);
      }

      setUser({ ...sessionUser, fullname: userData.fullname,
                profile_data: profileData || null,
                email: sessionUser.email
       })
    };

    getUserData();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;
      if (!sessionUser) {
        setUser(null);
      }
      else{
        getUserData();
      }

    });

    return () => {
      subscription?.subscription?.unsubscribe(); // Safe unmount
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
