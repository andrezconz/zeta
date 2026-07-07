import { Settings } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function ConfiguracionPage() {
  return (
    <ComingSoon
      icon={Settings}
      title="Configuración"
      description="Cuentas conectadas, preferencias y seguridad de tu cuenta."
      bullets={[
        "Gestión de brokers y cuentas conectadas.",
        "Preferencias de moneda base, idioma y notificaciones.",
        "Seguridad: contraseña, sesiones activas y autenticación de dos factores.",
      ]}
    />
  );
}
