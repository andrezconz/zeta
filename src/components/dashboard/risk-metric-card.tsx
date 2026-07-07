import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { RiskMetric } from "@/lib/types";

const toneClass: Record<RiskMetric["tone"], string> = {
  good: "text-success",
  warning: "text-danger",
  neutral: "text-foreground",
};

export function RiskMetricCard({ metric }: { metric: RiskMetric }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" aria-label={`Qué significa ${metric.label}`}>
                <Info className="h-3.5 w-3.5 text-muted-foreground/70 hover:text-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{metric.description}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className={cn("mt-2 font-display text-2xl", toneClass[metric.tone])}>{metric.value}</p>
    </Card>
  );
}
