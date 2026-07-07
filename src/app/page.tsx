import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/hero";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { WhyFortis } from "@/components/landing/why-fortis";
import { StoicPhilosophy } from "@/components/landing/stoic-philosophy";
import { ProcessSteps } from "@/components/landing/process-steps";
import { FinalCta, LandingFooter } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <Hero />
      <DashboardPreview />
      <WhyFortis />
      <StoicPhilosophy />
      <ProcessSteps />
      <FinalCta />
      <LandingFooter />
    </div>
  );
}
