import { Bell } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function AlertasPage() {
  return (
    <ComingSoon
      icon={Bell}
      title="Alertas"
      description="Avisos silenciosos, no notificaciones que generan ansiedad."
      bullets={[
        "Alertas de concentración cuando un activo supera tu límite objetivo.",
        "Aviso de rebalanceo cuando tu asignación se desvía del plan.",
        "Recordatorios de revisión periódica de tu plan financiero.",
      ]}
    />
  );
}
