import type { Holding } from "@/lib/types";

/** Tasa de referencia COP/USD para consolidar posiciones en dólares.
 * Es un valor fijo de demostración: en una integración real vendría de un
 * proveedor de tasas de cambio en vivo (módulo "Mercados", fase 2). */
export const TRM = 4050;

export function holdingMarketValueCOP(h: Holding): number {
  const value = h.quantity * h.currentPrice;
  return h.currency === "USD" ? value * TRM : value;
}

export function holdingCostValueCOP(h: Holding): number {
  const value = h.quantity * h.avgCost;
  return h.currency === "USD" ? value * TRM : value;
}
