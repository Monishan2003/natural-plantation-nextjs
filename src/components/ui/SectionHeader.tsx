import { clsx } from "@/lib/clsx";

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  className?: string;
  invert?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
  invert = false,
}: Props) {
  return (
    <div
      className={clsx(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow && (
        <p className={clsx("eyebrow mb-3", invert ? "text-green-300" : "text-green-600")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "text-h2 font-bold",
          invert ? "text-white" : "text-blue-900",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={clsx(
            "mt-4 text-body-lg",
            invert ? "text-white/80" : "text-slate-700",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
