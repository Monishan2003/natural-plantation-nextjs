import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "@/components/ui/LucideIcon";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { CTABand } from "@/components/sections/CTABand";
import { SERVICE_GROUPS, PROCESS_STEPS } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What each company in the Natural Plantation group does — retail & FMCG, group holding & partnerships, and organic agricultural production.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services across the group"
        lead="Three companies, one connected offering — from the products on your shelf to the farm they came from and the structure that makes it all work."
        image="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Service groups by company */}
      <section className="section-y bg-white">
        <div className="container-max space-y-16">
          {SERVICE_GROUPS.map((group) => (
            <div key={group.companySlug}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-green-600">{group.company}</p>
                  <h2 className="mt-2 text-h3 font-bold text-blue-900">{group.blurb}</h2>
                </div>
                <Link
                  href={`/companies#${group.companySlug}`}
                  className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-green-700"
                >
                  About {group.company} <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {group.services.map((s, idx) => (
                  <Reveal key={s.title} delay={idx * 0.05}>
                    <Card className="h-full p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-blue-50 text-blue-600">
                        <LucideIcon name={s.icon} size={22} />
                      </span>
                      <h3 className="mt-4 text-h4 font-semibold text-blue-900">{s.title}</h3>
                      <p className="mt-2 text-small text-slate-700">{s.desc}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process band */}
      <section className="brand-gradient relative overflow-hidden">
        <div className="container-max section-y">
          <SectionHeader
            invert
            eyebrow="How We Work"
            title="A partnership built to last"
            lead="Every relationship follows the same honest rhythm — from first conversation to long-term growth."
          />
          <div className="grid gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 0.08}>
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 font-display text-lg font-bold text-white">
                    {idx + 1}
                  </span>
                  <h3 className="mt-4 text-h4 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-small text-white/75">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full Digital Ecosystem showcase */}
      <Ecosystem />

      <CTABand />
    </>
  );
}
