import { MapPin, Users, Layers, CalendarClock } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { HomeStat } from "@/lib/queries";

type StatIcon = React.ComponentType<{ size?: number; className?: string }>;

const TILES: { icon: StatIcon; bg: string }[] = [
  { icon: MapPin, bg: "#0f4c81" },
  { icon: Users, bg: "#1b7a4b" },
  { icon: Layers, bg: "#239a5e" },
  { icon: CalendarClock, bg: "#c9a227" },
];

function iconFor(label: string, idx: number) {
  const l = label.toLowerCase();
  if (l.includes("branch")) return { icon: MapPin, bg: "#0f4c81" };
  if (l.includes("employee") || l.includes("people")) return { icon: Users, bg: "#1b7a4b" };
  if (l.includes("line")) return { icon: Layers, bg: "#239a5e" };
  if (l.includes("found")) return { icon: CalendarClock, bg: "#c9a227" };
  return TILES[idx % TILES.length];
}

export function Stats({ stats }: { stats: HomeStat[] }) {
  if (!stats.length) return null;

  return (
    <section className="section-y bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container-max">
        <SectionHeader eyebrow="Our Impact in Numbers" title="Driving excellence through results" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const { icon: Icon, bg } = iconFor(s.label, idx);
            return (
              <Reveal key={s.label} delay={idx * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] text-white shadow-soft"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={26} />
                  </span>
                  <p className="mt-5 font-display text-[2.5rem] font-bold leading-none text-blue-900 sm:text-5xl">
                    <CountUp to={s.n} suffix={s.suf} />
                  </p>
                  <p className="mt-3 text-small font-semibold uppercase tracking-[0.1em] text-green-700">
                    {s.label}
                  </p>
                  <p className="mx-auto mt-1.5 max-w-[15rem] text-small text-slate-500">{s.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
