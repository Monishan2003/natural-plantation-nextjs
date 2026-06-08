/** Tiny classnames joiner — avoids a dependency for simple conditional classes. */
export type ClassValue = string | number | false | null | undefined;

export function clsx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
