import Image from "next/image";
import { clsx } from "@/lib/clsx";
import { BRAND } from "@/content/company";

/** The original Natural Plantation logo. The source PNG has a solid (white)
 *  background, so we present it inside a white circular chip — reads cleanly
 *  on the dark hero and on the solid white header alike. */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/5 shadow-soft",
        className,
      )}
    >
      <Image
        src="/brand/natural-plantation-logo.png"
        alt="Natural Plantation logo"
        fill
        sizes="44px"
        className="object-cover"
      />
    </span>
  );
}

export function Logo({
  invert = false,
  className,
  name = BRAND.name,
}: {
  invert?: boolean;
  className?: string;
  name?: string;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-10 w-10" />
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-display text-[1.1rem] font-bold tracking-tight",
            invert ? "text-white" : "text-blue-900",
          )}
        >
          {name}
        </span>
        <span
          className={clsx(
            "mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]",
            invert ? "text-white/70" : "text-green-600",
          )}
        >
          Rooted in the North
        </span>
      </span>
    </span>
  );
}
