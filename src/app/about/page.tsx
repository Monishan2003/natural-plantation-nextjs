import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight, Quote } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/sections/CTABand";
import {
  getCompanies,
  getTeam,
  getTimeline,
  getSiteSetting,
  type KeyValueStat,
} from "@/lib/queries";
import { safeImage } from "@/lib/img";
import { VISION, VALUES } from "@/content/company";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in Kilinochchi in 2020, Natural Plantation has grown into a diversified group across retail, agriculture and enterprise in Sri Lanka's North and East.",
};

function LucideIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
  return Cmp ? <Cmp {...props} /> : null;
}

export default async function AboutPage() {
  const [companies, team, timeline, aboutStats, governance] = await Promise.all([
    getCompanies(),
    getTeam(),
    getTimeline(),
    getSiteSetting<KeyValueStat[]>("about_stats"),
    getSiteSetting<KeyValueStat[]>("governance_items"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="About Natural Plantation"
        title="Built in the North, growing for all of Sri Lanka"
        lead="What began in Kilinochchi has grown into a diversified group spanning retail, organic agriculture and enterprise — with people and community at its centre."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
      />

      {/* About stats */}
      {aboutStats && aboutStats.length > 0 && (
        <section className="border-b border-slate-200 bg-white">
          <div className="container-max grid grid-cols-2 gap-y-8 py-12 md:grid-cols-3 lg:grid-cols-6">
            {aboutStats.map((s) => (
              <div key={s.v} className="text-center">
                <p className="font-display text-3xl font-bold text-blue-900">{s.k}</p>
                <p className="mt-1 text-xs text-slate-500">{s.v}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Our story */}
      <section className="section-y bg-white">
        <div className="container-max grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] shadow-lifted">
              <Image src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80" alt="The Natural Plantation team" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="eyebrow text-green-600">Our Story</p>
              <h2 className="mt-3 text-h2 font-bold text-blue-900">A homegrown enterprise</h2>
              <div className="mt-5 space-y-4 text-body text-slate-700">
                <p>
                  Founded in Kilinochchi in 2020, Natural Plantation set out to prove a simple
                  idea: that world-class enterprise can be built in the Northern Province and
                  serve the whole country.
                </p>
                <p>
                  Today the group spans branded consumer goods, FMCG distribution across 30+
                  branches, a 120-acre organic farm, and the holding structure that ties it
                  together — employing over 800 people across the North and East.
                </p>
                <p>
                  We grow what we sell, hire where we operate, and reinvest in the communities
                  that make our work possible.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-y bg-cloud">
        <div className="container-max grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card hover={false} className="h-full border-t-4 border-blue-600 p-8">
              <p className="eyebrow text-blue-600">Our Vision</p>
              <p className="mt-4 text-body-lg text-ink">{VISION.vision}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card hover={false} className="h-full border-t-4 border-green-600 p-8">
              <p className="eyebrow text-green-600">Our Mission</p>
              <p className="mt-4 text-body-lg text-ink">{VISION.mission}</p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* The group at a glance */}
      {companies.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-max">
            <SectionHeader
              eyebrow="The Group"
              title="Three companies, one mission"
              lead="Natural Plantation is the consumer brand; NF Plantation is the holding structure; Nature Farming grows what we sell."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {companies.map((c, idx) => (
                <Reveal key={c.id} delay={idx * 0.08}>
                  <Card className="flex h-full flex-col p-7">
                    <span
                      className="h-1.5 w-12 rounded-full"
                      style={{ backgroundColor: c.accent ?? "#1b7a4b" }}
                    />
                    <h3 className="mt-4 text-h4 font-semibold text-blue-900">{c.name}</h3>
                    {c.tagline && (
                      <p className="mt-1 text-small font-medium text-green-700">{c.tagline}</p>
                    )}
                    <p className="mt-3 flex-1 text-small text-slate-700">{c.role}</p>
                    <Link
                      href={`/companies#${c.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-green-700"
                    >
                      Read more <ArrowRight size={16} />
                    </Link>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-max">
            <SectionHeader eyebrow="Our Journey" title="Milestones along the way" />
            <ol className="relative mx-auto max-w-3xl border-l-2 border-slate-200 pl-8">
              {timeline.map((t, idx) => (
                <Reveal as="li" key={t.id} delay={idx * 0.05} className="relative mb-10 last:mb-0">
                  <span className="absolute -left-[2.6rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-green-600 shadow-soft" />
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-green-700">
                    {t.event_date}
                  </p>
                  <h3 className="mt-1 text-h4 font-semibold text-blue-900">{t.title}</h3>
                  {t.body && <p className="mt-1.5 text-body text-slate-700">{t.body}</p>}
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Values */}
      <section className="section-y bg-cloud">
        <div className="container-max">
          <SectionHeader eyebrow="What We Stand For" title="Our values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.06}>
                <Card className="h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-green-50 text-green-700">
                    <LucideIcon name={v.icon} size={22} />
                  </span>
                  <h3 className="mt-4 text-h4 font-semibold text-blue-900">{v.title}</h3>
                  <p className="mt-2 text-small text-slate-700">{v.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — founder feature + any additional members */}
      {team.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-max">
            <SectionHeader eyebrow="Leadership" title="The people behind the group" />

            {(() => {
              const founder = team[0];
              const rest = team.slice(1);
              return (
                <>
                  <Reveal>
                    <div className="grid items-center gap-8 overflow-hidden rounded-[var(--radius-xl)] bg-cloud shadow-card lg:grid-cols-[0.85fr_1.15fr]">
                      <div className="relative aspect-[3/4] w-full bg-slate-100 lg:aspect-auto lg:h-full lg:min-h-[28rem]">
                        <Image
                          src={safeImage(founder.image_url, "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80")}
                          alt={founder.name.trim()}
                          fill
                          sizes="(max-width:1024px) 100vw, 40vw"
                          className="object-contain object-top"
                        />
                      </div>
                      <div className="p-8 md:p-10">
                        <Quote className="text-green-500" size={34} />
                        <h3 className="mt-4 text-h3 font-bold text-blue-900">
                          {founder.name.trim()}
                        </h3>
                        <p className="text-body-lg font-medium text-green-700">{founder.role}</p>
                        {founder.bio && (
                          <p className="mt-5 text-body text-slate-700">{founder.bio}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>

                  {rest.length > 0 && (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {rest.map((m, idx) => (
                        <Reveal key={m.id} delay={idx * 0.06}>
                          <Card className="h-full overflow-hidden">
                            <div className="relative aspect-[4/3] bg-blue-50">
                              <Image
                                src={safeImage(m.image_url, "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80")}
                                alt={m.name.trim()}
                                fill
                                sizes="(max-width:768px) 100vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                            <div className="p-6">
                              <h3 className="text-h4 font-semibold text-blue-900">{m.name.trim()}</h3>
                              <p className="text-small font-medium text-green-700">{m.role}</p>
                              {m.bio && <p className="mt-3 text-small text-slate-700">{m.bio}</p>}
                            </div>
                          </Card>
                        </Reveal>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      )}

      {/* Governance */}
      {governance && governance.length > 0 && (
        <section className="section-y bg-cloud">
          <div className="container-max">
            <SectionHeader eyebrow="Governance" title="How we hold ourselves accountable" />
            <div className="grid gap-6 sm:grid-cols-2">
              {governance.map((g, idx) => (
                <Reveal key={g.k} delay={idx * 0.05}>
                  <Card hover={false} className="h-full p-6">
                    <h3 className="text-h4 font-semibold text-blue-900">{g.k}</h3>
                    <p className="mt-2 text-small text-slate-700">{g.v}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
