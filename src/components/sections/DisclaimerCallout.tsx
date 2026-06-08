import { Info } from "lucide-react";

/** Info callout for the mandatory NF Plantation finance disclaimer (AGENT.md §11). */
export function DisclaimerCallout({ text }: { text: string }) {
  return (
    <div
      role="note"
      className="flex gap-3 rounded-[var(--radius-md)] border-l-4 border-blue-600 bg-blue-50 p-4 text-small text-slate-700"
    >
      <Info size={18} className="mt-0.5 shrink-0 text-blue-600" />
      <p>{text}</p>
    </div>
  );
}
