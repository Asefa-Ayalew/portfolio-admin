import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZXdyd3NuYnZqc2F4d3l0eGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NDkxOTQsImV4cCI6MjA0NjEyNTE5NH0.z2Vtfg7MPb9DIec7XD_TTiIrIuW2Y2QBLiK-2sXfk2w";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANNON_KEY ?? "https://crewrwsnbvjsaxwytxju.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
