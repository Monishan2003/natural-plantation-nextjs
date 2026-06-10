"use client";

import Image from "next/image";

type LogoItem =
  | { kind: "img"; name: string; src: string; w: number; h: number }
  | { kind: "text"; name: string; color: string; bg: string };

const FALLBACK_LOGOS: LogoItem[] = [
  { kind: "img",  name: "Abans",     src: "/images/logos/abans.svg",     w: 120, h: 26 },
  { kind: "text", name: "SINGER",    color: "#cc0000", bg: "#fff0f0" },
  { kind: "img",  name: "Panasonic", src: "/images/logos/panasonic.svg", w: 130, h: 28 },
  { kind: "text", name: "DAMRO",     color: "#004c97", bg: "#eef4ff" },
];

/** Tiny DB row shape (subset of partner_logos). */
interface DbLogo {
  name: string;
  kind: string;
  image_url: string | null;
  text_color: string | null;
  bg_color: string | null;
}

function fromDb(r: DbLogo): LogoItem {
  if (r.kind === "image" && r.image_url) {
    return { kind: "img", name: r.name, src: r.image_url, w: 130, h: 28 };
  }
  return {
    kind: "text",
    name: r.name,
    color: r.text_color ?? "#0F4C81",
    bg: r.bg_color ?? "#EAF2F9",
  };
}

export function PartnerLogos({ rows }: { rows?: DbLogo[] } = {}) {
  const LOGOS = rows && rows.length > 0 ? rows.map(fromDb) : FALLBACK_LOGOS;
  // Duplicate for seamless infinite scroll
  const TRACK = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="border-y border-slate-200 bg-white py-6 overflow-hidden">
      <p className="text-center text-eyebrow text-slate-400 mb-5 tracking-widest">
        Trusted Partners &amp; Retailers
      </p>

      {/* Marquee wrapper — mask edges for clean fade */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center gap-12"
          style={{
            animation: "marquee 28s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")
          }
        >
          {TRACK.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center rounded-lg px-5 py-2"
              style={{ minWidth: 140, height: 52 }}
            >
              {logo.kind === "img" ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  className="object-contain max-h-full"
                />
              ) : (
                <span
                  className="rounded-md px-4 py-1.5 font-display font-bold tracking-widest"
                  style={{
                    color: logo.color,
                    background: logo.bg,
                    fontSize: "1.1rem",
                    letterSpacing: "0.14em",
                  }}
                >
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
