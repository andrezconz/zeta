import { DatabaseZap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DbSetupNotice() {
  return (
    <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
        <DatabaseZap className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <p className="font-display text-base font-medium">Conecta tu base de datos para ver tus datos reales</p>
      <p className="max-w-md text-sm text-muted-foreground">
        Define <code className="rounded bg-foreground/5 px-1 py-0.5">TURSO_DATABASE_URL</code> y{" "}
        <code className="rounded bg-foreground/5 px-1 py-0.5">TURSO_AUTH_TOKEN</code> en tu entorno (ver{" "}
        <code className="rounded bg-foreground/5 px-1 py-0.5">.env.local.example</code> y el README) para
        empezar a registrar tus cuentas, posiciones, metas y movimientos.
      </p>
    </Card>
  );
}
