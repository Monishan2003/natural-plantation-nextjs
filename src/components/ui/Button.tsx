import { clsx } from "@/lib/clsx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-all duration-200 ease-[var(--ease-standard)] active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[48px]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-green-600 text-white shadow-blue hover:bg-green-700",
  secondary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  ghost: "text-blue-600 hover:bg-blue-50",
  white: "bg-white text-blue-900 shadow-card hover:bg-blue-50",
};

export function buttonVariants(variant: ButtonVariant = "primary", className = "") {
  return clsx(base, variants[variant], className);
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, ...props }: Props) {
  return <button className={buttonVariants(variant, className)} {...props} />;
}
