"use client";

import { Search, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useHasMounted } from "@/lib/use-has-mounted";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

const USER_FULL_NAME = "Andrez Felipe Guerrero Torres";
const USER_FIRST_NAME = "Andrez";
const USER_INITIALS = "AG";

const notifications = [
  { id: 1, text: "Ecopetrol pagó dividendos por $1.240.000", time: "hace 2 h" },
  { id: 2, text: "Tu meta 'Fondo de emergencia' llegó al 100%", time: "hace 1 día" },
  { id: 3, text: "Rebalanceo sugerido: Crypto supera el 8% objetivo", time: "hace 3 días" },
];

export function Header() {
  const mounted = useHasMounted();
  const greetingText = mounted ? greeting() : "Buenos días";

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border px-6">
      <div>
        <p className="text-sm font-medium">{greetingText}, {USER_FIRST_NAME}.</p>
        <p className="text-xs text-muted-foreground">Disciplina hoy. Libertad mañana.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar activos, brokers, metas..."
            className="h-9 w-64 rounded-full border border-border bg-transparent pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/40"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5">
                <span className="text-sm">{n.text}</span>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Avatar>
                <AvatarFallback>{USER_INITIALS}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{USER_FULL_NAME}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
