import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ComingSoon({
  icon: Icon,
  title,
  description,
  bullets,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <Card className="flex flex-col items-center gap-4 px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <Badge variant="gold">Próximamente</Badge>
        <p className="max-w-md text-sm text-muted-foreground">
          Este módulo está planeado para una próxima entrega. Estas son las
          capacidades que incluirá:
        </p>
        <ul className="mt-2 space-y-1.5 text-left text-sm text-muted-foreground">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
              {b}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
