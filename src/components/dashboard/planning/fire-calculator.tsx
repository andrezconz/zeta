"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { inputClass, labelClass } from "./field-styles";
import { kpis } from "@/lib/data/mock-data";

const patrimonioActual = kpis.find((k) => k.id === "patrimonio")?.value ?? 0;

export function FireCalculator() {
  const [gastoMensual, setGastoMensual] = useState(8_000_000);
  const [tasaRetiro, setTasaRetiro] = useState(4);
  const [aporteMensual, setAporteMensual] = useState(4_000_000);
  const [retorno, setRetorno] = useState(7);

  const { fireNumber, yearsToFire, monthsToFire } = useMemo(() => {
    const fireNumber = (gastoMensual * 12) / (tasaRetiro / 100);
    const tasaMensual = retorno / 100 / 12;
    let value = patrimonioActual;
    let months = 0;
    const maxMonths = 720;
    while (value < fireNumber && months < maxMonths) {
      value = value * (1 + tasaMensual) + aporteMensual;
      months += 1;
    }
    return {
      fireNumber,
      yearsToFire: Math.floor(months / 12),
      monthsToFire: months % 12,
      reached: value >= fireNumber && months < maxMonths,
    };
  }, [gastoMensual, tasaRetiro, aporteMensual, retorno]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <label className={labelClass}>Gasto mensual deseado en libertad financiera (COP)</label>
        <input
          type="number"
          value={gastoMensual}
          onChange={(e) => setGastoMensual(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Tasa de retiro segura (%)</label>
        <input
          type="number"
          step="0.1"
          value={tasaRetiro}
          onChange={(e) => setTasaRetiro(Number(e.target.value) || 0.1)}
          className={inputClass}
        />
        <label className={labelClass}>Aporte mensual actual (COP)</label>
        <input
          type="number"
          value={aporteMensual}
          onChange={(e) => setAporteMensual(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Rendimiento anual esperado (%)</label>
        <input
          type="number"
          step="0.1"
          value={retorno}
          onChange={(e) => setRetorno(Number(e.target.value) || 0)}
          className={inputClass}
        />
      </div>

      <div className="space-y-3">
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Tu número FIRE</p>
          <p className="mt-1 font-display text-2xl text-gold">{formatCurrency(fireNumber, "COP")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Patrimonio necesario para vivir de tus inversiones con la tasa de retiro elegida.
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Patrimonio actual</p>
          <p className="mt-1 font-display text-lg">{formatCurrency(patrimonioActual, "COP")}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Tiempo estimado para alcanzar la independencia financiera</p>
          <p className="mt-1 font-display text-2xl">
            {yearsToFire} años {monthsToFire > 0 && `y ${monthsToFire} ${monthsToFire === 1 ? "mes" : "meses"}`}
          </p>
        </Card>
      </div>
    </div>
  );
}
