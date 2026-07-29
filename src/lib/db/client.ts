import "server-only";
import { createClient } from "@libsql/client";

export const isDbConfigured = Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);

let cached: ReturnType<typeof createClient> | null = null;

/** Cliente Turso (libSQL): solo debe importarse desde Server Components,
 * Server Actions o Route Handlers. El token de autenticación nunca debe
 * exponerse al navegador. */
export function db() {
  if (!isDbConfigured) {
    throw new Error(
      "La base de datos no está configurada. Define TURSO_DATABASE_URL y TURSO_AUTH_TOKEN en .env.local.",
    );
  }
  if (!cached) {
    cached = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
  }
  return cached;
}
