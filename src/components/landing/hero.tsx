"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  { icon: Eye, label: "Claridad", description: "Toda tu información financiera en un solo lugar, sin ruido." },
  { icon: ShieldCheck, label: "Control", description: "Entiende tu riesgo real antes de perseguir rentabilidad." },
  { icon: Target, label: "Disciplina", description: "Decisiones consistentes, alineadas con tus objetivos de largo plazo." },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#0b0b0c] px-6 pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(201,164,106,0.08) 0%, rgba(11,11,12,0) 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,164,106,0.06) 0%, rgba(201,164,106,0) 70%)" }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="mb-6 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-gold"
        >
          UN SISTEMA OPERATIVO PARA TU PATRIMONIO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl font-medium leading-tight text-white sm:text-6xl"
        >
          Construye patrimonio
          <br /> con claridad.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Consolida todas tus inversiones. Analiza tu patrimonio. Toma mejores
          decisiones. Invierte con disciplina.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild variant="gold" size="lg">
            <Link href="/login">Comenzar</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/15 text-white hover:bg-white/5">
            <Link href="/dashboard">Ver demo</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="relative mx-auto mt-24 grid w-full max-w-4xl grid-cols-1 gap-8 border-t border-white/[0.08] pt-12 sm:grid-cols-3"
      >
        {pillars.map(({ icon: Icon, label, description }) => (
          <div key={label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <Icon className="mb-3 h-5 w-5 text-gold" strokeWidth={1.5} />
            <h3 className="font-display text-sm font-medium text-white">{label}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/50">{description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
