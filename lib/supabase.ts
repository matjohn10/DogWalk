import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lnquhrvujetkpmhdoypj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXVocnZ1amV0a3BtaGRveXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzOTgzMTUsImV4cCI6MjA0Mzk3NDMxNX0.VE6w27JzzdNWI4zvGFQFJUB8QdhAC413rXEhtl9qnEc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
