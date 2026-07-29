import "server-only";
import { db } from "@/lib/db/client";
import type { CashTransaction } from "@/lib/types";

export async function listCashTransactions(): Promise<CashTransaction[]> {
  const result = await db().execute("select * from cash_transactions order by transaction_date desc");
  return result.rows.map((row) => ({
    id: String(row.id),
    kind: row.kind as CashTransaction["kind"],
    category: String(row.category),
    description: row.description ? String(row.description) : null,
    amount: Number(row.amount),
    transactionDate: String(row.transaction_date),
  }));
}
