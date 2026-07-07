import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { PortfolioTable } from "@/components/dashboard/portfolio-table";
import { holdings, holdingMarketValueCOP, brokerLabels } from "@/lib/data/mock-data";
import type { AssetClass } from "@/lib/types";

const assetClasses: AssetClass[] = ["ETF", "Acciones", "Bonos", "Fondos", "Crypto", "Cash"];

const byType = assetClasses
  .map((type) => ({
    name: type,
    value: holdings.filter((h) => h.type === type).reduce((sum, h) => sum + holdingMarketValueCOP(h), 0),
  }))
  .filter((d) => d.value > 0);

const brokers = Array.from(new Set(holdings.map((h) => h.broker)));
const byBroker = brokers
  .map((broker) => ({
    name: brokerLabels[broker] ?? broker,
    value: holdings.filter((h) => h.broker === broker).reduce((sum, h) => sum + holdingMarketValueCOP(h), 0),
  }))
  .filter((d) => d.value > 0);

export default function PortafolioPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Portafolio</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Todas tus posiciones, en un solo lugar, con su peso real dentro del patrimonio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Asignación por tipo de activo</CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart data={byType} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribución por broker</CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart data={byBroker} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <PortfolioTable />
        </CardContent>
      </Card>
    </div>
  );
}
