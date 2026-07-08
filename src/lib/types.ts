export type AssetClass = "ETF" | "Acciones" | "Bonos" | "Fondos" | "Crypto" | "Cash";

export const ASSET_CLASSES: AssetClass[] = ["ETF", "Acciones", "Bonos", "Fondos", "Crypto", "Cash"];

export interface Holding {
  id: string;
  brokerAccountId: string;
  asset: string;
  ticker: string;
  type: AssetClass;
  broker: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  currency: "COP" | "USD";
  dividendYield: number;
}

export interface BrokerAccount {
  id: string;
  broker: string;
  label: string | null;
  holdings: Holding[];
}

export interface KpiSeriesPoint {
  label: string;
  value: number;
}

export interface Kpi {
  id: string;
  label: string;
  value: number;
  format: "currency" | "percent";
  /** Cambio vs. el período anterior. Omitir si no hay un histórico real con qué compararlo. */
  change?: number;
  /** Serie para la mini-gráfica. Puede ser ilustrativa si aún no existe un histórico real. */
  series: KpiSeriesPoint[];
}

export interface RiskMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  tone: "neutral" | "good" | "warning";
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyRequired: number;
}

export interface HistoricalPoint {
  date: string;
  portfolio: number;
  sp500: number;
  msciWorld: number;
}
