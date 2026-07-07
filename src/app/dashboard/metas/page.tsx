import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { goals } from "@/lib/data/mock-data";

function monthsUntil(dateStr: string) {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.max(
    (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth()),
    0,
  );
}

export default function MetasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Metas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cada objetivo con su capital requerido, avance y fecha. Sin adivinar.
        </p>
      </div>

      <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-border">
        {goals.map((goal) => {
          const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
          const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);
          const months = monthsUntil(goal.targetDate);
          const complete = pct >= 100;

          return (
            <div key={goal.id} className="relative pl-10">
              <span
                className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium ${
                  complete
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-gold/30 bg-gold/10 text-gold"
                }`}
              >
                {complete ? "✓" : Math.round(pct) + "%"}
              </span>

              <Card className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-medium">{goal.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    Fecha objetivo: {new Date(goal.targetDate).toLocaleDateString("es-CO", { year: "numeric", month: "long" })}
                  </span>
                </div>

                <Progress value={pct} className="mt-4" />

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Valor objetivo</p>
                    <p className="mt-0.5 font-medium">{formatCurrency(goal.targetAmount, "COP")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avance actual</p>
                    <p className="mt-0.5 font-medium">{formatCurrency(goal.currentAmount, "COP")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Capital requerido</p>
                    <p className="mt-0.5 font-medium">{formatCurrency(remaining, "COP")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ahorro mensual sugerido</p>
                    <p className="mt-0.5 font-medium">
                      {goal.monthlyRequired > 0 ? formatCurrency(goal.monthlyRequired, "COP") : "Meta cumplida"}
                    </p>
                  </div>
                </div>

                {!complete && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Proyección: a este ritmo, faltan aproximadamente {months} {months === 1 ? "mes" : "meses"} para alcanzar la meta.
                  </p>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
