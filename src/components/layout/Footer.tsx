import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Mark } from "./Logo";
import { SOCIAL_ICON_MAP } from "./SocialIcons";
import {
  getSiteSetting,
  type FooterColumn,
  type HeadOffice,
  type SocialLinks,
} from "@/lib/queries";
import { BRAND } from "@/content/company";

const FALLBACK_COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/companies", label: "Our companies" },
      { href: "/services", label: "Services" },
      { href: "/news", label: "News" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/companies#natural-plantation", label: "Natural Plantation" },
      { href: "/companies#nf-plantation", label: "NF Plantation" },
      { href: "/companies#nature-farming", label: "Nature Farming" },
    ],
  },
];

interface BrandValue {
  name: string;
  shortMission: string;
  footerLong: string;
}

export async function Footer() {
  const [office, social, dbCols, dbBrand] = await Promise.all([
    getSiteSetting<HeadOffice>("head_office"),
    getSiteSetting<SocialLinks>("social_links"),
    getSiteSetting<FooterColumn[]>("footer_columns"),
    getSiteSetting<BrandValue>("brand"),
  ]);
  const brand = {
    name: dbBrand?.name || BRAND.name,
    shortMission: dbBrand?.shortMission || BRAND.shortMission,
    footerLong: dbBrand?.footerLong || BRAND.footerLong,
  };
  // Render only the first two link columns; column 4 is always the structured
  // Contact block (address + phone + email) so we never duplicate contact info
  // and the grid always reads as a balanced 4 columns.
  const linkColumns = (dbCols && dbCols.length > 0 ? dbCols : FALLBACK_COLUMNS).slice(0, 2);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-green-500 bg-blue-900 text-white/80">
      <div className="container-max grid gap-x-10 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand — wider on desktop for balance */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <Mark className="h-9 w-9" />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {brand.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-small leading-relaxed text-white/65">
            {brand.shortMission}
          </p>
          {social && (
            <div className="mt-6 flex gap-2.5">
              {Object.entries(SOCIAL_ICON_MAP).map(([key, Icon]) =>
                social[key] ? (
                  <a
                    key={key}
                    href={social[key]}
                    aria-label={key}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 transition-colors hover:bg-green-600 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ) : null,
              )}
            </div>
          )}
        </div>

        {/* Link columns */}
        {linkColumns.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
              {col.heading}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={`${col.heading}-${l.href}-${l.label}`}>
                  <Link
                    href={l.href}
                    className="text-small text-white/65 transition-colors hover:text-green-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contact — single, clean block (no duplication) */}
        {office && (
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3.5 text-small text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-green-300" />
                <span className="leading-relaxed">
                  {office.address_line1}
                  <br />
                  {office.address_line2}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-green-300"
                >
                  <Phone size={16} className="shrink-0 text-green-300" />
                  {office.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-green-300"
                >
                  <Mail size={16} className="shrink-0 text-green-300" />
                  <span className="break-all">{office.email}</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-max flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.footerLong}. All rights reserved.
          </p>
          <p>Rooted in the North. Growing for Sri Lanka.</p>
        </div>
      </div>
    </footer>
  );
}
