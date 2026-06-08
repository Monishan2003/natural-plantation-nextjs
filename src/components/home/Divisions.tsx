import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clsx } from "@/lib/clsx";
import type { Company } from "@/lib/queries";

const META: Record<
  string,
  { img: string; badge: string; button: string }
> = {
  "natural-plantation": {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
    badge: "Retail & FMCG",
    button: "bg-green-600 hover:bg-green-700",
  },
  "nf-plantation": {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
    badge: "Group Holding",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  "nature-farming": {
    img: "/images/aloe-vera-plantation.png",
    badge: "Agriculture",
    button: "bg-green-600 hover:bg-green-700",
  },
};

export function Divisions({ companies }: { companies: Company[] }) {
  return (
    <section className="section-y bg-white">
      <div className="container-max">
        <SectionHeader
          eyebrow="Our Business Divisions"
          title="Diversified excellence in every sector"
          lead="From everyday consumer goods to organic agriculture and the structure that holds it together — a connected ecosystem built in the North."
        />

        <div className="grid gap-7 md:grid-cols-3">
          {companies.map((c, idx) => {
            const meta = META[c.slug] ?? META["natural-plantation"];
            const img = meta.img;
            return (
              <Reveal key={c.id} delay={idx * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={img}
                      alt={c.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span
                      className="self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white"
                      style={{ backgroundColor: c.accent ?? "#1b7a4b" }}
                    >
                      {meta.badge}
                    </span>
                    <h3 className="mt-4 text-h4 font-semibold text-blue-900">{c.name}</h3>
                    <p className="mt-2 flex-1 text-body text-slate-700">{c.tagline ?? c.role}</p>
                    <Link
                      href={`/companies#${c.slug}`}
                      className={clsx(
                        "mt-6 inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 py-3 text-sm font-semibold text-white transition-colors",
                        meta.button,
                      )}
                    >
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
