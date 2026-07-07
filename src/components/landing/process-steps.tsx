import { Link2, Layers3, LineChart, Target, Repeat } from "lucide-react";

const steps = [
  { icon: Link2, title: "Conecta tus cuentas", description: "Brokers, bancos y fondos, en minutos." },
  { icon: Layers3, title: "Consolida inversiones", description: "Una sola vista de todo tu patrimonio." },
  { icon: LineChart, title: "Analiza tu patrimonio", description: "Riesgo, rentabilidad y composición reales." },
  { icon: Target, title: "Define objetivos", description: "Metas claras, con horizonte y capital requerido." },
  { icon: Repeat, title: "Haz seguimiento", description: "Revisa y ajusta con disciplina, no con ansiedad." },
];

export function ProcessSteps() {
  return (
    <section id="proceso" className="bg-[#0b0b0c] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wide text-gold">CÓMO FUNCIONA</p>
          <h2 className="mt-4 font-display text-3xl font-medium text-white sm:text-4xl">
            Cinco pasos hacia la claridad
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-4">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/[0.1] sm:block" />
          {steps.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0b0b0c] text-xs font-medium text-gold">
                {i + 1}
              </div>
              <Icon className="mb-2 mt-4 h-4 w-4 text-white/40" strokeWidth={1.5} />
              <h3 className="font-display text-sm font-medium text-white">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/50">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
