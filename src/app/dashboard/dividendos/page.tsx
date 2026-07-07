import { Coins } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function DividendosPage() {
  return (
    <ComingSoon
      icon={Coins}
      title="Dividendos"
      description="El flujo de caja pasivo que genera tu portafolio, calendarizado."
      bullets={[
        "Calendario de dividendos esperados por posición.",
        "Historial de dividendos recibidos por año y por activo.",
        "Proyección anual de ingresos por dividendos y yield consolidado.",
      ]}
    />
  );
}
