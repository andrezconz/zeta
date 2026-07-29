"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/client";

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

  await db().execute({
    sql: `insert into goals (id, name, target_amount, current_amount, target_date, monthly_required)
          values (?, ?, ?, ?, ?, ?)`,
    args: [
      randomUUID(),
      name,
      num(formData, "targetAmount"),
      num(formData, "currentAmount"),
      targetDate,
      num(formData, "monthlyRequired"),
    ],
  });

  revalidatePath("/dashboard", "layout");
}

export async function deleteGoalAction(formData: FormData) {
  const id = str(formData, "id");
  await db().execute({ sql: "delete from goals where id = ?", args: [id] });

  revalidatePath("/dashboard", "layout");
}
