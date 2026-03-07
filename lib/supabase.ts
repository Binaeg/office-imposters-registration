import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Public client – safe to use in browser and server components */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-only client using the service role key.
 * Only import this in API routes / server actions – never expose to the browser.
 */
export const supabaseServer = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
