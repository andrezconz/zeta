import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { BrokerAccount, Holding } from "@/lib/types";

interface HoldingDbRow {
  id: string;
  broker_account_id: string;
  asset: string;
  ticker: string;
  type: Holding["type"];
  currency: Holding["currency"];
  quantity: number;
  avg_cost: number;
  current_price: number;
  dividend_yield: number;
}

interface BrokerAccountDbRow {
  id: string;
  broker: string;
  label: string | null;
  holdings: HoldingDbRow[];
}

function mapHolding(row: HoldingDbRow, broker: string): Holding {
  return {
    id: row.id,
    brokerAccountId: row.broker_account_id,
    asset: row.asset,
    ticker: row.ticker,
    type: row.type,
    broker,
    quantity: Number(row.quantity),
    avgCost: Number(row.avg_cost),
    currentPrice: Number(row.current_price),
    currency: row.currency,
    dividendYield: Number(row.dividend_yield),
  };
}

export async function listBrokerAccounts(): Promise<BrokerAccount[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("broker_accounts")
    .select("id, broker, label, holdings(*)")
    .order("created_at", { ascending: true })
    .returns<BrokerAccountDbRow[]>();

  if (error) throw new Error(`No se pudieron cargar las cuentas: ${error.message}`);

  return (data ?? []).map((account) => ({
    id: account.id,
    broker: account.broker,
    label: account.label,
    holdings: (account.holdings ?? []).map((h) => mapHolding(h, account.broker)),
  }));
}

export async function listHoldingsFlat(): Promise<Holding[]> {
  const accounts = await listBrokerAccounts();
  return accounts.flatMap((a) => a.holdings);
}
