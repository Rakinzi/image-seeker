import { AppState } from "react-native";
import 'react-native-url-polyfill';
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'

const SUPABASE_URL = "https://togwawzkgfhfhfbuozib.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZ3dhd3prZ2ZoZmhmYnVvemliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MzI4NzAsImV4cCI6MjAyNjIwODg3MH0.k6C_rgs6i1MD2irsVq__xNJ5YhjkV1R7r4tu8CpSN_Q";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
export default supabase


AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

