import { supabase } from "./supabase";

export const testDatabaseConnection = async () => {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from("user_auth")
      .select("count(*)")
      .single();

    if (error) {
      console.error("Database connection test failed:", error);
      return false;
    }

    console.log("Database connection test successful");
    return true;
  } catch (err) {
    console.error("Database connection test error:", err);
    return false;
  }
};

export const testAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Auth test failed:", error);
      return false;
    }

    console.log("Auth test successful:", data);
    return true;
  } catch (err) {
    console.error("Auth test error:", err);
    return false;
  }
};
