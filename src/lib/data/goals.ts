import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Goal } from "@/lib/types";

interface GoalDbRow {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  monthly_required: number;
}

function mapGoal(row: GoalDbRow): Goal {
  return {
    id: row.id,
    name: row.name,
    targetAmount: Number(row.target_amount),
    currentAmount: Number(row.current_amount),
    targetDate: row.target_date,
    monthlyRequired: Number(row.monthly_required),
  };
}

export async function listGoals(): Promise<Goal[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .order("target_date", { ascending: true })
    .returns<GoalDbRow[]>();

  if (error) throw new Error(`No se pudieron cargar las metas: ${error.message}`);
  return (data ?? []).map(mapGoal);
}
