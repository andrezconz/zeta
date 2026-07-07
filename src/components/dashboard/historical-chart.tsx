"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis } from "recharts";
import { historical } from "@/lib/data/mock-data";

export function HistoricalChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={historical} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <RechartsTooltip
            contentStyle={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          <Line type="monotone" dataKey="portfolio" name="Tu portafolio" stroke="var(--color-gold)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#8a9bb0" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
          <Line type="monotone" dataKey="msciWorld" name="MSCI World" stroke="#5b5f6b" strokeWidth={1.5} dot={false} strokeDasharray="2 3" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-gold" /> Tu portafolio</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#8a9bb0]" /> S&P 500</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#5b5f6b]" /> MSCI World</span>
      </div>
    </div>
  );
}
