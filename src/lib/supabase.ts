
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with default values if env vars are not available
// This allows the app to at least load even if Supabase is not configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase connection is working
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    return !error;
  } catch (e) {
    console.error('Error connecting to Supabase:', e);
    return false;
  }
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder-url.supabase.co' && 
         supabaseAnonKey !== 'placeholder-key';
};
