import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { DisclaimerCallout } from "@/components/sections/DisclaimerCallout";
import {
  getCompanies,
  getCompanyFacts,
  getCompanyHighlights,
  getSiteSetting,
} from "@/lib/queries";
import { FINANCE_DISCLAIMER } from "@/content/company";
import { COMPANY_HIGHLIGHTS, COMPANY_IMAGE } from "@/content/companies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Companies",
  description:
    "Three complementary companies — Natural Plantation, NF Plantation and Nature Farming — built in the Northern Province of Sri Lanka.",
};

interface PageHeroes { companies?: string }

export default async function CompaniesPage() {
  const [companies, facts, dbHighlights, heroes] = await Promise.all([
    getCompanies(),
    getCompanyFacts(),
    getCompanyHighlights(),
    getSiteSetting<PageHeroes>("page_heroes"),
  ]);
  // Index DB highlights by company_id; fall back to static map if empty.
  const dbHighlightsByCo = new Map<string, string[]>();
  dbHighlights.forEach((h) => {
    const list = dbHighlightsByCo.get(h.company_id) ?? [];
    list.push(h.bullet);
    dbHighlightsByCo.set(h.company_id, list);
  });

  return (
    <>
      <PageHero
        eyebrow="Our Companies"
        title="The companies behind the brand"
        lead="A diversified group structured for trust and growth — consumer goods, group holding, and organic agriculture, working as one."
        image={heroes?.companies ?? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"}
      />

      {companies.map((c, idx) => {
        const companyFacts = facts.filter((f) => f.company_id === c.id);
        const dbBullets = dbHighlightsByCo.get(c.id);
        const highlights =
          dbBullets && dbBullets.length > 0
            ? dbBullets
            : COMPANY_HIGHLIGHTS[c.slug] ?? [];
        const reversed = idx % 2 === 1;
        const img = COMPANY_IMAGE[c.slug] ?? "/images/div-farming.png";

        return (
          <section
            key={c.id}
            id={c.slug}
            className={`scroll-mt-20 section-y ${idx % 2 === 1 ? "bg-cloud" : "bg-white"}`}
          >
            <div className="container-max">
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <Reveal>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] shadow-lifted">
                    <Image
                      src={img}
                      alt={c.name}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{ backgroundColor: c.accent ?? "#1b7a4b" }}
                    />
                  </div>
                </Reveal>

                {/* Content */}
                <Reveal delay={0.1}>
                  <div>
                    <p className="eyebrow text-green-600">Company {c.sort_order}</p>
                    <h2 className="mt-3 text-h2 font-bold text-blue-900">{c.name}</h2>
                    {c.tagline && (
                      <p className="mt-2 text-body-lg font-medium text-green-700">{c.tagline}</p>
                    )}
                    <p className="mt-4 text-body text-slate-700">{c.description ?? c.role}</p>

                    {highlights.length > 0 && (
                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-small text-slate-700">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                              style={{ backgroundColor: c.accent ?? "#1b7a4b" }}
                            >
                              <Check size={13} />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {companyFacts.length > 0 && (
                      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-200 pt-7 sm:grid-cols-3">
                        {companyFacts.map((f) => (
                          <div key={f.id}>
                            <dt className="font-display text-2xl font-bold text-blue-900">
                              {f.value_short}
                            </dt>
                            <dd className="mt-1 text-small text-slate-500">{f.value_long}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {c.disclaimer && (
                      <div className="mt-7">
                        <DisclaimerCallout text={FINANCE_DISCLAIMER} />
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <CTABand
        title="Build something lasting with us"
        lead="Whether you want to stock our products, supply our operations or partner on a venture — let's talk."
      />
    </>
  );
}
