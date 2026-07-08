import "server-only";
import { createClient } from "@supabase/supabase-js";

export const isSupabaseConfigured = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/**
 * Cliente con la service role key: solo debe importarse desde Server
 * Components, Server Actions o Route Handlers. Nunca desde un componente
 * "use client" — la service role key ignora Row Level Security.
 */
export function supabaseAdmin() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase no está configurado. Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local.",
    );
  }
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
