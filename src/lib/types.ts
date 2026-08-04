export type AssetClass = "ETF" | "Acciones" | "Bonos" | "Fondos" | "Crypto" | "Cash" | "CDT";

export const ASSET_CLASSES: AssetClass[] = ["ETF", "Acciones", "Bonos", "Fondos", "Crypto", "Cash", "CDT"];

/** Tipos que se valoran por cantidad × precio (acciones, ETF, cripto, etc.). */
export const PRICED_ASSET_CLASSES: AssetClass[] = ["ETF", "Acciones", "Bonos", "Crypto", "Cash"];

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
  /** Monto invertido, usado por Fondos y CDT en vez de cantidad × precio. */
  investedAmount: number | null;
  /** Rentabilidad informada por el fondo para cada periodo (%). */
  monthlyReturn: number | null;
  semesterReturn: number | null;
  annualReturn: number | null;
  /** Tasa efectiva anual del CDT (%). El plazo se deriva de startDate → closeDate. */
  termDays: number | null;
  effectiveAnnualRate: number | null;
  /** Fecha de apertura/inversión (Fondos y CDT). */
  startDate: string | null;
  /** Fecha de cierre/vencimiento del CDT. */
  closeDate: string | null;
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

export type CashTransactionKind = "ingreso" | "gasto";

export interface CashTransaction {
  id: string;
  kind: CashTransactionKind;
  category: string;
  description: string | null;
  amount: number;
  transactionDate: string;
}

export const EXPENSE_CATEGORY_SUGGESTIONS = [
  "Servicios",
  "Mercado",
  "Compras",
  "Pagos extraordinarios",
  "Transporte",
  "Salud",
  "Entretenimiento",
  "Educación",
  "Arriendo",
  "Otro",
];

export const INCOME_CATEGORY_SUGGESTIONS = ["Salario", "Freelance", "Arriendo recibido", "Rendimientos", "Otro"];
