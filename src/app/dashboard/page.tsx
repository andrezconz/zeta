import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { HistoricalChart } from "@/components/dashboard/historical-chart";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { GoalProgressItem } from "@/components/dashboard/goal-progress-item";
import { SupabaseSetupNotice } from "@/components/dashboard/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { listBrokerAccounts } from "@/lib/data/portfolio";
import { listGoals } from "@/lib/data/goals";
import { holdingMarketValueCOP, holdingCostValueCOP } from "@/lib/portfolio-math";
import { illustrativeTrend } from "@/lib/data/mock-data";
import { ASSET_CLASSES, type Kpi } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-medium">Resumen</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tu patrimonio, de un vistazo. Sin ruido, solo lo que necesitas para decidir.
          </p>
        </div>
        <SupabaseSetupNotice />
      </div>
    );
  }

  const [accounts, goals] = await Promise.all([listBrokerAccounts(), listGoals()]);
  const holdings = accounts.flatMap((a) => a.holdings);

  const patrimonio = holdings.reduce((sum, h) => sum + holdingMarketValueCOP(h), 0);
  const costo = holdings.reduce((sum, h) => sum + holdingCostValueCOP(h), 0);
  const rentabilidadTotalPct = costo > 0 ? ((patrimonio - costo) / costo) * 100 : 0;
  const dividendosProyectados = holdings.reduce(
    (sum, h) => sum + holdingMarketValueCOP(h) * (h.dividendYield / 100),
    0,
  );
  const cashDisponible = holdings
    .filter((h) => h.type === "Cash")
    .reduce((sum, h) => sum + holdingMarketValueCOP(h), 0);

  const kpis: Kpi[] = [
    {
      id: "patrimonio",
      label: "Patrimonio total",
      value: patrimonio,
      format: "currency",
      series: illustrativeTrend(patrimonio),
    },
    {
      id: "rentabilidad-total",
      label: "Rentabilidad total",
      value: rentabilidadTotalPct,
      format: "percent",
      series: illustrativeTrend(Math.max(rentabilidadTotalPct, 1), 0.15),
    },
    {
      id: "dividendos",
      label: "Dividendos proyectados (anual)",
      value: dividendosProyectados,
      format: "currency",
      series: illustrativeTrend(Math.max(dividendosProyectados, 1)),
    },
    {
      id: "cash",
      label: "Cash disponible",
      value: cashDisponible,
      format: "currency",
      series: illustrativeTrend(Math.max(cashDisponible, 1)),
    },
  ];

  const allocationByType = ASSET_CLASSES.map((type) => ({
    name: type,
    value: holdings.filter((h) => h.type === type).reduce((sum, h) => sum + holdingMarketValueCOP(h), 0),
  })).filter((d) => d.value > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Resumen</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tu patrimonio, de un vistazo. Sin ruido, solo lo que necesitas para decidir.
        </p>
      </div>

      {holdings.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">
          Todavía no tienes posiciones registradas.{" "}
          <Link href="/dashboard/portafolio" className="text-gold hover:underline">
            Agrega tu primera cuenta y posición
          </Link>{" "}
          para ver tu resumen aquí.
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Evolución del patrimonio vs. benchmarks</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Curva ilustrativa: todavía no llevamos un histórico diario real de tu patrimonio.
                </p>
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
        </>
      )}

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Objetivos activos</CardTitle>
          <Link href="/dashboard/metas" className="flex items-center gap-1 text-xs text-gold hover:underline">
            Ver todas las metas <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {goals.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Todavía no tienes metas.{" "}
              <Link href="/dashboard/metas" className="text-gold hover:underline">
                Agrega la primera
              </Link>
              .
            </p>
          ) : (
            goals.slice(0, 4).map((goal) => <GoalProgressItem key={goal.id} goal={goal} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}
