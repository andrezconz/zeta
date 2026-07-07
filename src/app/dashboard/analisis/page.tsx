import { FlaskConical } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function AnalisisPage() {
  return (
    <ComingSoon
      icon={FlaskConical}
      title="Análisis"
      description="Tu laboratorio para comparar tu portafolio contra el mercado en el tiempo."
      bullets={[
        "Comparación histórica personalizable contra S&P 500, NASDAQ, MSCI World e IPC.",
        "Selección de rangos de tiempo y activos específicos para el backtest.",
        "Simulación de escenarios: qué hubiera pasado con otra asignación.",
      ]}
    />
  );
}
