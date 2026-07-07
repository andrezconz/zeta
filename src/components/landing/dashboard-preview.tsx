import { formatCurrency } from "@/lib/utils";
import { holdings, holdingMarketValueCOP } from "@/lib/data/mock-data";

const benefits = [
  "Todas tus inversiones",
  "Rendimiento consolidado",
  "Riesgo total",
  "Dividendos",
  "Flujo de caja",
  "Objetivos",
  "Patrimonio",
];

const previewHoldings = holdings.slice(0, 5);
const totalPreview = holdings.reduce((sum, h) => sum + holdingMarketValueCOP(h), 0);

export function DashboardPreview() {
  return (
    <section className="bg-[#0b0b0c] px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141416] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 text-xs text-white/30">fortis.app/dashboard</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-3">
            <div className="bg-[#141416] p-5">
              <p className="text-xs text-white/40">Patrimonio total</p>
              <p className="mt-2 font-display text-xl text-white">{formatCurrency(totalPreview, "COP")}</p>
              <p className="mt-1 text-xs text-[#32c67a]">+2.4% este mes</p>
            </div>
            <div className="bg-[#141416] p-5">
              <p className="text-xs text-white/40">Rentabilidad YTD</p>
              <p className="mt-2 font-display text-xl text-white">+12.8%</p>
              <p className="mt-1 text-xs text-white/40">vs. +9.1% S&P 500</p>
            </div>
            <div className="bg-[#141416] p-5">
              <p className="text-xs text-white/40">Dividendos (12m)</p>
              <p className="mt-2 font-display text-xl text-white">{formatCurrency(8_420_000, "COP")}</p>
              <p className="mt-1 text-xs text-[#32c67a]">+4.2%</p>
            </div>
          </div>
          <div className="px-5 py-4">
            <p className="mb-3 text-xs font-medium text-white/40">Posiciones principales</p>
            <div className="space-y-2.5">
              {previewHoldings.map((h) => (
                <div key={h.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-medium text-white/70">
                      {h.ticker.slice(0, 2)}
                    </span>
                    <span className="text-white/80">{h.asset}</span>
                  </div>
                  <span className="text-white/50">{formatCurrency(holdingMarketValueCOP(h), "COP")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium tracking-wide text-gold">TODO EN UN SOLO LUGAR</p>
          <h2 className="mt-4 font-display text-3xl font-medium text-white sm:text-4xl">
            Una vista completa de tu patrimonio
          </h2>
          <p className="mt-4 text-white/55">
            Sin hojas de cálculo dispersas ni apps de brokers separadas. Fortis
            consolida cada cuenta en un solo panel, pensado para decidir, no
            para distraerte.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-white/75">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
