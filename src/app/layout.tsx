import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSetting } from "@/lib/queries";
import { BRAND } from "@/content/company";

interface BrandValue {
  name: string;
  tagline: string;
  shortMission: string;
}

async function resolveBrand() {
  const db = await getSiteSetting<BrandValue>("brand");
  return {
    name: db?.name || BRAND.name,
    tagline: db?.tagline || BRAND.tagline,
    shortMission: db?.shortMission || BRAND.shortMission,
  };
}

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const brand = await resolveBrand();
  return {
    metadataBase: new URL("https://natural-plantation-nextjs.vercel.app"),
    title: {
      default: `${brand.name} — ${brand.tagline}`,
      template: `%s · ${brand.name}`,
    },
    description: brand.shortMission,
    openGraph: {
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.shortMission,
      type: "website",
      locale: "en_LK",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const brand = await resolveBrand();
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <Header brandName={brand.name} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
