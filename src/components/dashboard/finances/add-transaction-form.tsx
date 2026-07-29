import { createCashTransactionAction } from "@/lib/actions/finances-actions";
import { EXPENSE_CATEGORY_SUGGESTIONS, INCOME_CATEGORY_SUGGESTIONS } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-9 w-full rounded-lg border border-border bg-transparent px-3 text-sm outline-none focus:border-gold/40";
const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

const categorySuggestions = Array.from(new Set([...INCOME_CATEGORY_SUGGESTIONS, ...EXPENSE_CATEGORY_SUGGESTIONS]));

export function AddTransactionForm() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Card className="p-5">
      <h3 className="font-display text-base font-medium">Registrar movimiento</h3>
      <form action={createCashTransactionAction} className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div>
          <label className={labelClass}>Tipo</label>
          <select name="kind" required defaultValue="gasto" className={fieldClass}>
            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Categoría</label>
          <input name="category" required list="category-suggestions" placeholder="Ej. Mercado" className={fieldClass} />
          <datalist id="category-suggestions">
            {categorySuggestions.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Descripción (opcional)</label>
          <input name="description" placeholder="Ej. Supermercado Éxito" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Monto (COP)</label>
          <input name="amount" type="number" step="any" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Fecha</label>
          <input name="transactionDate" type="date" required defaultValue={today} className={fieldClass} />
        </div>
        <div className="col-span-2 sm:col-span-5">
          <Button type="submit" size="sm" variant="outline">
            Guardar movimiento
          </Button>
        </div>
      </form>
    </Card>
  );
}
