import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskMetricCard } from "@/components/dashboard/risk-metric-card";
import { riskMetrics } from "@/lib/data/mock-data";

export default function RiesgoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Riesgo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Antes de preguntar cuánto puedes ganar, entiende cuánto podrías perder.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {riskMetrics.map((metric) => (
          <RiskMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cómo leer este panel</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-sm text-muted-foreground sm:grid-cols-2">
          <p>
            La <strong className="text-foreground">volatilidad</strong> y el{" "}
            <strong className="text-foreground">VaR</strong> te dicen qué tan
            incómodo puede sentirse tu camino, no si vas a perder dinero.
          </p>
          <p>
            <strong className="text-foreground">Sharpe</strong> y{" "}
            <strong className="text-foreground">Sortino</strong> por encima de 1
            indican que estás siendo compensado razonablemente por el riesgo que
            asumes.
          </p>
          <p>
            Un <strong className="text-foreground">beta</strong> menor a 1 y una
            baja <strong className="text-foreground">correlación</strong> con el
            mercado ayudan a amortiguar caídas generalizadas.
          </p>
          <p>
            El <strong className="text-foreground">drawdown</strong> máximo es el
            mejor recordatorio de qué tanto puedes tolerar perder antes de
            abandonar tu plan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
