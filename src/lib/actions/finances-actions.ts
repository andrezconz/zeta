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

export async function createCashTransactionAction(formData: FormData) {
  const kind = str(formData, "kind");
  if (kind !== "ingreso" && kind !== "gasto") throw new Error("Tipo inválido.");
  const category = str(formData, "category");
  if (!category) throw new Error("La categoría es obligatoria.");
  const transactionDate = str(formData, "transactionDate");
  if (!transactionDate) throw new Error("La fecha es obligatoria.");

  await db().execute({
    sql: `insert into cash_transactions (id, kind, category, description, amount, transaction_date)
          values (?, ?, ?, ?, ?, ?)`,
    args: [randomUUID(), kind, category, str(formData, "description") || null, num(formData, "amount"), transactionDate],
  });

  revalidatePath("/dashboard", "layout");
}

export async function deleteCashTransactionAction(formData: FormData) {
  const id = str(formData, "id");
  await db().execute({ sql: "delete from cash_transactions where id = ?", args: [id] });

  revalidatePath("/dashboard", "layout");
}
