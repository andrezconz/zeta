import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FortisMark } from "@/components/fortis-mark";

export function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0b0c]/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <FortisMark className="h-6 w-6" />
          <span className="font-display text-sm font-medium tracking-wide text-white">Fortis</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#por-que-fortis" className="transition-colors hover:text-white">Por qué Fortis</a>
          <a href="#filosofia" className="transition-colors hover:text-white">Filosofía</a>
          <a href="#proceso" className="transition-colors hover:text-white">Cómo funciona</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-white/80 hover:bg-white/5 hover:text-white">
            <Link href="/unlock">Iniciar sesión</Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link href="/unlock">Comenzar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
