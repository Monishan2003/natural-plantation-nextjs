import { clsx } from "@/lib/clsx";

export function Card({
  className,
  hover = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={clsx(
        "rounded-[var(--radius-lg)] bg-white shadow-card",
        hover &&
          "transition-all duration-300 ease-[var(--ease-standard)] hover:-translate-y-1 hover:shadow-lifted",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-green-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
