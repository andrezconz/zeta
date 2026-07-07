import { Globe } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function MercadosPage() {
  return (
    <ComingSoon
      icon={Globe}
      title="Mercados"
      description="Contexto de mercado relevante para tus decisiones, sin ruido de noticias."
      bullets={[
        "Resumen diario de los índices que más afectan tu portafolio.",
        "Precios en vivo de tus tickers, sin necesidad de otra app.",
        "Calendario de eventos económicos relevantes.",
      ]}
    />
  );
}
