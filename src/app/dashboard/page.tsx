import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { HistoricalChart } from "@/components/dashboard/historical-chart";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { GoalProgressItem } from "@/components/dashboard/goal-progress-item";
import { DbSetupNotice } from "@/components/dashboard/db-setup-notice";
import { isDbConfigured } from "@/lib/db/client";
import { listBrokerAccounts } from "@/lib/data/portfolio";
import { listGoals } from "@/lib/data/goals";
import { listCashTransactions } from "@/lib/data/finances";
import { holdingMarketValueCOP, holdingCostValueCOP } from "@/lib/portfolio-math";
import { illustrativeTrend } from "@/lib/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ASSET_CLASSES, type Kpi } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isDbConfigured) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-medium">Resumen</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tu patrimonio, de un vistazo. Sin ruido, solo lo que necesitas para decidir.
          </p>
        </div>
        <DbSetupNotice />
      </div>
    );
  }

  const [accounts, goals, transactions] = await Promise.all([
    listBrokerAccounts(),
    listGoals(),
    listCashTransactions(),
  ]);
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

  const efectivoAcumulado = transactions.reduce(
    (sum, t) => sum + (t.kind === "ingreso" ? t.amount : -t.amount),
    0,
  );
  const patrimonioNetoTotal = patrimonio + efectivoAcumulado;

  const currentMonthPrefix = new Date().toISOString().slice(0, 7);
  const thisMonth = transactions.filter((t) => t.transactionDate.startsWith(currentMonthPrefix));
  const ingresosMes = thisMonth.filter((t) => t.kind === "ingreso").reduce((sum, t) => sum + t.amount, 0);
  const gastosMes = thisMonth.filter((t) => t.kind === "gasto").reduce((sum, t) => sum + t.amount, 0);

  const kpis: Kpi[] = [
    {
      id: "patrimonio",
      label: "Patrimonio en inversiones",
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

      <Card className="p-6">
        <p className="text-xs font-medium text-muted-foreground">Patrimonio neto total</p>
        <p className="mt-1 font-display text-3xl text-gold">{formatCurrency(patrimonioNetoTotal, "COP")}</p>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <span className="text-muted-foreground">
            Inversiones: <span className="font-medium text-foreground">{formatCurrency(patrimonio, "COP")}</span>
          </span>
          <span className="text-muted-foreground">
            Efectivo personal acumulado:{" "}
            <span className="font-medium text-foreground">{formatCurrency(efectivoAcumulado, "COP")}</span>
          </span>
        </div>
      </Card>

      {holdings.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">
          Todavía no tienes posiciones registradas.{" "}
          <Link href="/dashboard/portafolio" className="text-gold hover:underline">
            Agrega tu primera cuenta y posición
          </Link>{" "}
          para ver tu resumen aquí.
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
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
            {allocationByType.length > 0 ? (
              <AllocationChart data={allocationByType} />
            ) : (
              <p className="text-sm text-muted-foreground">Sin posiciones todavía.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Finanzas del mes</CardTitle>
            <Link
              href="/dashboard/finanzas"
              className="flex items-center gap-1 text-xs text-gold hover:underline"
            >
              Ver detalle <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ingresos</span>
              <span className="font-medium text-success">{formatCurrency(ingresosMes, "COP")}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Gastos</span>
              <span className="font-medium text-danger">{formatCurrency(gastosMes, "COP")}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">Flujo neto</span>
              <span className={`font-medium ${ingresosMes - gastosMes >= 0 ? "text-success" : "text-danger"}`}>
                {formatCurrency(ingresosMes - gastosMes, "COP")}
              </span>
            </div>
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
