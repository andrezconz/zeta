import { Layers, PieChart, Compass, Target, ShieldCheck, History } from "lucide-react";

const cards = [
  {
    icon: Layers,
    title: "Consolidación automática",
    description: "Conecta brokers, bancos y fondos para ver tu patrimonio real, sin hojas de cálculo manuales.",
  },
  {
    icon: PieChart,
    title: "Visualización del patrimonio",
    description: "Composición por activo, broker y moneda, entendida de un vistazo.",
  },
  {
    icon: Compass,
    title: "Planeación financiera",
    description: "Simula independencia financiera, retiro e inflación con calculadoras integradas.",
  },
  {
    icon: Target,
    title: "Seguimiento de objetivos",
    description: "Cada meta con su capital requerido, avance y fecha, sin adivinar.",
  },
  {
    icon: ShieldCheck,
    title: "Control del riesgo",
    description: "Volatilidad, drawdown, correlación y VaR explicados en lenguaje simple.",
  },
  {
    icon: History,
    title: "Análisis histórico",
    description: "Compara tu portafolio contra S&P 500, MSCI World o el IPC en el tiempo.",
  },
];

export function WhyFortis() {
  return (
    <section id="por-que-fortis" className="bg-[#0b0b0c] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wide text-gold">POR QUÉ FORTIS</p>
          <h2 className="mt-4 font-display text-3xl font-medium text-white sm:text-4xl">
            Diseñado para decidir, no para especular
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.14]"
            >
              <Icon className="mb-4 h-5 w-5 text-gold" strokeWidth={1.5} />
              <h3 className="font-display text-base font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
