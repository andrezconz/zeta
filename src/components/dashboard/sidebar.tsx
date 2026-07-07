"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { FortisMark } from "@/components/fortis-mark";
import { navItems } from "@/lib/nav";
import { useUiStore } from "@/store/ui-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const isDark = mounted ? theme === "dark" : true;

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        className={cn(
          "sticky top-0 flex h-screen shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200",
          sidebarCollapsed ? "w-[76px]" : "w-64",
        )}
      >
        <div className="flex h-16 items-center gap-2 px-5">
          <FortisMark className="h-6 w-6 shrink-0" />
          {!sidebarCollapsed && (
            <span className="font-display text-sm font-medium tracking-wide">Fortis</span>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
            const link = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-gold/10 text-gold"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                  sidebarCollapsed && "justify-center px-0",
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );

            if (sidebarCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }
            return <div key={item.href}>{link}</div>;
          })}
        </nav>

        <div className="space-y-1 border-t border-border px-3 py-3">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
              sidebarCollapsed && "justify-center px-0",
            )}
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
            ) : (
              <Moon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
            )}
            {!sidebarCollapsed && <span>Modo {isDark ? "claro" : "oscuro"}</span>}
          </button>
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
              sidebarCollapsed && "justify-center px-0",
            )}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
            ) : (
              <PanelLeftClose className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
            )}
            {!sidebarCollapsed && <span>Contraer</span>}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
