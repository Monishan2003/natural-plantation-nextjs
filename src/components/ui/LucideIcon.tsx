import * as Icons from "lucide-react";

type IconRecord = Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
>;

/** Renders a lucide icon by name (for icon names stored in content/DB). */
export function LucideIcon({
  name,
  size,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = (Icons as unknown as IconRecord)[name];
  return Cmp ? <Cmp size={size} className={className} /> : null;
}
