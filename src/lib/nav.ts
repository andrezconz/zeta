import {
  LayoutGrid,
  Briefcase,
  ShieldAlert,
  Globe,
  Coins,
  Target,
  Compass,
  FlaskConical,
  FileText,
  Bell,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  phase2?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Resumen", href: "/dashboard", icon: LayoutGrid },
  { label: "Portafolio", href: "/dashboard/portafolio", icon: Briefcase },
  { label: "Riesgo", href: "/dashboard/riesgo", icon: ShieldAlert },
  { label: "Mercados", href: "/dashboard/mercados", icon: Globe, phase2: true },
  { label: "Dividendos", href: "/dashboard/dividendos", icon: Coins, phase2: true },
  { label: "Metas", href: "/dashboard/metas", icon: Target },
  { label: "Planeación", href: "/dashboard/planeacion", icon: Compass },
  { label: "Análisis", href: "/dashboard/analisis", icon: FlaskConical, phase2: true },
  { label: "Documentos", href: "/dashboard/documentos", icon: FileText, phase2: true },
  { label: "Alertas", href: "/dashboard/alertas", icon: Bell, phase2: true },
  { label: "Configuración", href: "/dashboard/configuracion", icon: Settings, phase2: true },
];
