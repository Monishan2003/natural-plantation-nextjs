import { Hero } from "@/components/home/Hero";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { Divisions } from "@/components/home/Divisions";
import { Stats } from "@/components/home/Stats";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestNews } from "@/components/home/LatestNews";
import { CTABand } from "@/components/sections/CTABand";
import { getCompanies, getNews, getSiteSetting, type HomeStat } from "@/lib/queries";

// Revalidate hourly — content is CMS-driven but changes infrequently.
export const revalidate = 3600;

export default async function HomePage() {
  const [companies, news, stats] = await Promise.all([
    getCompanies(),
    getNews({ limit: 3 }),
    getSiteSetting<HomeStat[]>("home_stats"),
  ]);

  return (
    <>
      <Hero />
      <PartnerLogos />
      <Divisions companies={companies} />
      <Stats stats={stats ?? []} />
      <Ecosystem preview />
      <Testimonials />
      <LatestNews articles={news} />
      <CTABand />
    </>
  );
}
