import { createGoalAction } from "@/lib/actions/goals-actions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-9 w-full rounded-lg border border-border bg-transparent px-3 text-sm outline-none focus:border-gold/40";
const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

export function AddGoalForm() {
  return (
    <Card className="p-5">
      <h3 className="font-display text-base font-medium">Agregar meta</h3>
      <form action={createGoalAction} className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="col-span-2">
          <label className={labelClass}>Nombre de la meta</label>
          <input name="name" required placeholder="Ej. Fondo de emergencia" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Valor objetivo (COP)</label>
          <input name="targetAmount" type="number" step="any" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Avance actual (COP)</label>
          <input name="currentAmount" type="number" step="any" defaultValue={0} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Fecha objetivo</label>
          <input name="targetDate" type="date" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Ahorro mensual sugerido (COP)</label>
          <input name="monthlyRequired" type="number" step="any" defaultValue={0} className={fieldClass} />
        </div>
        <div className="col-span-2 sm:col-span-4">
          <Button type="submit" size="sm" variant="outline">
            Guardar meta
          </Button>
        </div>
      </form>
    </Card>
  );
}
