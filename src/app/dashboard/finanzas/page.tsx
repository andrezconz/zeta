import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { AddTransactionForm } from "@/components/dashboard/finances/add-transaction-form";
import { TransactionsTable } from "@/components/dashboard/finances/transactions-table";
import { DbSetupNotice } from "@/components/dashboard/db-setup-notice";
import { isDbConfigured } from "@/lib/db/client";
import { listCashTransactions } from "@/lib/data/finances";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function FinanzasPage() {
  if (!isDbConfigured) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-medium">Finanzas personales</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ingresos y gastos del día a día: servicios, mercado, compras, pagos extraordinarios y más.
          </p>
        </div>
        <DbSetupNotice />
      </div>
    );
  }

  const transactions = await listCashTransactions();

  const currentMonthPrefix = new Date().toISOString().slice(0, 7);
  const thisMonth = transactions.filter((t) => t.transactionDate.startsWith(currentMonthPrefix));

  const ingresosMes = thisMonth
    .filter((t) => t.kind === "ingreso")
    .reduce((sum, t) => sum + t.amount, 0);
  const gastosMes = thisMonth.filter((t) => t.kind === "gasto").reduce((sum, t) => sum + t.amount, 0);
  const flujoNeto = ingresosMes - gastosMes;

  const gastosPorCategoria = Object.entries(
    thisMonth
      .filter((t) => t.kind === "gasto")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + t.amount;
        return acc;
      }, {}),
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Finanzas personales</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ingresos y gastos del día a día: servicios, mercado, compras, pagos extraordinarios y más.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Ingresos del mes</p>
          <p className="mt-1 font-display text-2xl text-success">{formatCurrency(ingresosMes, "COP")}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Gastos del mes</p>
          <p className="mt-1 font-display text-2xl text-danger">{formatCurrency(gastosMes, "COP")}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Flujo neto del mes</p>
          <p className={`mt-1 font-display text-2xl ${flujoNeto >= 0 ? "text-success" : "text-danger"}`}>
            {formatCurrency(flujoNeto, "COP")}
          </p>
        </Card>
      </div>

      <AddTransactionForm />

      {gastosPorCategoria.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Gastos del mes por categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart data={gastosPorCategoria} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Movimientos</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Todavía no has registrado movimientos. Agrega el primero arriba.
            </p>
          ) : (
            <TransactionsTable transactions={transactions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
