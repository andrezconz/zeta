"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import type { Kpi } from "@/lib/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const positive = kpi.change >= 0;
  const displayValue =
    kpi.format === "currency" ? formatCurrency(kpi.value, "COP") : formatPercent(kpi.value);

  return (
    <Card className="overflow-hidden">
      <div className="p-5 pb-0">
        <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
        <p className="mt-2 font-display text-2xl text-foreground">{displayValue}</p>
        <p className={cn("mt-1 text-xs", positive ? "text-success" : "text-danger")}>
          {formatPercent(kpi.change)} este mes
        </p>
      </div>
      <div className="h-14 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={kpi.series} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`gradient-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-gold)"
              strokeWidth={1.5}
              fill={`url(#gradient-${kpi.id})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
