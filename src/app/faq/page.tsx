import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { FaqExplorer } from "@/components/faq/FaqExplorer";
import { getFaqCategories, getFaqs, getSiteSetting } from "@/lib/queries";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to the most common questions about Natural Plantation — products, branches, agriculture, e-commerce, partnerships and the company.",
};

interface PageHeroes { faq?: string }

export default async function FaqPage() {
  const [categories, faqs, heroes] = await Promise.all([
    getFaqCategories(),
    getFaqs(),
    getSiteSetting<PageHeroes>("page_heroes"),
  ]);

  // FAQPage JSON-LD — answers AEO / search engines / AI assistants.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question_en,
      acceptedAnswer: { "@type": "Answer", text: f.answer_en },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // The text is built from trusted, JSON-encoded data — escape minimal.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Answers, all in one place"
        lead="What customers, partners and the curious ask most often — grouped by topic so you can find what you need fast."
        image={heroes?.faq ?? "/images/aloe-vera-plantation.png"}
      />

      <section className="section-y bg-cloud">
        <div className="container-max">
          <FaqExplorer categories={categories} faqs={faqs} />
        </div>
      </section>

      <CTABand
        title="Still have a question?"
        lead="Reach our team — we usually reply within two business days."
        cta={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
