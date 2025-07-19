import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://amlwgvpkriukfpuysjtl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbHdndnBrcml1a2ZwdXlzanRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjQ3MjEsImV4cCI6MjA2NDk0MDcyMX0.Lyu2QBnKqlUHemEDeEz5kCu7d5puYsAnhZ6dEX053z0";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  },
});

export const auth = supabase.auth;
export const db = supabase;
export const storage = supabase.storage;
