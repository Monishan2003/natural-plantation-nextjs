/**
 * Editable brand facts & copy that are NOT stored in Supabase.
 * Keep all such strings here so they can be corrected without touching
 * components (AGENT.md §10). Never invent figures — leave blank to hide.
 */

export const BRAND = {
  name: "Natural Plantation",
  legalName: "Natural Plantation (Pvt) Ltd",
  regNumber: "PV 00334432",
  tagline: "Rooted in the North. Growing for Sri Lanka.",
  footerLong: "Natural Plantation (Pvt) Ltd · PV 00334432",
  shortMission:
    "A diversified Sri Lankan group in retail, agriculture and enterprise — rooted in the Northern Province, growing nationwide.",
} as const;

/**
 * Mandatory CBSL finance disclaimer for NF Plantation (AGENT.md §11).
 * Rendered in Companies → NF Plantation and in the footer. Counsel may
 * adjust wording here only.
 */
export const FINANCE_DISCLAIMER =
  "NF Plantation (Pvt) Ltd is a group holding and business-partnership facilitation entity. It is not a licensed finance company and is not regulated by, or registered with, the Central Bank of Sri Lanka under the Finance Business Act, No. 42 of 2011. It does not accept public deposits or carry on finance business.";

export const VISION = {
  vision:
    "To be the North's most trusted diversified group — proving that enterprise built at home can serve all of Sri Lanka.",
  mission:
    "To grow, make and distribute everyday goods with integrity; to create dignified local employment; and to reinvest in the communities and land that sustain us.",
};

export interface ValueItem {
  title: string;
  body: string;
  icon: string; // lucide-react icon name
}

export const VALUES: ValueItem[] = [
  {
    title: "Integrity",
    body: "Transparent governance, audited accounts, and honest labels on every product.",
    icon: "ShieldCheck",
  },
  {
    title: "Sustainability",
    body: "Organic-first cultivation across 120 acres and responsible sourcing throughout.",
    icon: "Leaf",
  },
  {
    title: "Community",
    body: "Local hiring and reinvestment in the Northern and Eastern provinces we call home.",
    icon: "Users",
  },
  {
    title: "Innovation",
    body: "Biometric operations, modern retail systems, and a growing digital ecosystem.",
    icon: "Sparkles",
  },
];
