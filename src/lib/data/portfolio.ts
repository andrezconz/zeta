import "server-only";
import { db } from "@/lib/db/client";
import type { BrokerAccount, Holding } from "@/lib/types";

function nullableNumber(value: unknown): number | null {
  return value === null || value === undefined ? null : Number(value);
}

export async function listBrokerAccounts(): Promise<BrokerAccount[]> {
  const client = db();
  const [accountsResult, holdingsResult] = await Promise.all([
    client.execute("select id, broker, label from broker_accounts order by created_at asc"),
    client.execute("select * from holdings order by updated_at asc"),
  ]);

  const holdingsByAccount = new Map<string, Holding[]>();
  for (const row of holdingsResult.rows) {
    const brokerAccountId = String(row.broker_account_id);
    const list = holdingsByAccount.get(brokerAccountId) ?? [];
    list.push({
      id: String(row.id),
      brokerAccountId,
      asset: String(row.asset),
      ticker: String(row.ticker),
      type: row.type as Holding["type"],
      broker: "",
      quantity: Number(row.quantity),
      avgCost: Number(row.avg_cost),
      currentPrice: Number(row.current_price),
      currency: row.currency as Holding["currency"],
      dividendYield: Number(row.dividend_yield),
      investedAmount: nullableNumber(row.invested_amount),
      monthlyReturn: nullableNumber(row.monthly_return),
      semesterReturn: nullableNumber(row.semester_return),
      annualReturn: nullableNumber(row.annual_return),
      termDays: nullableNumber(row.term_days),
      effectiveAnnualRate: nullableNumber(row.effective_annual_rate),
      startDate: row.start_date ? String(row.start_date) : null,
    });
    holdingsByAccount.set(brokerAccountId, list);
  }

  return accountsResult.rows.map((row) => {
    const id = String(row.id);
    const broker = String(row.broker);
    const holdings = (holdingsByAccount.get(id) ?? []).map((h) => ({ ...h, broker }));
    return {
      id,
      broker,
      label: row.label ? String(row.label) : null,
      holdings,
    };
  });
}

export async function listHoldingsFlat(): Promise<Holding[]> {
  const accounts = await listBrokerAccounts();
  return accounts.flatMap((a) => a.holdings);
}
