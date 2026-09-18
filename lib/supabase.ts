import { createClient } from "@supabase/supabase-js";

function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

let _supabase: ReturnType<typeof createSupabaseClient> | null = null;

export function getSupabase() {
  if (!_supabase) _supabase = createSupabaseClient();
  return _supabase;
}
