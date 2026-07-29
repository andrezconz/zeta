"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/client";
import { ASSET_CLASSES, type AssetClass } from "@/lib/types";

function revalidateDashboard() {
  revalidatePath("/dashboard", "layout");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

export async function createBrokerAccountAction(formData: FormData) {
  const broker = str(formData, "broker");
  const label = str(formData, "label");
  if (!broker) throw new Error("El nombre del broker es obligatorio.");

  await db().execute({
    sql: "insert into broker_accounts (id, broker, label) values (?, ?, ?)",
    args: [randomUUID(), broker, label || null],
  });

  revalidateDashboard();
}

export async function deleteBrokerAccountAction(formData: FormData) {
  const id = str(formData, "id");
  const client = db();
  await client.execute({ sql: "delete from holdings where broker_account_id = ?", args: [id] });
  await client.execute({ sql: "delete from broker_accounts where id = ?", args: [id] });

  revalidateDashboard();
}

export async function createHoldingAction(formData: FormData) {
  const brokerAccountId = str(formData, "brokerAccountId");
  const type = str(formData, "type") as AssetClass;
  if (!ASSET_CLASSES.includes(type)) throw new Error("Tipo de activo inválido.");
  const currency = str(formData, "currency");
  if (currency !== "COP" && currency !== "USD") throw new Error("Moneda inválida.");

  await db().execute({
    sql: `insert into holdings
            (id, broker_account_id, asset, ticker, type, currency, quantity, avg_cost, current_price, dividend_yield)
          values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      randomUUID(),
      brokerAccountId,
      str(formData, "asset"),
      str(formData, "ticker").toUpperCase(),
      type,
      currency,
      num(formData, "quantity"),
      num(formData, "avgCost"),
      num(formData, "currentPrice"),
      num(formData, "dividendYield"),
    ],
  });

  revalidateDashboard();
}

export async function deleteHoldingAction(formData: FormData) {
  const id = str(formData, "id");
  await db().execute({ sql: "delete from holdings where id = ?", args: [id] });

  revalidateDashboard();
}
