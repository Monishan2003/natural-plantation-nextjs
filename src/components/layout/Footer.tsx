import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Mark } from "./Logo";
import { SOCIAL_ICON_MAP } from "./SocialIcons";
import { getSiteSetting, type HeadOffice, type SocialLinks } from "@/lib/queries";
import { BRAND } from "@/content/company";

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Group",
    links: [
      { href: "/about", label: "About us" },
      { href: "/companies", label: "Our companies" },
      { href: "/services", label: "Services" },
      { href: "/news", label: "News" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { href: "/companies#natural-plantation", label: "Natural Plantation" },
      { href: "/companies#nf-plantation", label: "NF Plantation" },
      { href: "/companies#nature-farming", label: "Nature Farming" },
      { href: "/contact", label: "Contact us" },
    ],
  },
];

export async function Footer() {
  const [office, social] = await Promise.all([
    getSiteSetting<HeadOffice>("head_office"),
    getSiteSetting<SocialLinks>("social_links"),
  ]);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-green-500 bg-blue-900 text-white/80">
      <div className="container-max grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <Mark className="h-9 w-9" />
            <span className="font-display text-lg font-bold text-white">{BRAND.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-small leading-relaxed text-white/65">
            {BRAND.shortMission}
          </p>
          {social && (
            <div className="mt-5 flex gap-3">
              {Object.entries(SOCIAL_ICON_MAP).map(([key, Icon]) =>
                social[key] ? (
                  <a
                    key={key}
                    href={social[key]}
                    aria-label={key}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-green-600"
                  >
                    <Icon size={17} />
                  </a>
                ) : null,
              )}
            </div>
          )}
        </div>

        {/* Link columns */}
        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="text-small font-semibold uppercase tracking-[0.1em] text-white">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-small text-white/70 transition-colors hover:text-green-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contact */}
        {office && (
          <div>
            <h3 className="text-small font-semibold uppercase tracking-[0.1em] text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-small text-white/70">
              <li className="flex gap-2.5">
                <MapPin size={17} className="mt-0.5 shrink-0 text-green-300" />
                <span>
                  {office.address_line1}
                  <br />
                  {office.address_line2}
                </span>
              </li>
              <li>
                <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-green-300">
                  <Phone size={17} className="shrink-0 text-green-300" />
                  {office.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 hover:text-green-300">
                  <Mail size={17} className="shrink-0 text-green-300" />
                  {office.email}
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
            © {year} {BRAND.footerLong}. All rights reserved.
          </p>
          <p>Rooted in the North. Growing for Sri Lanka.</p>
        </div>
      </div>
    </footer>
  );
}
