import { createBrokerAccountAction } from "@/lib/actions/portfolio-actions";
import { Button } from "@/components/ui/button";

export function AddBrokerAccountForm() {
  return (
    <form action={createBrokerAccountAction} className="flex flex-wrap items-end gap-3">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Broker</label>
        <input
          name="broker"
          required
          placeholder="Ej. Interactive Brokers"
          className="h-9 w-48 rounded-lg border border-border bg-transparent px-3 text-sm outline-none focus:border-gold/40"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Etiqueta (opcional)
        </label>
        <input
          name="label"
          placeholder="Ej. Cuenta principal"
          className="h-9 w-48 rounded-lg border border-border bg-transparent px-3 text-sm outline-none focus:border-gold/40"
        />
      </div>
      <Button type="submit" size="sm" variant="outline">
        Agregar cuenta
      </Button>
    </form>
  );
}
