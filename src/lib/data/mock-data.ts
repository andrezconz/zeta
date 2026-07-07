import type { Goal, Holding, HistoricalPoint, Kpi, RiskMetric } from "@/lib/types";

export const holdings: Holding[] = [
  {
    id: "h1",
    asset: "Vanguard Total World Stock",
    ticker: "VT",
    type: "ETF",
    broker: "Interactive Brokers",
    quantity: 420,
    avgCost: 98.2,
    currentPrice: 118.6,
    currency: "USD",
    dividendYield: 1.8,
  },
  {
    id: "h2",
    asset: "iShares Core S&P 500",
    ticker: "IVV",
    type: "ETF",
    broker: "Interactive Brokers",
    quantity: 65,
    avgCost: 452.1,
    currentPrice: 601.3,
    currency: "USD",
    dividendYield: 1.2,
  },
  {
    id: "h3",
    asset: "Apple Inc.",
    ticker: "AAPL",
    type: "Acciones",
    broker: "Interactive Brokers",
    quantity: 90,
    avgCost: 168.4,
    currentPrice: 231.8,
    currency: "USD",
    dividendYield: 0.5,
  },
  {
    id: "h4",
    asset: "Microsoft Corp.",
    ticker: "MSFT",
    type: "Acciones",
    broker: "Interactive Brokers",
    quantity: 48,
    avgCost: 312.6,
    currentPrice: 441.2,
    currency: "USD",
    dividendYield: 0.7,
  },
  {
    id: "h5",
    asset: "Ecopetrol S.A.",
    ticker: "ECOPETL",
    type: "Acciones",
    broker: "Trii",
    quantity: 3200,
    avgCost: 2140,
    currentPrice: 1890,
    currency: "COP",
    dividendYield: 9.4,
  },
  {
    id: "h6",
    asset: "Bancolombia Preferencial",
    ticker: "PFBCOLOM",
    type: "Acciones",
    broker: "Bancolombia",
    quantity: 540,
    avgCost: 32800,
    currentPrice: 41250,
    currency: "COP",
    dividendYield: 7.1,
  },
  {
    id: "h7",
    asset: "TES Tasa Fija 2032",
    ticker: "TFIT16",
    type: "Bonos",
    broker: "Bancolombia",
    quantity: 1,
    avgCost: 180000000,
    currentPrice: 189500000,
    currency: "COP",
    dividendYield: 10.8,
  },
  {
    id: "h8",
    asset: "Fintual Riesgo Moderado",
    ticker: "FT-MOD",
    type: "Fondos",
    broker: "Fintual",
    quantity: 12500,
    avgCost: 1080,
    currentPrice: 1194,
    currency: "COP",
    dividendYield: 0,
  },
  {
    id: "h9",
    asset: "Fondo Nu Rendidor",
    ticker: "NU-CASH",
    type: "Cash",
    broker: "Nu",
    quantity: 1,
    avgCost: 14200000,
    currentPrice: 14750000,
    currency: "COP",
    dividendYield: 11.2,
  },
  {
    id: "h10",
    asset: "Bitcoin",
    ticker: "BTC",
    type: "Crypto",
    broker: "Tyba",
    quantity: 0.085,
    avgCost: 265000000,
    currentPrice: 402000000,
    currency: "COP",
    dividendYield: 0,
  },
  {
    id: "h11",
    asset: "Tyba Portafolio Agresivo",
    ticker: "TY-AGR",
    type: "Fondos",
    broker: "Tyba",
    quantity: 8200,
    avgCost: 940,
    currentPrice: 1021,
    currency: "COP",
    dividendYield: 0,
  },
  {
    id: "h12",
    asset: "Efectivo disponible",
    ticker: "CASH",
    type: "Cash",
    broker: "Bancolombia",
    quantity: 1,
    avgCost: 22000000,
    currentPrice: 22000000,
    currency: "COP",
    dividendYield: 0,
  },
];

const TRM = 4050;

export function holdingMarketValueCOP(h: Holding): number {
  const value = h.quantity * h.currentPrice;
  return h.currency === "USD" ? value * TRM : value;
}

export function holdingCostValueCOP(h: Holding): number {
  const value = h.quantity * h.avgCost;
  return h.currency === "USD" ? value * TRM : value;
}

const monthLabels = [
  "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul",
];

function buildSeries(base: number, growthPerStep: number, volatility: number[]): { label: string; value: number }[] {
  let value = base;
  return monthLabels.map((label, i) => {
    value = value * (1 + growthPerStep) + volatility[i % volatility.length];
    return { label, value: Math.round(value) };
  });
}

const totalPatrimonio = holdings.reduce((sum, h) => sum + holdingMarketValueCOP(h), 0);
const totalCosto = holdings.reduce((sum, h) => sum + holdingCostValueCOP(h), 0);
const rentabilidadTotalPct = ((totalPatrimonio - totalCosto) / totalCosto) * 100;

export const kpis: Kpi[] = [
  {
    id: "patrimonio",
    label: "Patrimonio total",
    value: totalPatrimonio,
    format: "currency",
    change: 2.4,
    series: buildSeries(totalPatrimonio * 0.82, 0.016, [0.004, -0.002, 0.006, 0.001, -0.003, 0.005]).map(
      (p) => ({ ...p, value: p.value }),
    ),
  },
  {
    id: "rentabilidad-total",
    label: "Rentabilidad total",
    value: rentabilidadTotalPct,
    format: "percent",
    change: 1.1,
    series: buildSeries(18, 0.012, [0.3, -0.15, 0.4, 0.1, -0.2, 0.35]),
  },
  {
    id: "rentabilidad-ytd",
    label: "Rentabilidad YTD",
    value: 12.8,
    format: "percent",
    change: -0.6,
    series: buildSeries(6, 0.03, [0.4, -0.3, 0.5, 0.2, -0.4, 0.3]),
  },
  {
    id: "dividendos",
    label: "Dividendos (12m)",
    value: 8_420_000,
    format: "currency",
    change: 4.2,
    series: buildSeries(6_200_000, 0.02, [80000, -20000, 120000, 40000, -30000, 90000]),
  },
  {
    id: "cash",
    label: "Cash disponible",
    value: 36_750_000,
    format: "currency",
    change: -3.1,
    series: buildSeries(40_000_000, -0.006, [200000, -400000, 100000, -150000, 250000, -100000]),
  },
];

export const riskMetrics: RiskMetric[] = [
  {
    id: "volatilidad",
    label: "Volatilidad anualizada",
    value: "13.4%",
    description: "Dispersión histórica de los retornos mensuales de tu portafolio, anualizada. Menor volatilidad implica un recorrido más predecible.",
    tone: "good",
  },
  {
    id: "sharpe",
    label: "Sharpe Ratio",
    value: "1.28",
    description: "Retorno obtenido por unidad de riesgo asumido, sobre la tasa libre de riesgo. Por encima de 1 se considera saludable.",
    tone: "good",
  },
  {
    id: "sortino",
    label: "Sortino Ratio",
    value: "1.71",
    description: "Similar al Sharpe, pero solo penaliza la volatilidad negativa (caídas), no toda la dispersión.",
    tone: "good",
  },
  {
    id: "drawdown",
    label: "Máximo drawdown",
    value: "-18.6%",
    description: "La mayor caída observada desde un máximo histórico hasta el mínimo posterior. Mide el peor escenario vivido.",
    tone: "warning",
  },
  {
    id: "beta",
    label: "Beta vs. S&P 500",
    value: "0.87",
    description: "Sensibilidad de tu portafolio frente a los movimientos del mercado. Menor a 1 implica menor riesgo sistemático relativo.",
    tone: "neutral",
  },
  {
    id: "alpha",
    label: "Alpha anualizado",
    value: "+2.1%",
    description: "Retorno adicional obtenido frente al esperado según tu beta y el mercado de referencia.",
    tone: "good",
  },
  {
    id: "correlacion",
    label: "Correlación con S&P 500",
    value: "0.79",
    description: "Qué tanto se mueve tu portafolio en la misma dirección que el mercado estadounidense.",
    tone: "neutral",
  },
  {
    id: "diversificacion",
    label: "Índice de diversificación",
    value: "7.2 / 10",
    description: "Combina número de posiciones, concentración por activo y correlación entre ellos.",
    tone: "good",
  },
  {
    id: "var",
    label: "VaR (95%, 1 mes)",
    value: "-6.8%",
    description: "Con 95% de confianza, no esperarías perder más de este porcentaje de tu portafolio en un mes.",
    tone: "warning",
  },
];

export const goals: Goal[] = [
  {
    id: "g1",
    name: "Fondo de libertad financiera",
    targetAmount: 1_800_000_000,
    currentAmount: 612_000_000,
    targetDate: "2038-01-01",
    monthlyRequired: 4_250_000,
  },
  {
    id: "g2",
    name: "Cuota inicial apartamento",
    targetAmount: 220_000_000,
    currentAmount: 96_000_000,
    targetDate: "2028-06-01",
    monthlyRequired: 3_600_000,
  },
  {
    id: "g3",
    name: "Educación de los hijos",
    targetAmount: 340_000_000,
    currentAmount: 58_000_000,
    targetDate: "2033-01-01",
    monthlyRequired: 2_100_000,
  },
  {
    id: "g4",
    name: "Fondo de emergencia (6 meses)",
    targetAmount: 42_000_000,
    currentAmount: 42_000_000,
    targetDate: "2025-01-01",
    monthlyRequired: 0,
  },
];

export const historical: HistoricalPoint[] = (() => {
  const points: HistoricalPoint[] = [];
  let p = 100;
  let sp = 100;
  let msci = 100;
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
  const portfolioGrowth = [0.14, 0.19, -0.09, 0.16, 0.15, 0.11];
  const spGrowth = [0.16, 0.27, -0.19, 0.24, 0.23, 0.09];
  const msciGrowth = [0.14, 0.2, -0.18, 0.2, 0.17, 0.08];
  years.forEach((year, i) => {
    p *= 1 + portfolioGrowth[i];
    sp *= 1 + spGrowth[i];
    msci *= 1 + msciGrowth[i];
    points.push({ date: year, portfolio: Math.round(p), sp500: Math.round(sp), msciWorld: Math.round(msci) });
  });
  return points;
})();

export const brokerLabels: Record<string, string> = {
  "Interactive Brokers": "Interactive Brokers",
  Tyba: "Tyba",
  Trii: "Trii",
  Bancolombia: "Bancolombia",
  Fintual: "Fintual",
  Nu: "Nu",
};
