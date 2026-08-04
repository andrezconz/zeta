import type { Holding } from "@/lib/types";

/** Tasa de referencia COP/USD para consolidar posiciones en dólares.
 * Es un valor fijo de demostración: en una integración real vendría de un
 * proveedor de tasas de cambio en vivo (módulo "Mercados", fase 2). */
export const TRM = 4050;

function toCOP(value: number, currency: Holding["currency"]): number {
  return currency === "USD" ? value * TRM : value;
}

function daysBetween(from: Date, to: Date): number {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

/** Valor acumulado de un CDT a la fecha de hoy (o al vencimiento, lo que
 * ocurra primero), compuesto a la tasa efectiva anual informada. */
function cdtAccruedValue(h: Holding): number {
  const invested = h.investedAmount ?? 0;
  const ea = h.effectiveAnnualRate ?? 0;
  const term = h.termDays ?? 0;
  const elapsed = h.startDate ? daysBetween(new Date(h.startDate), new Date()) : 0;
  const days = term > 0 ? Math.min(elapsed, term) : elapsed;
  return invested * Math.pow(1 + ea / 100, days / 365);
}

export function holdingCostValueCOP(h: Holding): number {
  if (h.type === "Fondos" || h.type === "CDT") {
    return toCOP(h.investedAmount ?? 0, h.currency);
  }
  return toCOP(h.quantity * h.avgCost, h.currency);
}

export function holdingMarketValueCOP(h: Holding): number {
  if (h.type === "Fondos") {
    const invested = h.investedAmount ?? 0;
    const rate = h.annualReturn ?? 0;
    return toCOP(invested * (1 + rate / 100), h.currency);
  }
  if (h.type === "CDT") {
    return toCOP(cdtAccruedValue(h), h.currency);
  }
  return toCOP(h.quantity * h.currentPrice, h.currency);
}

/** Proyección de un Fondo si se mantiene la rentabilidad informada de cada
 * periodo, en la moneda original del holding (sin convertir a COP). */
export function fundProjections(h: Holding): { month: number; semester: number; year: number } {
  const invested = h.investedAmount ?? 0;
  return {
    month: invested * (1 + (h.monthlyReturn ?? 0) / 100),
    semester: invested * (1 + (h.semesterReturn ?? 0) / 100),
    year: invested * (1 + (h.annualReturn ?? 0) / 100),
  };
}

/** Valor de un CDT al vencimiento, en su moneda original. */
export function cdtMaturityValue(h: Holding): number {
  const invested = h.investedAmount ?? 0;
  const ea = h.effectiveAnnualRate ?? 0;
  const term = h.termDays ?? 0;
  return invested * Math.pow(1 + ea / 100, term / 365);
}
