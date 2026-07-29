import "server-only";
import { db } from "@/lib/db/client";
import type { Goal } from "@/lib/types";

export async function listGoals(): Promise<Goal[]> {
  const result = await db().execute("select * from goals order by target_date asc");
  return result.rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    targetAmount: Number(row.target_amount),
    currentAmount: Number(row.current_amount),
    targetDate: String(row.target_date),
    monthlyRequired: Number(row.monthly_required),
  }));
}
