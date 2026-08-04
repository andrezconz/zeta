import type { Goal } from "@/lib/types";

export interface ProjectionPoint {
  year: string;
  necesario: number | null;
  sp500: number;
  msciWorld: number;
}

/** Tasas anuales promedio históricas de referencia (aproximadas), usadas
 * solo para comparar contra la trayectoria que necesitas para tu meta. */
const SP500_ANNUAL_RATE = 0.1;
const MSCI_WORLD_ANNUAL_RATE = 0.08;

/**
 * Construye la trayectoria año a año desde el patrimonio actual hasta la
 * meta seleccionada (compuesta, sin asumir aportes adicionales), junto con
 * dos referencias de cuánto valdría ese mismo patrimonio si solo creciera
 * a las tasas históricas de S&P 500 y MSCI World.
 */
export function buildWealthProjection(currentPatrimonio: number, goal: Goal | null): ProjectionPoint[] {
  const now = new Date();
  const startYear = now.getFullYear();
  const targetYear = goal ? new Date(goal.targetDate).getFullYear() : startYear + 10;
  const years = Math.max(targetYear - startYear, 1);

  const points: ProjectionPoint[] = [];
  for (let t = 0; t <= years; t++) {
    let necesario: number | null = null;
    if (goal) {
      necesario =
        currentPatrimonio > 0
          ? currentPatrimonio * Math.pow(goal.targetAmount / currentPatrimonio, t / years)
          : (goal.targetAmount / years) * t;
    }
    points.push({
      year: String(startYear + t),
      necesario: necesario !== null ? Math.round(necesario) : null,
      sp500: Math.round(currentPatrimonio * Math.pow(1 + SP500_ANNUAL_RATE, t)),
      msciWorld: Math.round(currentPatrimonio * Math.pow(1 + MSCI_WORLD_ANNUAL_RATE, t)),
    });
  }
  return points;
}
