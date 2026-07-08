import { ASSET_CLASSES } from "@/lib/types";
import { createHoldingAction } from "@/lib/actions/portfolio-actions";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-9 w-full rounded-lg border border-border bg-transparent px-3 text-sm outline-none focus:border-gold/40";
const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

export function AddHoldingForm({ brokerAccountId }: { brokerAccountId: string }) {
  return (
    <details className="mt-4 rounded-xl border border-border p-4">
      <summary className="cursor-pointer text-sm font-medium text-gold">Agregar posición</summary>
      <form action={createHoldingAction} className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <input type="hidden" name="brokerAccountId" value={brokerAccountId} />
        <div>
          <label className={labelClass}>Activo</label>
          <input name="asset" required placeholder="Ej. Apple Inc." className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Ticker</label>
          <input name="ticker" required placeholder="AAPL" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Tipo</label>
          <select name="type" required defaultValue="Acciones" className={fieldClass}>
            {ASSET_CLASSES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Moneda</label>
          <select name="currency" required defaultValue="COP" className={fieldClass}>
            <option value="COP">COP</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Cantidad</label>
          <input name="quantity" type="number" step="any" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Costo promedio</label>
          <input name="avgCost" type="number" step="any" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Precio actual</label>
          <input name="currentPrice" type="number" step="any" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Dividend yield (%)</label>
          <input name="dividendYield" type="number" step="any" defaultValue={0} className={fieldClass} />
        </div>
        <div className="col-span-2 sm:col-span-4">
          <Button type="submit" size="sm" variant="outline">
            Guardar posición
          </Button>
        </div>
      </form>
    </details>
  );
}
