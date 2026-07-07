"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { inputClass, labelClass } from "./field-styles";

export function CompoundInterestCalculator() {
  const [inicial, setInicial] = useState(20_000_000);
  const [mensual, setMensual] = useState(1_500_000);
  const [tasa, setTasa] = useState(8);
  const [anios, setAnios] = useState(20);

  const { series, totalAportado, interesGenerado, valorFinal } = useMemo(() => {
    const meses = Math.round(anios * 12);
    const tasaMensual = tasa / 100 / 12;
    const series: { label: string; value: number }[] = [];
    let value = inicial;
    for (let m = 0; m <= meses; m++) {
      if (m > 0) value = value * (1 + tasaMensual) + mensual;
      if (m % 12 === 0) series.push({ label: `Año ${m / 12}`, value: Math.round(value) });
    }
    const totalAportado = inicial + mensual * meses;
    const valorFinal = value;
    return { series, totalAportado, interesGenerado: valorFinal - totalAportado, valorFinal };
  }, [inicial, mensual, tasa, anios]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <label className={labelClass}>Aporte inicial (COP)</label>
        <input
          type="number"
          value={inicial}
          onChange={(e) => setInicial(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Aporte mensual (COP)</label>
        <input
          type="number"
          value={mensual}
          onChange={(e) => setMensual(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Tasa de rendimiento anual esperada (%)</label>
        <input
          type="number"
          step="0.1"
          value={tasa}
          onChange={(e) => setTasa(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Horizonte (años)</label>
        <input
          type="number"
          value={anios}
          onChange={(e) => setAnios(Number(e.target.value) || 0)}
          className={inputClass}
        />
      </div>

      <div>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Total aportado</p>
            <p className="mt-1 font-display text-lg">{formatCurrency(totalAportado, "COP")}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Interés generado</p>
            <p className="mt-1 font-display text-lg text-success">
              {formatCurrency(Math.max(interesGenerado, 0), "COP")}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Valor final estimado</p>
            <p className="mt-1 font-display text-lg text-gold">{formatCurrency(valorFinal, "COP")}</p>
          </Card>
        </div>
        <div className="mt-4 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="compound-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} interval={Math.max(Math.floor(series.length / 6), 0)} />
              <RechartsTooltip
                formatter={(value) => formatCurrency(Number(value), "COP")}
                contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--color-gold)" strokeWidth={2} fill="url(#compound-gradient)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
