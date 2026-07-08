"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
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

  const supabase = supabaseAdmin();
  const { error } = await supabase
    .from("broker_accounts")
    .insert({ broker, label: label || null });
  if (error) throw new Error(`No se pudo crear la cuenta: ${error.message}`);

  revalidateDashboard();
}

export async function deleteBrokerAccountAction(formData: FormData) {
  const id = str(formData, "id");
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("broker_accounts").delete().eq("id", id);
  if (error) throw new Error(`No se pudo eliminar la cuenta: ${error.message}`);

  revalidateDashboard();
}

export async function createHoldingAction(formData: FormData) {
  const brokerAccountId = str(formData, "brokerAccountId");
  const type = str(formData, "type") as AssetClass;
  if (!ASSET_CLASSES.includes(type)) throw new Error("Tipo de activo inválido.");
  const currency = str(formData, "currency");
  if (currency !== "COP" && currency !== "USD") throw new Error("Moneda inválida.");

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("holdings").insert({
    broker_account_id: brokerAccountId,
    asset: str(formData, "asset"),
    ticker: str(formData, "ticker").toUpperCase(),
    type,
    currency,
    quantity: num(formData, "quantity"),
    avg_cost: num(formData, "avgCost"),
    current_price: num(formData, "currentPrice"),
    dividend_yield: num(formData, "dividendYield"),
  });
  if (error) throw new Error(`No se pudo agregar la posición: ${error.message}`);

  revalidateDashboard();
}

export async function deleteHoldingAction(formData: FormData) {
  const id = str(formData, "id");
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("holdings").delete().eq("id", id);
  if (error) throw new Error(`No se pudo eliminar la posición: ${error.message}`);

  revalidateDashboard();
}
