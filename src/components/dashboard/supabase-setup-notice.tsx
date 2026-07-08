import { DatabaseZap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SupabaseSetupNotice() {
  return (
    <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
        <DatabaseZap className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <p className="font-display text-base font-medium">Conecta Supabase para ver tus datos reales</p>
      <p className="max-w-md text-sm text-muted-foreground">
        Define <code className="rounded bg-foreground/5 px-1 py-0.5">SUPABASE_URL</code> y{" "}
        <code className="rounded bg-foreground/5 px-1 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> en tu
        entorno (ver <code className="rounded bg-foreground/5 px-1 py-0.5">.env.local.example</code>{" "}
        y el README) para empezar a registrar tus cuentas, posiciones y metas.
      </p>
    </Card>
  );
}
