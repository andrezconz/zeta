export const SITE_AUTH_COOKIE = "fortis_auth";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token derivado de SITE_PASSWORD; vive en una cookie y nunca contiene la
 * contraseña en texto plano. */
export async function expectedSiteToken(): Promise<string | null> {
  const password = process.env.SITE_PASSWORD;
  if (!password) return null;
  return sha256Hex(password);
}

export async function isValidSitePassword(candidate: string): Promise<boolean> {
  const expected = await expectedSiteToken();
  if (!expected) return false;
  const candidateToken = await sha256Hex(candidate);
  return candidateToken === expected;
}
