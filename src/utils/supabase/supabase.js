
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase
        

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createBrowserSupabaseClient();