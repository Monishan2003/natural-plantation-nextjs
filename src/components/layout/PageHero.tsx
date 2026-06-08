import Image from "next/image";

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Local background photo suited to the page (sits behind the brand wash). */
  image?: string;
}

/** Shorter hero strip for inner pages (~50vh) — keeps the dark top so the
 *  transparent header stays legible across every route. An optional background
 *  photo (with a slow drift) gives each page its own sense of place. */
export function PageHero({ eyebrow, title, lead, image }: Props) {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="kenburns object-cover"
          />
        </div>
      )}
      {/* Brand wash — strong enough for AA text contrast, light enough to keep
          the photo visible underneath. */}
      <div
        className={
          image
            ? "absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/75 to-green-800/80"
            : "absolute inset-0 brand-gradient"
        }
      />
      <div className="container-max relative z-10 flex min-h-[44vh] flex-col justify-center pt-28 pb-16 md:min-h-[52vh] md:pt-32">
        <p className="eyebrow text-green-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-display font-bold text-white">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-body-lg text-white/85">{lead}</p>}
      </div>
    </section>
  );
}
