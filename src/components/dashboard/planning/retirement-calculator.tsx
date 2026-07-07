"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { inputClass, labelClass } from "./field-styles";

export function RetirementCalculator() {
  const [edadActual, setEdadActual] = useState(35);
  const [edadRetiro, setEdadRetiro] = useState(60);
  const [gastoActual, setGastoActual] = useState(6_000_000);
  const [inflacion, setInflacion] = useState(4.5);
  const [tasaRetiro, setTasaRetiro] = useState(4);

  const { gastoFuturo, patrimonioRequerido, anios } = useMemo(() => {
    const anios = Math.max(edadRetiro - edadActual, 0);
    const gastoFuturo = gastoActual * Math.pow(1 + inflacion / 100, anios);
    const patrimonioRequerido = (gastoFuturo * 12) / (tasaRetiro / 100);
    return { gastoFuturo, patrimonioRequerido, anios };
  }, [edadActual, edadRetiro, gastoActual, inflacion, tasaRetiro]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <label className={labelClass}>Edad actual</label>
        <input
          type="number"
          value={edadActual}
          onChange={(e) => setEdadActual(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Edad de retiro deseada</label>
        <input
          type="number"
          value={edadRetiro}
          onChange={(e) => setEdadRetiro(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Gasto mensual actual (COP)</label>
        <input
          type="number"
          value={gastoActual}
          onChange={(e) => setGastoActual(Number(e.target.value) || 0)}
          className={inputClass}
        />
        <label className={labelClass}>Inflación anual esperada (%)</label>
        <input
          type="number"
          step="0.1"
          value={inflacion}
          onChange={(e) => setInflacion(Number(e.target.value) || 0)}
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
      </div>

      <div className="space-y-3">
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">
            Años hasta el retiro
          </p>
          <p className="mt-1 font-display text-2xl">{anios}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">
            Gasto mensual proyectado al retiro (ajustado por inflación)
          </p>
          <p className="mt-1 font-display text-2xl">{formatCurrency(gastoFuturo, "COP")}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Patrimonio requerido al momento del retiro</p>
          <p className="mt-1 font-display text-2xl text-gold">{formatCurrency(patrimonioRequerido, "COP")}</p>
        </Card>
      </div>
    </div>
  );
}
