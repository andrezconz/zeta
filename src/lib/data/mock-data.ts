import type { HistoricalPoint, RiskMetric } from "@/lib/types";

const monthLabels = [
  "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul",
];

/** Genera una curva de tendencia ilustrativa (no es un histórico real: aún
 * no existe un registro diario de patrimonio) que termina cerca del valor
 * actual real, solo para dar contexto visual a las mini-gráficas de KPI. */
export function illustrativeTrend(currentValue: number, volatility = 0.02): { label: string; value: number }[] {
  const start = currentValue * 0.86;
  return monthLabels.map((label, i) => {
    const progress = i / (monthLabels.length - 1);
    const wobble = Math.sin(i * 1.7) * volatility * currentValue;
    return { label, value: Math.round(start + (currentValue - start) * progress + wobble) };
  });
}

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
