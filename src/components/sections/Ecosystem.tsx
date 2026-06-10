import Link from "next/link";
import { ArrowRight, Smartphone, Globe, AppWindow } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ECOSYSTEM as FALLBACK, type EcosystemProduct } from "@/content/ecosystem";

/** Both DB rows and the static fallback feed into the same shape used below. */
interface NormalizedProduct {
  name: string;
  kind: string;
  desc: string;
  platforms: string[];
  web?: string;
  comingSoon?: boolean;
}

/** Lightweight DB row shape (subset). */
interface DbEcosystemRow {
  name: string;
  kind: string;
  description: string;
  platforms: string[];
  web_url: string | null;
  coming_soon: boolean;
}

function fromDb(r: DbEcosystemRow): NormalizedProduct {
  return {
    name: r.name,
    kind: r.kind,
    desc: r.description,
    platforms: r.platforms ?? [],
    web: r.web_url ?? undefined,
    comingSoon: r.coming_soon,
  };
}

function fromFallback(p: EcosystemProduct): NormalizedProduct {
  return { name: p.name, kind: p.kind, desc: p.desc, platforms: p.platforms, web: p.web, comingSoon: p.comingSoon };
}

const KIND_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Mobile app": Smartphone,
  "Operations app": Smartphone,
  "Website": Globe,
  "E-commerce": Globe,
  "Web app": AppWindow,
};

function ProductCard({ p, idx }: { p: NormalizedProduct; idx: number }) {
  const Icon = KIND_ICON[p.kind] ?? Globe;
  return (
    <Reveal delay={idx * 0.06}>
      <div className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
        <div className="mb-5 flex h-36 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-blue-50 to-green-50">
          <Icon size={44} className="text-blue-600/80" />
        </div>
        <p className="eyebrow text-green-600">{p.kind}</p>
        <h3 className="mt-1 text-h4 font-semibold text-blue-900">{p.name}</h3>
        <p className="mt-2 flex-1 text-small text-slate-700">{p.desc}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.platforms.map((t) => (
            <span
              key={t}
              className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5">
          {p.comingSoon ? (
            <span className="inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1.5 text-xs font-semibold text-[var(--color-warning)]">
              Coming soon
            </span>
          ) : p.web ? (
            <Link
              href={p.web}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-600"
            >
              Visit <ArrowRight size={15} />
            </Link>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export function Ecosystem({
  preview = false,
  rows,
}: {
  preview?: boolean;
  rows?: DbEcosystemRow[];
}) {
  const all: NormalizedProduct[] =
    rows && rows.length > 0 ? rows.map(fromDb) : FALLBACK.map(fromFallback);
  const items = preview ? all.slice(0, 3) : all;

  return (
    <section id="ecosystem" className="section-y bg-cloud">
      <div className="container-max">
        <SectionHeader
          eyebrow="Digital Ecosystem"
          title="One group. A connected digital experience."
          lead="Our apps and platforms are rolling out across the group — built to bring products, branches and people closer together."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, idx) => (
            <ProductCard key={p.name} p={p} idx={idx} />
          ))}
        </div>

        {preview && (
          <div className="mt-10 text-center">
            <Link
              href="/services#ecosystem"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-green-700"
            >
              Explore the full ecosystem <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
