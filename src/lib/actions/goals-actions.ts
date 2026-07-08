"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

export async function createGoalAction(formData: FormData) {
  const name = str(formData, "name");
  const targetDate = str(formData, "targetDate");
  if (!name) throw new Error("El nombre de la meta es obligatorio.");
  if (!targetDate) throw new Error("La fecha objetivo es obligatoria.");

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("goals").insert({
    name,
    target_amount: num(formData, "targetAmount"),
    current_amount: num(formData, "currentAmount"),
    target_date: targetDate,
    monthly_required: num(formData, "monthlyRequired"),
  });
  if (error) throw new Error(`No se pudo crear la meta: ${error.message}`);

  revalidatePath("/dashboard", "layout");
}

export async function deleteGoalAction(formData: FormData) {
  const id = str(formData, "id");
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("goals").delete().eq("id", id);
  if (error) throw new Error(`No se pudo eliminar la meta: ${error.message}`);

  revalidatePath("/dashboard", "layout");
}
