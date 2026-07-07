"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FortisMark } from "@/components/fortis-mark";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      router.push("/dashboard");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b0c] px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2">
          <FortisMark className="h-7 w-7" />
          <span className="font-display text-base font-medium text-white">Fortis</span>
        </Link>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
          <h1 className="font-display text-xl font-medium text-white">Bienvenido de vuelta</h1>
          <p className="mt-1.5 text-sm text-white/50">
            Inicia sesión para ver tu patrimonio con claridad.
          </p>

          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-lg border border-gold/20 bg-gold/10 px-3 py-2 text-xs text-gold">
              Modo demo: la autenticación aún no está conectada. Cualquier dato te
              llevará al dashboard con datos simulados.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-medium text-white/60">
                Correo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold/40"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-medium text-white/60">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold/40"
              />
            </div>

            {error && <p className="text-xs text-danger">{error}</p>}

            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar sesión"}
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
