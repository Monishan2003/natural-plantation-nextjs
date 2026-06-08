import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  title?: string;
  lead?: string;
  cta?: { href: string; label: string };
}

/** Full-width blue→green gradient call-to-action band (spec §3.1 G). */
export function CTABand({
  title = "Let's Start Building Your Success Story",
  lead = "Partner with a diversified Sri Lankan group rooted in the North. Tell us what you're looking to grow.",
  cta = { href: "/contact", label: "Get in Touch" },
}: Props) {
  return (
    <section className="brand-gradient relative overflow-hidden">
      <div className="container-max section-y text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-h2 font-bold text-white">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/85">{lead}</p>
          <div className="mt-8 flex justify-center">
            <Link href={cta.href} className={buttonVariants("white")}>
              {cta.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
