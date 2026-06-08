import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

/**
 * Cookie-less anon Supabase client for PUBLIC content (reads governed by RLS,
 * plus the anon-insert contact form). Because it touches no request cookies or
 * headers, pages that use it can be statically generated and revalidated via
 * `export const revalidate` (ISR) — better LCP than per-request SSR.
 *
 * No service-role key is used anywhere in this project (AGENT.md §9.1).
 */
export const supabasePublic = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
);
