import { NextResponse, type NextRequest } from "next/server";
import { SITE_AUTH_COOKIE, expectedSiteToken } from "@/lib/site-auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export async function proxy(request: NextRequest) {
  const expected = await expectedSiteToken();

  // Si no hay SITE_PASSWORD configurada (ej. entorno de desarrollo local
  // sin .env.local todavía), no bloqueamos el acceso.
  if (!expected) return NextResponse.next();

  const cookie = request.cookies.get(SITE_AUTH_COOKIE)?.value;
  if (cookie === expected) return NextResponse.next();

  const unlockUrl = new URL("/unlock", request.url);
  unlockUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(unlockUrl);
}
