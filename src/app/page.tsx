import { Hero } from "@/components/home/Hero";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { Divisions } from "@/components/home/Divisions";
import { Stats } from "@/components/home/Stats";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestNews } from "@/components/home/LatestNews";
import { CTABand } from "@/components/sections/CTABand";
import {
  getCompanies,
  getNews,
  getSiteSetting,
  getTestimonials,
  getEcosystem,
  getPartnerLogos,
  type HomeStat,
} from "@/lib/queries";

// Revalidate hourly — content is CMS-driven but changes infrequently.
export const revalidate = 3600;

export default async function HomePage() {
  const [
    companies, news, stats, testimonials, ecosystem, heroSlides, partnerLogos,
  ] = await Promise.all([
    getCompanies(),
    getNews({ limit: 3 }),
    getSiteSetting<HomeStat[]>("home_stats"),
    getTestimonials(),
    getEcosystem(),
    getSiteSetting<string[]>("hero_slides"),
    getPartnerLogos(),
  ]);

  return (
    <>
      <Hero slides={heroSlides ?? undefined} />
      <PartnerLogos rows={partnerLogos} />
      <Divisions companies={companies} />
      <Stats stats={stats ?? []} />
      <Ecosystem preview rows={ecosystem} />
      <Testimonials items={testimonials} />
      <LatestNews articles={news} />
      <CTABand />
    </>
  );
}
