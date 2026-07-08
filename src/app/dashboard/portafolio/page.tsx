import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { PortfolioTable } from "@/components/dashboard/portfolio-table";
import { AddBrokerAccountForm } from "@/components/dashboard/portfolio/add-broker-account-form";
import { AddHoldingForm } from "@/components/dashboard/portfolio/add-holding-form";
import { SupabaseSetupNotice } from "@/components/dashboard/supabase-setup-notice";
import { deleteBrokerAccountAction } from "@/lib/actions/portfolio-actions";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { listBrokerAccounts } from "@/lib/data/portfolio";
import { holdingMarketValueCOP } from "@/lib/portfolio-math";
import { ASSET_CLASSES } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PortafolioPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-medium">Portafolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Todas tus posiciones, en un solo lugar, con su peso real dentro del patrimonio.
          </p>
        </div>
        <SupabaseSetupNotice />
      </div>
    );
  }

  const accounts = await listBrokerAccounts();
  const holdings = accounts.flatMap((a) => a.holdings);

  const byType = ASSET_CLASSES.map((type) => ({
    name: type,
    value: holdings.filter((h) => h.type === type).reduce((sum, h) => sum + holdingMarketValueCOP(h), 0),
  })).filter((d) => d.value > 0);

  const byBroker = accounts
    .map((a) => ({
      name: a.label ? `${a.broker} (${a.label})` : a.broker,
      value: a.holdings.reduce((sum, h) => sum + holdingMarketValueCOP(h), 0),
    }))
    .filter((d) => d.value > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Portafolio</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Todas tus posiciones, en un solo lugar, con su peso real dentro del patrimonio.
        </p>
      </div>

      {holdings.length > 0 && (
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
      )}

      <Card>
        <CardHeader>
          <CardTitle>Cuentas de broker</CardTitle>
        </CardHeader>
        <CardContent>
          <AddBrokerAccountForm />
        </CardContent>
      </Card>

      {accounts.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">
          Todavía no has agregado ninguna cuenta. Crea una arriba para empezar a registrar posiciones.
        </Card>
      ) : (
        accounts.map((account) => (
          <Card key={account.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-medium">{account.broker}</h3>
                {account.label && <p className="text-xs text-muted-foreground">{account.label}</p>}
              </div>
              <form action={deleteBrokerAccountAction}>
                <input type="hidden" name="id" value={account.id} />
                <button type="submit" className="text-xs text-muted-foreground hover:text-danger">
                  Eliminar cuenta
                </button>
              </form>
            </div>

            {account.holdings.length > 0 && (
              <div className="mt-4">
                <PortfolioTable holdings={account.holdings} />
              </div>
            )}

            <AddHoldingForm brokerAccountId={account.id} />
          </Card>
        ))
      )}
    </div>
  );
}
