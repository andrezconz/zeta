"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { ProjectionPoint } from "@/lib/wealth-projection";

export function HistoricalChart({ data, goalName }: { data: ProjectionPoint[]; goalName: string | null }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <RechartsTooltip
            formatter={(value) => formatCurrency(Number(value), "COP")}
            contentStyle={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          {goalName && (
            <Line
              type="monotone"
              dataKey="necesario"
              name={`Necesario para: ${goalName}`}
              stroke="var(--color-gold)"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          )}
          <Line type="monotone" dataKey="sp500" name="A tasa S&P 500 (~10%/año)" stroke="#8a9bb0" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
          <Line type="monotone" dataKey="msciWorld" name="A tasa MSCI World (~8%/año)" stroke="#5b5f6b" strokeWidth={1.5} dot={false} strokeDasharray="2 3" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
        {goalName && (
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-gold" /> Necesario para tu meta
          </span>
        )}
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#8a9bb0]" /> A tasa S&P 500</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#5b5f6b]" /> A tasa MSCI World</span>
      </div>
    </div>
  );
}
