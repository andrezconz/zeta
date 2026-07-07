import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { HistoricalChart } from "@/components/dashboard/historical-chart";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { GoalProgressItem } from "@/components/dashboard/goal-progress-item";
import { kpis, goals, holdings, holdingMarketValueCOP } from "@/lib/data/mock-data";
import type { AssetClass } from "@/lib/types";

const assetClasses: AssetClass[] = ["ETF", "Acciones", "Bonos", "Fondos", "Crypto", "Cash"];
const allocationByType = assetClasses
  .map((type) => ({
    name: type,
    value: holdings.filter((h) => h.type === type).reduce((sum, h) => sum + holdingMarketValueCOP(h), 0),
  }))
  .filter((d) => d.value > 0);

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Resumen</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tu patrimonio, de un vistazo. Sin ruido, solo lo que necesitas para decidir.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Evolución del patrimonio vs. benchmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <HistoricalChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Composición por activo</CardTitle>
            <Link
              href="/dashboard/portafolio"
              className="flex items-center gap-1 text-xs text-gold hover:underline"
            >
              Ver portafolio <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <AllocationChart data={allocationByType} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Objetivos activos</CardTitle>
          <Link href="/dashboard/metas" className="flex items-center gap-1 text-xs text-gold hover:underline">
            Ver todas las metas <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {goals.slice(0, 4).map((goal) => (
            <GoalProgressItem key={goal.id} goal={goal} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
