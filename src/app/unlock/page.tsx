import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FortisMark } from "@/components/fortis-mark";
import { Button } from "@/components/ui/button";
import { SITE_AUTH_COOKIE, expectedSiteToken, isValidSitePassword } from "@/lib/site-auth";

async function unlock(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  if (!(await isValidSitePassword(password))) {
    redirect(`/unlock?next=${encodeURIComponent(next)}&error=1`);
  }

  const token = await expectedSiteToken();
  const cookieStore = await cookies();
  cookieStore.set(SITE_AUTH_COOKIE, token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(next);
}

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = params.next ?? "/dashboard";
  const hasError = params.error === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b0c] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex items-center justify-center gap-2">
          <FortisMark className="h-7 w-7" />
          <span className="font-display text-base font-medium text-white">Fortis</span>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
          <h1 className="font-display text-xl font-medium text-white">Acceso privado</h1>
          <p className="mt-1.5 text-sm text-white/50">
            Este panel es de uso personal. Ingresa la clave de acceso.
          </p>

          {hasError && (
            <p className="mt-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
              Clave incorrecta. Intenta de nuevo.
            </p>
          )}

          <form action={unlock} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <div>
              <label htmlFor="password" className="text-xs font-medium text-white/60">
                Clave de acceso
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="••••••••"
                className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold/40"
              />
            </div>
            <Button type="submit" variant="gold" className="w-full">
              Entrar
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Contenido educativo. No constituye asesoría financiera individual.
        </p>
      </div>
    </div>
  );
}
