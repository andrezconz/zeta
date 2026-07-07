import { FileText } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function DocumentosPage() {
  return (
    <ComingSoon
      icon={FileText}
      title="Documentos"
      description="Certificados, extractos y declaraciones, organizados en un solo lugar."
      bullets={[
        "Repositorio de certificados tributarios y extractos por broker.",
        "Búsqueda por año, broker o tipo de documento.",
        "Descarga consolidada para tu declaración de renta.",
      ]}
    />
  );
}
