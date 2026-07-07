const values = ["Disciplina", "Paciencia", "Largo plazo", "Racionalidad", "Consistencia"];

export function StoicPhilosophy() {
  return (
    <section id="filosofia" className="bg-[#f7f5f0] px-6 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium tracking-wide text-[#8a6a3d]">FILOSOFÍA ESTOICA</p>
        <p className="mt-8 font-display text-3xl font-medium leading-snug text-[#0b0b0c] sm:text-4xl">
          No puedes controlar el mercado.
          <br />
          Sí puedes controlar tus decisiones.
        </p>
        <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {values.map((value, i) => (
            <span key={value} className="flex items-center gap-8">
              <span className="text-sm tracking-wide text-[#3d3a33]">{value}</span>
              {i < values.length - 1 && <span className="h-1 w-1 rounded-full bg-[#c9a46a]" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
