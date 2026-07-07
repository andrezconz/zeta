export type AssetClass = "ETF" | "Acciones" | "Bonos" | "Fondos" | "Crypto" | "Cash";

export type Broker =
  | "Interactive Brokers"
  | "Tyba"
  | "Trii"
  | "Bancolombia"
  | "Fintual"
  | "Nu";

export interface Holding {
  id: string;
  asset: string;
  ticker: string;
  type: AssetClass;
  broker: Broker;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  currency: "COP" | "USD";
  dividendYield: number;
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
  change: number;
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
