import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FortisMark } from "@/components/fortis-mark";

export function FinalCta() {
  return (
    <section className="bg-[#0b0b0c] px-6 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] px-8 py-16 text-center">
        <FortisMark className="h-8 w-8" />
        <h2 className="mt-6 font-display text-2xl font-medium text-white sm:text-3xl">
          Empieza a gestionar tu patrimonio con calma.
        </h2>
        <p className="mt-3 max-w-md text-sm text-white/55">
          Sin ruido, sin apariencia de casino. Solo la información que necesitas
          para decidir bien.
        </p>
        <Button asChild variant="gold" size="lg" className="mt-8">
          <Link href="/unlock">Comenzar</Link>
        </Button>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0b0b0c] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row">
        <div className="flex items-center gap-2">
          <FortisMark className="h-4 w-4" />
          <span>Fortis</span>
        </div>
        <p>Contenido educativo. No constituye asesoría financiera individual.</p>
        <p>&copy; {new Date().getFullYear()} Fortis</p>
      </div>
    </footer>
  );
}
